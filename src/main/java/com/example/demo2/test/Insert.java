package com.example.demo2.test;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/whiteList")
public class Insert {

    @RequestMapping("/insert")
    @ResponseBody
//    public Map insert(HttpServletRequest request, HttpServletResponse response){
//        Map map = new HashMap();
//        String name=request.getParameter("username");
//        String pwd=request.getParameter("password");
//        System.out.println(name+pwd);
//        map.put("message","success");
//        return map;
//
////        return "redirect:page";
//
//    }
//    public String insert(HttpServletRequest request, HttpServletResponse response){
//        Map map = new HashMap();
//        String name=request.getParameter("username");
//        String pwd=request.getParameter("password");
//        System.out.println(name+pwd);
//        map.put("message","success");
////        return map;
//
//        return "redirect:/page"+name;
//
//    }
    public ModelAndView findProjectPage() {
        ModelAndView modelAndView = new ModelAndView();
//        XXXXXXX
        modelAndView.setViewName("redirect:/page");
        return modelAndView;
    }
}
