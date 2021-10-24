package com.ELEC5620.MotionGame.Controller;

import com.ELEC5620.MotionGame.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @RequestMapping("/")
    public String Index() {
        List users = userService.selectAll();
        return "Hello World";
    }
}