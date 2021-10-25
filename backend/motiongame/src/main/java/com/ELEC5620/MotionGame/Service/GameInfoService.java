package com.ELEC5620.MotionGame.Service;

import com.ELEC5620.MotionGame.Mapper.GameInfoMapper;
import com.ELEC5620.MotionGame.Mapper.GameScoreMapper;
import com.ELEC5620.MotionGame.Model.GameInfoModel;
import com.ELEC5620.MotionGame.Model.GameScoreModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameInfoService {
    private final GameInfoMapper dao;

    @Autowired
    public GameInfoService(GameInfoMapper dao) {
        this.dao = dao;
    }

    public List<GameInfoModel> selectAll(){return dao.selectAll();}
    public boolean insert(GameInfoModel model) {
        return dao.insert(model) > 0;
    }
}
