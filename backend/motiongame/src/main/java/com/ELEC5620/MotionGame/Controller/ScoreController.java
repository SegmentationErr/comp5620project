package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Error.MyException;
import com.ELEC5620.MotionGame.Model.GameScoreModel;
import com.ELEC5620.MotionGame.Service.GameScoreService;
import com.ELEC5620.MotionGame.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

import static com.ELEC5620.MotionGame.Config.WebSecurityConfig.SESSION_KEY;

@RestController
public class ScoreController {
    @Autowired
    GameScoreService gameScoreService;

    @RequestMapping(value = "/gamescore",method = RequestMethod.GET)
    public List<GameScoreModel> getScoreHistory(@RequestParam("gameId") int gameId){
        List list = gameScoreService.selectTop5(gameId);
        return list;
    }

    @RequestMapping(value = "/gamescore",method = RequestMethod.POST)
    public Integer uploadScore(@RequestParam("gameId") int gameId, @RequestParam("score") float score, HttpServletRequest request) throws MyException {
        String playerId = (String) request.getSession().getAttribute(SESSION_KEY);
        if (playerId == null){
            throw new MyException("The session is broken to upload the score.");
        }
        GameScoreModel gameScoreModel = new GameScoreModel();
        gameScoreModel.setScore(score);
        gameScoreModel.setGameId(gameId);
        gameScoreModel.setPlayerId(playerId);
        gameScoreModel.setGameDate(new Date().getTime());
        int ret = gameScoreService.insert(gameScoreModel)?1:0;
        return ret;
    }
}
