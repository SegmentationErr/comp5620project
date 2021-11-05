package com.ELEC5620.MotionGame.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatorApplyModel {
    public static final Integer APPROVAL_STATUS_WAITING_ASSESS = 1;
    public static final Integer APPROVAL_STATUS_GRANTED = 2;
    public static final Integer APPROVAL_STATUS_DENIED = 3;

    Integer id;
    Integer playerId;
    String applyDate;
    Integer approvalStatus;
    String decisionDate;
}
