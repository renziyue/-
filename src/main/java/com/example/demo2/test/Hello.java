package com.example.demo2.test;

import com.example.demo2.entity.TT;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
//@EnableAutoConfiguration
public class Hello {


        @RequestMapping("/hello")
        @ResponseBody
        Map home() {
            System.out.println("调用过了");
            Map map=new HashMap<>();
            map.put("aaa","bbbbbbb");
//            return "Hello ,spring boot!";
            return map;
        }



    @RequestMapping("/page")
//    @ResponseBody
    String page() {
        System.out.println("ok");
//            return "page2";
        return "http://www.baidu.com";
    }

    @RequestMapping("/test1")
//    @ResponseBody
     public String test1() {
//        System.out.println("regist");
        return "bysj/login";
    }

//    @RequestMapping("/regist")
////    @ResponseBody
//    public String regist() {
//        System.out.println("同样调用过了");
//            return "bysj/regist";
//    }
//    @RequestMapping("/regist")
//    @ResponseBody
//    public Map regist() {
//        Map map=new HashMap<>();
//        map.put("aaa","bysj/regist");
//        System.out.println("同样调用过了");
//        return map;
////            return "bysj/regist";
//    }
//@RequestMapping("/home")
//    public String home1(ModelMap model){
//    model.addAttribute("bianhao", "bianhao1");
//    model.addAttribute("phone", "112233");
//    System.out.println("xxx");
////    return "tianpin/index";
//    return "tianpin/index";
//}

//    @RequestMapping("grzx")
//    public String grzx( ModelMap model){
//        System.out.println("xxx");
////        model.addAttribute("name", "hahahahah");
//        return "grzx/index";
//    }
    @RequestMapping("buy")
    public String buy( ModelMap model,HttpServletRequest request, HttpServletResponse response){
        HttpSession httpSession=request.getSession();
            String phone= (String) httpSession.getAttribute("phone");
            String bianhao=request.getParameter("bianhao");
            String id=request.getParameter("id");
        System.out.println("buy");
        System.out.println(phone+","+id);
//        model.addAttribute("phone", phone);
        model.addAttribute("id", id);
        model.addAttribute("value", "777777");
        model.addAttribute("protype","xxx");
        model.addAttribute("prosrc","img/tianpin/img/hh.png");
        return "bysj/buys";
    }

    @RequestMapping("product")
    public String product( ModelMap model){
        System.out.println("product");
//        model.addAttribute("value", "777777");
        return "tianpin/productCenter";
    }
    @RequestMapping("test")
    @ResponseBody
//    public String test(@RequestParam TianPinText tianPinText,HttpServletRequest request, HttpServletResponse response){
//        JSONArray jsonObject = JSONArray.("[" + request.getParameter("fpPkr") + "]");	// 将前台获取的字符串转成JSONArray
//        List<FpPkr> pkrList  = (List<FpPkr>)JSONArray.toCollection(jsonObject, FpPkr.class);
//        FpPkr fpPkr = pkrList.get(0);
//
//
//        return "tianpin";
//    }
    public Map appendSpec(@RequestBody TT[] people, HttpServletRequest request) {
            Map map=new HashMap();
//        TianPinText user = (TianPinText) JSONObject.toBean(JSONObject(request.getParameter("user")), BIConversion.User.class);
        System.out.println(people[0].getBianhao());
        map.put("result","success");
            return map; }

    @RequestMapping("houtaihome2")
    public String home2( ModelMap model,HttpServletRequest request){
        System.out.println("product");
        HttpSession httpSession=request.getSession();
        httpSession.setAttribute("appId","112233");
//        model.addAttribute("value", "777777");
        return "/src/main/resources/templates/test/home2.html";
    }

    @RequestMapping("uploade")
    public String uploade( ModelMap model){
        System.out.println("uploade");
//        model.addAttribute("value", "777777");
        return "/src/main/resources/templates/test/test.html";
    }


    @RequestMapping("prodocuCenter")
    public String prodocuCenter( ModelMap model,HttpServletRequest request, HttpServletResponse response){
//        System.out.println("uploade");
        String value=request.getParameter("value");
        String storeId=request.getParameter("phone");
//        String phone=request.getParameter("phone");
//        String bianhao=request.getParameter("bianhao");
        model.addAttribute("value", value);
//        model.addAttribute("phone",phone);
        model.addAttribute("bianhao","bianhao2");
        model.addAttribute("phone",storeId);
        return "tianpin/productCenter";
    }



    @RequestMapping("/muban")
//    @ResponseBody
    String muban() {
        System.out.println("ok");
//            return "page2";
        return "bysj/templatePage";
    }

    @RequestMapping("/myapp1")
//    @ResponseBody
    String myapp1() {
        System.out.println("ok");
//            return "page2";
        return "bysj/myapp1";
    }






}
