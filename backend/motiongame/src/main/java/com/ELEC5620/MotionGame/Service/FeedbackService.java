package com.ELEC5620.MotionGame.Service;

import com.ELEC5620.MotionGame.Mapper.FeedbackMapper;
import com.ELEC5620.MotionGame.Model.FeedbackModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackMapper feedbackMapper;

    @Autowired
    public FeedbackService(FeedbackMapper feedbackMapper) {
        this.feedbackMapper = feedbackMapper;
    }

    public boolean insert(FeedbackModel feedback) {
        return feedbackMapper.insert(feedback) > 0;
    }

    public FeedbackModel select(int id) {
        return feedbackMapper.select(id);
    }

    public List<FeedbackModel> selectAllUnMarked() {
        return feedbackMapper.selectAllUnMarked();
    }

    public boolean updateValue(FeedbackModel feedback) {
        return feedbackMapper.updateValue(feedback) > 0;
    }

    public boolean delete(int id) {
        return feedbackMapper.delete(id) > 0;
    }

    public boolean markFeedback(Integer id) {
        return feedbackMapper.markFeedback(id) > 0;
    }
}
