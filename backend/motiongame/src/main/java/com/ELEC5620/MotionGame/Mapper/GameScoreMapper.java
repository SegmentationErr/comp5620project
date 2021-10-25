package com.ELEC5620.MotionGame.Mapper;

import com.ELEC5620.MotionGame.Model.GameScoreModel;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface GameScoreMapper {
    // 插入 并查询id 赋给传入的对象
    @Insert("INSERT INTO scoreBoard(playerId, gameId, score, gameDate) VALUES(#{playerId},#{gameId},#{score},#{gameDate})")
//    @SelectKey(statement = "SELECT seq id FROM sqlite_sequence WHERE (name = 'hello')", before = false, keyProperty = "id", resultType = int.class)
    int insert(GameScoreModel model);

    // 根据 ID 查询
    @Select("SELECT * FROM scoreBoard WHERE id=#{id}")
    GameScoreModel select(int id);

    // 查询全部
    @Select("SELECT * FROM scoreBoard WHERE gameId=#{gameId} order by score desc LIMIT 5")
    List<GameScoreModel> selectTop5(int gameId);

//    // 更新 value
//    @Update("UPDATE user SET value=#{value} WHERE id=#{id}")
//    int updateValue(UserModel model);
//
//    // 根据 ID 删除
//    @Delete("DELETE FROM user WHERE id=#{id}")
//    int delete(Integer id);
}
