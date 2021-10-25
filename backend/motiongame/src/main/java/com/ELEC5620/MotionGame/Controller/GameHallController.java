package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Model.GameInfoModel;
import com.ELEC5620.MotionGame.Service.GameInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameHallController {
    @Autowired
    GameInfoService gameInfoService;

    @RequestMapping("/gamelist")
    public List<GameInfoModel> gameList(){
        return gameInfoService.selectAll();
    }
}
