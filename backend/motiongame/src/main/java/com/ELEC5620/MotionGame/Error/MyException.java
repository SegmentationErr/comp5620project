package com.ELEC5620.MotionGame.Error;

public class MyException extends Exception {
    int code = 500;
    public MyException(String message, int code) {
        super(message);
        this.code = code;
    }

    public MyException(String message) {
        super(message);
    }
}
