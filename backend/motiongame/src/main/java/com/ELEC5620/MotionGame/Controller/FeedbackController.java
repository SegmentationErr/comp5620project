package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Model.FeedbackModel;
import com.ELEC5620.MotionGame.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/feedback")
    public List<FeedbackModel> listAll(){
        return feedbackService.selectAll();
    }

    @PostMapping("/feedback")
    public String postFeedback(@RequestParam("content") String content,
                                      @RequestParam("userId") Integer userId,
                                      @RequestParam("userRole") Integer userRole) throws Exception {
        FeedbackModel feedback = new FeedbackModel();
        feedback.setFeedbackContent(content);
        feedback.setViewStatus(0);
        feedback.setFeedbackCreatorId(userId);
        feedback.setType(userRole);
        try {
            feedbackService.insert(feedback);
        } catch (Exception e) {
            throw new Exception(e);
        }
        return "success";
    }
}
