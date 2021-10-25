package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Model.FeedbackModel;
import com.ELEC5620.MotionGame.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @RequestMapping("/list")
    public List<FeedbackModel> listAll(){
        return feedbackService.selectAll();
    }

    @RequestMapping("/post")
    public FeedbackModel postFeedback(@RequestParam("content") String content,
                               @RequestParam("userId") Integer userId,
                               @RequestParam("userRole") Integer userRole) throws Exception {
        FeedbackModel feedback = new FeedbackModel();
        feedback.setFeedbackContent(content);
        feedback.setViewStatus(0);
        feedback.setFeedbackCreatorId(userId);
        feedback.setType(userRole);
        try {
            feedbackService.insert(feedback);
            feedback = feedbackService.select(feedback.getId());
        } catch (Exception e) {
            throw new Exception(e);
        }
        return feedback;
    }

    @RequestMapping("/list/{id}")
    @ResponseBody
    public FeedbackModel getFeedbackById(@PathVariable("id") int id) {
        return feedbackService.select(id);
    }
}
