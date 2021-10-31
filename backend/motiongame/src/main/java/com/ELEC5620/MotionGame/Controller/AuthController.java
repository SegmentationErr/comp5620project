package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Config.WebSecurityConfig;
import com.ELEC5620.MotionGame.Error.MyException;
import com.ELEC5620.MotionGame.Model.UserModel;
import com.ELEC5620.MotionGame.Service.UserService;
import org.apache.catalina.Session;
import org.apache.catalina.User;
import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.List;

@RestController
public class AuthController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public UserModel login(@RequestParam("username") String name, @RequestParam("password") String pwd, HttpServletRequest req, HttpServletResponse res)  throws Exception  {
        UserModel userModel = userService.selectByName(name);
        if (userModel == null){
            throw new MyException("username doesn't exist.");
        }
        String md5 = MD5Encoder.encode(MessageDigest.getInstance("MD5").digest(pwd.getBytes()));
        boolean isPwdRight = userModel.getPwdHash().equals(md5);
        if (!isPwdRight){
            throw new MyException("Password or Id incorrect.");
        }
        userModel.setPwdHash(null);

        HttpSession session = req.getSession();
        session.setMaxInactiveInterval(WebSecurityConfig.SESSION_EXTEND_SECOND);
        session.setAttribute("userId",userModel.getId());
        Cookie cookie = new Cookie("JSESSIONID",session.getId());
        cookie.setMaxAge(30);
        res.addCookie(cookie);

        return userModel;
    }

    @RequestMapping("/register")
    public UserModel register(@RequestParam("password") String password,@RequestParam("username") String name, HttpServletRequest req, HttpServletResponse res)  throws Exception {
        UserModel userModel = userService.selectByName(name);
        if (userModel != null){
            throw new MyException("userName exist.");
        }

        userModel = new UserModel();
        userModel.setName(name);
        userModel.setRole(UserModel.NORMAL_PLAYER_ROLE);
        String md5 =  MD5Encoder.encode(MessageDigest.getInstance("MD5").digest(password.getBytes()));;
        userModel.setPwdHash(md5);
        userService.insert(userModel);
        userModel = userService.selectByName(name);
        userModel.setPwdHash(null);

        HttpSession session = req.getSession();
        session.setMaxInactiveInterval(WebSecurityConfig.SESSION_EXTEND_SECOND);
        session.setAttribute("userId",userModel.getId());
        Cookie cookie = new Cookie("JSESSIONID",session.getId());
        cookie.setMaxAge(30);
        res.addCookie(cookie);

        return userModel;
    }

    @RequestMapping("/logout")
    public int logout(HttpServletRequest req, HttpServletResponse res){
        req.getSession().removeAttribute("userId");
        return 0;
    }
}
