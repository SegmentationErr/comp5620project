package com.ELEC5620.MotionGame.Mapper;

import com.ELEC5620.MotionGame.Model.*;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface  UserMapper {

    // 插入 并查询id 赋给传入的对象
    @Insert("INSERT INTO user(key, value) VALUES(#{key}, #{value})")
//    @SelectKey(statement = "SELECT seq id FROM sqlite_sequence WHERE (name = 'hello')", before = false, keyProperty = "id", resultType = int.class)
    int insert(UserModel model);

    // 根据 ID 查询
    @Select("SELECT * FROM user WHERE id=#{id}")
    UserModel select(int id);

    // 查询全部
    @Select("SELECT * FROM user")
    List<UserModel> selectAll();

    // 更新 value
    @Update("UPDATE user SET value=#{value} WHERE id=#{id}")
    int updateValue(UserModel model);

    // 根据 ID 删除
    @Delete("DELETE FROM user WHERE id=#{id}")
    int delete(Integer id);
}
