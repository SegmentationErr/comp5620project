package com.ELEC5620.MotionGame.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackModel {
    Integer id;
    int viewStatus;
    String createDate;
    String feedbackContent;
    int feedbackCreatorId;
    int type;
}
