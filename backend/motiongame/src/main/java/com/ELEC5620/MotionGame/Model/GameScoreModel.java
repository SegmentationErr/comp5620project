package com.ELEC5620.MotionGame.Model;

public class GameScoreModel {
    Integer id;
    Integer playerId;
    Integer gameId;
    Float score;
    Long gameDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public Long getGameDate() {
        return gameDate;
    }

    public void setGameDate(Long gameDate) {
        this.gameDate = gameDate;
    }

}
