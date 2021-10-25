package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Error.MyException;
import com.ELEC5620.MotionGame.Model.GameInfoModel;
import com.ELEC5620.MotionGame.Service.GameInfoService;
import com.ELEC5620.MotionGame.Service.GameScoreService;
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

    @RequestMapping("/gamecreate")
    public Integer create(@RequestParam("gameName") String gameName, @RequestParam("configFileContent") String configFileContent, HttpServletRequest request) throws MyException {
        String playerId = (String) request.getSession().getAttribute(SESSION_KEY);
        if (playerId == null){
            throw new MyException("The session is broken to upload the score.");
        }

        GameInfoModel gameInfoModel = new GameInfoModel();
        gameInfoModel.setGameName(gameName);
        gameInfoModel.setCreatorId(playerId);
        gameInfoModel.setConfigFileContent(configFileContent);
        gameInfoModel.setType(GameInfoModel.CREATOR_CREATED_TYPE);
        gameScoreService.insert(gameInfoModel);
        return 1;
    }
}
