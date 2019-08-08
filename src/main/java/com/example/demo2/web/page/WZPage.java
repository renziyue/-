package com.example.demo2.web.page;

import com.example.demo2.entity.template.Template;
import com.example.demo2.service.template.TemplateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class WZPage {

    private static Logger logger = LoggerFactory.getLogger(WZPage.class);
    @Autowired
    private TemplateService templateService;

//    登录
    @RequestMapping("/login")
    public String login(HttpServletRequest request,ModelMap model) {

        return "bysj/login";
    }

//    注册
    @RequestMapping("/regist")
    public String regist() {
        logger.info("regist");
//        System.out.println("同样调用过了");
        return "bysj/regist";
    }

//编辑主页
    @RequestMapping("home2")
    public String home2(ModelMap model, HttpServletRequest request){
        HttpSession httpSession=request.getSession();
        String userId= (String) httpSession.getAttribute("userId");
        String returnType=request.getParameter("bianhao");
        logger.info("home2bianhao"+returnType);
        model.addAttribute("bianhao",returnType);
        model.addAttribute("name",userId);
        return "bysj/home2";
    }

    //编辑主页
    @RequestMapping("myapp")
    public String home3(ModelMap model, HttpServletRequest request){
        return "bysj/myapp";
    }

    @RequestMapping("/home")
    public String home1(ModelMap model,HttpServletRequest request){
        String bianhao=request.getParameter("bianhao");
        logger.info("home bianhao"+bianhao);
    model.addAttribute("bianhao", bianhao);
    model.addAttribute("phone", "778899");
    return "tianpin/index";
}

    //模板页
    @RequestMapping("template")
    public String template(ModelMap model, HttpServletRequest request){
//        HttpSession httpSession=request.getSession();
//        httpSession.setAttribute("appId","112233");

        return "bysj/templatePage";
    }


    @RequestMapping("grzx")
    public String grzx( ModelMap model){
        System.out.println("xxx");
//        model.addAttribute("name", "hahahahah");
        return "grzx/index";
    }

//    网站主页
    @RequestMapping("HomePage")
    public String HomePage( ModelMap model, HttpServletRequest request){
        HttpSession httpSession=request.getSession();
        String userId= (String) httpSession.getAttribute("userId");
        if(userId == null || userId.equals("")){
            logger.info("未登录");
        } else {
           logger.info("用户"+userId+"进入系统");
           model.addAttribute("name",userId);
        }
        return "bysj/HomePage";
    }

//    通用页面跳转
    @RequestMapping("/qitaPage")
    public String qitaPage(HttpServletRequest request, HttpServletResponse response){

        String page=request.getParameter("page");
        logger.info("跳转页面:"+page);
        return page;
    }

    @RequestMapping("bianjiPage")
    public String appCommPage(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
        String repage = request.getParameter("page");
        HttpSession httpSession = request.getSession();
        String appId = (String) httpSession.getAttribute("appId");
        String userId = (String) httpSession.getAttribute("userId");
//        if (userId == null || "".equals(userId)) {
//            userId = "000000";
//        }
        logger.info("page="+repage);
        List<Template> list=templateService.selectExp("",repage,"","",appId,"");
        repage=list.get(0).getPageSet();
        String bianhao=list.get(0).getExt1();
        model.addAttribute("bianhao",bianhao);

        String page= "tianpin/"+repage;
        logger.info(page+"page");
        return page;
    }

}
