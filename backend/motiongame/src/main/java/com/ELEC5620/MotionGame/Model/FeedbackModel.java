package com.ELEC5620.MotionGame.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

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
