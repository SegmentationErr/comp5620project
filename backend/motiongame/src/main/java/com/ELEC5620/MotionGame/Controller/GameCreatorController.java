package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Error.MyException;
import com.ELEC5620.MotionGame.Model.CreatorApplyModel;
import com.ELEC5620.MotionGame.Model.UserModel;
import com.ELEC5620.MotionGame.Service.CreatorApplyService;
import com.ELEC5620.MotionGame.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.ELEC5620.MotionGame.Config.WebSecurityConfig.SESSION_KEY;

@RestController
public class GameCreatorController {

    @Autowired
    UserService userService;
    @Autowired
    CreatorApplyService creatorApplyService;

    @RequestMapping(value = "/gamecreator",method = RequestMethod.POST)
    public int applyToBeCreator(HttpServletRequest req) throws Exception{
        Integer playerId =  (Integer)req.getSession().getAttribute(SESSION_KEY);
        UserModel model = userService.select(playerId);
        if (model.getRole() != UserModel.NORMAL_PLAYER_ROLE){
            throw  new MyException("The user must be a normal player to apply the game creator.");
        }
        CreatorApplyModel applyModel = creatorApplyService.select(playerId, CreatorApplyModel.APPROVAL_STATUS_WAITING_ASSESS);
        if (applyModel == null){
            applyModel = new CreatorApplyModel();
            applyModel.setPlayerId(playerId);
            applyModel.setApprovalStatus(CreatorApplyModel.APPROVAL_STATUS_WAITING_ASSESS);
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            applyModel.setApplyDate(formatter.format(new Date().getTime()));
            creatorApplyService.insert(applyModel);
        }
        return 1;
    }

    @RequestMapping(value = "/gamecreator",method = RequestMethod.GET)
    public List<CreatorApplyModel> getAllCreatorApply(HttpServletRequest req) throws Exception{
        Integer playerId =  (Integer)req.getSession().getAttribute(SESSION_KEY);
        UserModel model = userService.select(playerId);
//        if (model.getRole() != UserModel.STAFF_ROLE){
//            throw  new MyException("The user must be a technical staff to get all creator apply.");
//        }
        List ret = creatorApplyService.selectAll(CreatorApplyModel.APPROVAL_STATUS_WAITING_ASSESS);
        return ret;
    }


    @RequestMapping("/gamecreatorreply")
    public int assessCreatorApply(@RequestParam("id") Integer creatorApplyId, @RequestParam("agree") Integer agree) throws Exception{
        CreatorApplyModel creatorApplyModel = creatorApplyService.selectById(creatorApplyId);
        if (creatorApplyModel == null){
            throw new MyException("No creatorApply is found.");
        }
        if (creatorApplyModel.getApprovalStatus() != CreatorApplyModel.APPROVAL_STATUS_WAITING_ASSESS){
            throw new MyException("CreatorApply has been marked.");
        }
        creatorApplyModel.setApprovalStatus(agree);
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        creatorApplyModel.setDecisionDate(formatter.format(new Date().getTime()));
        boolean ret = creatorApplyService.updateApproval(creatorApplyModel);
        if (ret){
            if (agree == 2){
                UserModel userModel = userService.select(creatorApplyModel.getPlayerId());
                if (userModel.getRole() == UserModel.NORMAL_PLAYER_ROLE){
                    userService.updateRole(creatorApplyModel.getPlayerId(), UserModel.GAME_CREATOR_ROLE);
                }
            }
        }
        return 1;
    }
}
