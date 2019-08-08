package com.example.demo2.web.appController;


import com.example.demo2.service.template.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AppPage {

    @Autowired
    private TemplateService templateService;
    @RequestMapping("openPageHome")
    public String openPgeHome(ModelMap model, HttpServletRequest request){
        HttpSession httpSession=request.getSession();
        String appId=request.getParameter("appId");
        String bianhao=request.getParameter("bianhao");
        httpSession.setAttribute("appId",appId);
        httpSession.setAttribute("Homebianhao",bianhao);
        model.addAttribute("bianhao",bianhao);
        return "app/index";
    }

    @RequestMapping("elsePage")
    public String elsePage(ModelMap model, HttpServletRequest request){
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        httpSession.setAttribute("appId",appId);
        String bianhao=request.getParameter("bianhao");
        model.addAttribute("bianhao", bianhao);
        return "app/index";
    }


    @RequestMapping("appRegist")
    public String appRegist(ModelMap model, HttpServletRequest request){

        return "app/regist";
    }

    @RequestMapping("applogin")
    public String applogin(ModelMap model, HttpServletRequest request){

        return "app/login";
    }
}
