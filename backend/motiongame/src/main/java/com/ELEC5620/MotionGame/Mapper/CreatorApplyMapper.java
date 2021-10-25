package com.ELEC5620.MotionGame.Mapper;

import com.ELEC5620.MotionGame.Model.CreatorApplyModel;
import com.ELEC5620.MotionGame.Model.FeedbackModel;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface CreatorApplyMapper {
    @Insert("INSERT INTO creatorApply (playerId, applyDate, approvalStatus) " +
            "VALUES (#{playerId}, #{applyDate}, #{approvalStatus})")
    int insert(CreatorApplyModel creatorApply);

    @Select("SELECT * FROM creatorApply WHERE playerId=#{playerId} AND approvalStatus=#{approvalStatus} LIMIT 1")
    CreatorApplyModel select(Integer playerId, Integer approvalStatus);

    @Select("SELECT * FROM creatorApply WHERE id=#{id}")
    CreatorApplyModel selectById(Integer playerId);

    @Select("SELECT * FROM creatorApply WHERE approvalStatus=#{approvalStatus} order by applyDate")
    List<CreatorApplyModel> selectAll(Integer approvalStatus);

    @Update("UPDATE creatorApply SET approvalStatus=#{approvalStatus}, decisionDate=#{decisionDate} WHERE id=#{id}")
    int update(CreatorApplyModel creatorApplyModel);
}
