package com.example.demo2.web.page;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class HouTaiPage {
    @RequestMapping("/welcome")
    public String ShowYePage(HttpServletRequest request, HttpServletResponse response){
        HttpSession session=request.getSession();
//        session.("userId","789456");
        return "houtai/welcome";
    }

    @RequestMapping("houtaihome")
    public String houtaihome(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
//        System.out.println("product");
//        model.addAttribute("value", "777777");
        return "houtai/index";
    }

}
