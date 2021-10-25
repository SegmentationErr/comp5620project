package com.ELEC5620.MotionGame.Service;

import com.ELEC5620.MotionGame.Mapper.CreatorApplyMapper;
import com.ELEC5620.MotionGame.Mapper.GameInfoMapper;
import com.ELEC5620.MotionGame.Model.CreatorApplyModel;
import com.ELEC5620.MotionGame.Model.FeedbackModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.ReactiveTransaction;

import java.util.Date;
import java.util.List;

@Service
public class CreatorApplyService {
    private final CreatorApplyMapper dao;
    @Autowired
    CreatorApplyService(CreatorApplyMapper dao){
        this.dao = dao;
    }

    public boolean insert(CreatorApplyModel creatorApplyModel) {
        return dao.insert(creatorApplyModel) > 0;
    }

    public CreatorApplyModel select(Integer playerId, Integer approvalStatus){
        return dao.select(playerId,approvalStatus);
    }
    public CreatorApplyModel selectById(Integer creatorApplyId){
        return dao.selectById(creatorApplyId);
    }


    public List<CreatorApplyModel> selectAll(Integer approvalStatus){
        return dao.selectAll(approvalStatus);
    }

    public boolean updateApproval(CreatorApplyModel creatorApplyModel){
        return dao.update(creatorApplyModel) > 0;
    }
}
