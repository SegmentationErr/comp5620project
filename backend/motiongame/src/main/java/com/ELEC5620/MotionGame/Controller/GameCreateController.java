package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Error.MyException;
import com.ELEC5620.MotionGame.Model.GameInfoModel;
import com.ELEC5620.MotionGame.Model.UserModel;
import com.ELEC5620.MotionGame.Service.GameInfoService;
import com.ELEC5620.MotionGame.Service.GameScoreService;
import com.ELEC5620.MotionGame.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static com.ELEC5620.MotionGame.Config.WebSecurityConfig.SESSION_KEY;

@RestController
public class GameCreateController {
    @Autowired
    GameInfoService gameScoreService;
    @Autowired
    UserService userService;

    @RequestMapping("/gamecreate")
    public Integer create(@RequestParam("gameName") String gameName, @RequestParam("configFileContent") String configFileContent, HttpServletRequest request) throws MyException {
        Integer playerId = (Integer) request.getSession().getAttribute(SESSION_KEY);
        if (playerId == null){
            throw new MyException("The session is broken to upload the score.");
        }

        UserModel userModel = userService.select(playerId);
        GameInfoModel gameInfoModel = new GameInfoModel();
        gameInfoModel.setGameName(gameName);
        gameInfoModel.setCreatorId(playerId);
        gameInfoModel.setCreatorName(userModel.getName());
        gameInfoModel.setConfigFileContent(configFileContent);
        gameInfoModel.setType(GameInfoModel.CREATOR_CREATED_TYPE);
        gameScoreService.insert(gameInfoModel);
        return 1;
    }
}
