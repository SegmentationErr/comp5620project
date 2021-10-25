package com.ELEC5620.MotionGame.Model;

public class UserModel {
    public static final Integer STAFF_ROLE = 1;
    public static final Integer NORMAL_PLAYER_ROLE = 2;
    public static final Integer GAME_CREATOR_ROLE = 3;
    String id;
    Integer role;
    String pwdHash;
    String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public String getPwdHash() {
        return pwdHash;
    }

    public void setPwdHash(String pwdHash) {
        this.pwdHash = pwdHash;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
