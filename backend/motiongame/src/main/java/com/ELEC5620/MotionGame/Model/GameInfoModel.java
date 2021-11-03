package com.ELEC5620.MotionGame.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameInfoModel {
    public static final Integer SYSTEM_CREATED_TYPE = 1;
    public static final Integer CREATOR_CREATED_TYPE = 2;

//    public static final Integer ASSESS_STATUS_WAIT_FOR_ASSESSING = 1;
//    public static final Integer ASSESS_STATUS_APPROVAL = 2;
//    public static final Integer ASSESS_STATUS_DENY = 3;

    Integer id;
    Integer type;
    String configFileContent;
    Integer creatorId;
    String gameName;
    String creatorName;
    String bgmName;
}
