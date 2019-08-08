package com.example.demo2.web.appController;


import com.example.demo2.entity.producte.Producte;
import com.example.demo2.entity.template.Template;
import com.example.demo2.service.producte.ProducteService;
import com.example.demo2.service.template.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class AppController {
    @Autowired
    private TemplateService templateService;

    @Autowired
    private ProducteService producteService;
    @RequestMapping("appShowIndex")
    public String appShowIndex(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("appShowIndex");
        String appId=request.getParameter("appId");
        String repage= request.getParameter("page");
        HttpSession httpSession=request.getSession();
        String userId= (String) httpSession.getAttribute("userId");
        String page="app/"+repage;
//        model.addAttribute("bianhao", );
        model.addAttribute("phone", appId);
        return page;
    }


    @RequestMapping("appProcduce")
    public String appProcduce( ModelMap model,HttpServletRequest request, HttpServletResponse response){
//        System.out.println("uploade");
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        String userId= (String) httpSession.getAttribute("userId");


        String value=request.getParameter("value");
        model.addAttribute("value", value);
//        model.addAttribute("phone",phone);
        model.addAttribute("phone",appId);
        return "app/productCenter";
    }


    @RequestMapping("appBuy")
    public String buy( ModelMap model,HttpServletRequest request, HttpServletResponse response){
        HttpSession httpSession=request.getSession();
        String phone= (String) httpSession.getAttribute("appId");
        String bianhao=request.getParameter("bianhao");
        String id=request.getParameter("id");
        System.out.println("appbuy   appId="+phone+",id="+id);

        List<Producte> list=producteService.selectexplme(id,"","","","","",phone,"");
//        model.addAttribute("phone", phone);
        model.addAttribute("id", list.get(0).getId());
        model.addAttribute("proprice", list.get(0).getPrice());
        model.addAttribute("protype",list.get(0).getProType());
        model.addAttribute("prosrc",list.get(0).getExt2());
        model.addAttribute("proname",list.get(0).getProName());
        model.addAttribute("proext",list.get(0).getExt1());
        model.addAttribute("pronum",list.get(0).getCount());
        return "app/buys";
    }



    @RequestMapping("appCommPage")
    public String appCommPage(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
        String repage = request.getParameter("page");
        HttpSession httpSession = request.getSession();
        String appId = (String) httpSession.getAttribute("appId");
        String userId = (String) httpSession.getAttribute("userId");
        List<Template> list=templateService.selectExp("",repage,"","",appId,"");
        repage=list.get(0).getPageSet();
        String bianhao=list.get(0).getExt1();
        System.out.println(bianhao+"-----------");
        model.addAttribute("bianhao",bianhao);

        String page = "app/" + repage;
        return page;
    }



    @RequestMapping("appOrderPage")
    public String appOrderPage(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("appShowIndex");
//        model.addAttribute("value", "777777");
        HttpSession httpSession = request.getSession();
        String appId = (String) httpSession.getAttribute("appId");
        String userId = (String) httpSession.getAttribute("userId");
        if (userId == null || "".equals(userId)) {
            userId = "000000";
        }

        return "app/order";
    }


    @RequestMapping("appGRZX")
    public String appGRZX(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
//        model.addAttribute("value", "777777");
        HttpSession httpSession = request.getSession();
        String appId = (String) httpSession.getAttribute("appId");
        String userId = (String) httpSession.getAttribute("userId");
        if (userId == null || "".equals(userId)) {
            model.addAttribute("name", "小白");
        }
        else {
            model.addAttribute("name", "小l");
        }
        return "app/indexgrzx";
    }

    @RequestMapping("appGetAddress")
    public String appGetAddress(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
//        model.addAttribute("value", "777777");
        HttpSession httpSession = request.getSession();
        String appId = (String) httpSession.getAttribute("appId");
        String userId = (String) httpSession.getAttribute("userId");
        if (userId == null || "".equals(userId)) {
            model.addAttribute("userName", "小白");
        }
        else {
            model.addAttribute("userName", "小l");
        }
        return "app/address";
    }
}
