package com.ELEC5620.MotionGame.Mapper;

import com.ELEC5620.MotionGame.Model.GameInfoModel;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface GameInfoMapper {
    @Insert("INSERT INTO game(type, configFileContent, creatorId, gameName, creatorName, bgmName) VALUES(#{type},#{configFileContent},#{creatorId},#{gameName}, #{creatorName}, #{bgmName})")
    int insert(GameInfoModel model);

    // 查询全部
    @Select("SELECT * FROM game")
    List<GameInfoModel> selectAll();
}
