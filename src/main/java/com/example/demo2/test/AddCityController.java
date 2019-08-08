package com.example.demo2.test;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class AddCityController {

    @RequestMapping("/testcity")
    public String xx(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        //把用户数据保存在session域对象中
       String appId= (String) session.getAttribute("appId");
        System.out.println(appId+"------");
        return "sjld/index";
    }


    @RequestMapping("/test1city")
    public String xx1(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        System.out.println("进入test1city");
        String name= (String) session.getAttribute("name");
        System.out.println("session内容："+name);
        //把用户数据保存在session域对象中
//        session.setAttribute("name", "xxx");
        return "grzx/order";
    }


    @RequestMapping("/gotoadress")
    public String gotoadress(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();

        String appId= (String) session.getAttribute("appId");
        String userId= (String) session.getAttribute("userId");
        System.out.println("进入gotoadress，传入的参数 appId="+appId+",userId="+userId);
//        String appId="112233";
//        String userId="44566";
//        String appId= (String) session.getAttribute("appId");
        //把用户数据保存在session域对象中
//        session.setAttribute("appId", appId);
//        session.setAttribute("userId", userId);
        return "grzx/address";
    }
}
