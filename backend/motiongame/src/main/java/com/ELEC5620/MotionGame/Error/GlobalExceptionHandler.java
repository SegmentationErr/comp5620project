package com.ELEC5620.MotionGame.Error;

import com.ELEC5620.MotionGame.Model.UserModel;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(value = MyException.class)
    @ResponseBody
    public ErrorInfo<String> jsonErrorHandler(HttpServletRequest req, HttpServletResponse res, MyException e) throws Exception {
        ErrorInfo<String> r = new ErrorInfo<>();
        r.setMessage(e.getMessage());
        r.setCode(e.code);
//        r.setData("Some Data");
        r.setUrl(req.getRequestURL().toString());
        res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return r;
    }

}