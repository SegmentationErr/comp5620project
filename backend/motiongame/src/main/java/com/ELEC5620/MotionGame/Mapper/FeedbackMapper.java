package com.ELEC5620.MotionGame.Mapper;

import com.ELEC5620.MotionGame.Model.FeedbackModel;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface FeedbackMapper {

    @Insert("INSERT INTO feedback (viewStatus, feedbackContent, feedbackCreatorId, type) " +
            "VALUES (#{viewStatus}, #{feedbackContent}, #{feedbackCreatorId}, #{type})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(FeedbackModel feedback);

    @Select("SELECT * FROM feedback WHERE id = #{id}")
    FeedbackModel select(int id);

    @Select("SELECT * FROM feedback")
    List<FeedbackModel> selectAll();

    @Update("UPDATE feedback SET value=#{value} WHERE id = #{id}")
    int updateValue(FeedbackModel feedback);

    @Delete("DELETE FROM feedback WHERE id = #{id}")
    int delete(int id);
}
