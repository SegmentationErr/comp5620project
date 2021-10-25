package com.ELEC5620.MotionGame.Service;

import com.ELEC5620.MotionGame.Model.UserModel;
import com.ELEC5620.MotionGame.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserMapper dao;

    @Autowired
    public UserService(UserMapper dao) {
        this.dao = dao;
    }

    public boolean insert(UserModel model) {
        return dao.insert(model) > 0;
    }

    public UserModel select(String id) {
        return dao.select(id);
    }

    public List<UserModel> selectAll() {
        return dao.selectAll();
    }

    public boolean updateValue(UserModel model) {
        return dao.updateValue(model) > 0;
    }

    public boolean delete(Integer id) {
        return dao.delete(id) > 0;
    }
}
