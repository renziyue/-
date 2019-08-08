package com.example.demo2.web.userTemp;


import com.example.demo2.entity.Xmuser.User;
import com.example.demo2.service.userTemp.UserService;
import com.example.demo2.util.Rand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/User")
public class UserController {

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping("addUser")
    @ResponseBody
    public Map  addUser(HttpServletRequest request, HttpServletResponse response){
        HttpSession httpSession=request.getSession();
        Map map=new HashMap();
        Rand rand=new Rand();
        String username=request.getParameter("userName");
        String passwd=request.getParameter("passwd");
        String userId=rand.getRandom(12);
        int isok=userService.add(userId,username,passwd);
        if(isok!=0){
            httpSession.setAttribute("userId",userId);
            httpSession.setAttribute("phone",username);
            map.put("result","success");
            map.put("errorMessage","注册成功");
        }else {
            map.put("result","error");
            map.put("errorMessage","用户名已存在");
        }
        return map;
    }

    @RequestMapping("selectUser")
    @ResponseBody
    public Map  selectUser(HttpServletRequest request, HttpServletResponse response){
        HttpSession httpSession=request.getSession();
        Map map=new HashMap();
            String username=request.getParameter("userName");
        String passwd=request.getParameter("passwd");
        logger.info("username="+username+",passwd="+passwd);
        List<User>  list=userService.select(username,passwd);
        if(list.size()>0){
            httpSession.setAttribute("userId",list.get(0).getUserId());
            httpSession.setAttribute("phone",list.get(0).getPhone());
            map.put("result","success");
        }else {
            map.put("result","error");
            map.put("errorMessage","用户名或密码错误");
        }
        return map;
    }
}
