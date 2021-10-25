package com.ELEC5620.MotionGame.Service;

import com.ELEC5620.MotionGame.Mapper.GameScoreMapper;
import com.ELEC5620.MotionGame.Mapper.UserMapper;
import com.ELEC5620.MotionGame.Model.GameScoreModel;
import com.ELEC5620.MotionGame.Model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameScoreService {

    private final GameScoreMapper dao;

    @Autowired
    public GameScoreService(GameScoreMapper dao) {
        this.dao = dao;
    }

    public boolean insert(GameScoreModel model) {
        return dao.insert(model) > 0;
    }
//
    public GameScoreModel select(int id) {
        return dao.select(id);
    }

    public List<GameScoreModel> selectTop5(int gameId) {
        return dao.selectTop5(gameId);
    }

//    public boolean updateValue(UserModel model) {
//        return dao.updateValue(model) > 0;
//    }
//
//    public boolean delete(Integer id) {
//        return dao.delete(id) > 0;
//    }
}
