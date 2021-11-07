package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Model.FeedbackModel;
import com.ELEC5620.MotionGame.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static com.ELEC5620.MotionGame.Config.WebSecurityConfig.SESSION_KEY;

@RestController
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/feedback")
    public List<FeedbackModel> listAll(){
        return feedbackService.selectAllUnMarked();
    }

    @PostMapping("/feedback")
    public String postFeedback(HttpServletRequest req, HttpServletResponse res,@RequestParam("content") String content,
                               @RequestParam(value = "userId", required = false) Integer userId,
                               @RequestParam("userRole") Integer userRole) throws Exception {
        FeedbackModel feedback = new FeedbackModel();
        feedback.setFeedbackContent(content);
        feedback.setViewStatus(0);
        if (userId == null){
            userId = (Integer) req.getSession().getAttribute(SESSION_KEY);
        }
        feedback.setFeedbackCreatorId(userId);
        feedback.setType(userRole);
        try {
            feedbackService.insert(feedback);
        } catch (Exception e) {
            throw new Exception(e);
        }
        return "success";
    }

    @PostMapping("/markfeedback")
    public String markFeedback(@RequestParam("id") Integer id) throws Exception {
        try {
            feedbackService.markFeedback(id);
        } catch (Exception e) {
            throw new Exception(e);
        }
        return "success";
    }
}
