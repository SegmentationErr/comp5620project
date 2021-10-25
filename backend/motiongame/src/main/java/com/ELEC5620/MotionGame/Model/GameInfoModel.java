package com.ELEC5620.MotionGame.Model;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getConfigFileContent() {
        return configFileContent;
    }

    public void setConfigFileContent(String configFileContent) {
        this.configFileContent = configFileContent;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }
}
