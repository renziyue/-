package com.example.demo2.web.page;

import com.example.demo2.entity.template.Template;
import com.example.demo2.service.template.TemplateService;
import com.example.demo2.service.userTemp.UserTempService;
import com.example.demo2.util.Rand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class SelectPage {

    private static Logger logger = LoggerFactory.getLogger(SelectPage.class);

    @Autowired
    private TemplateService templateService;

    @Autowired
    private UserTempService userTempService;

    @RequestMapping(value = "selectTemplateHome")
    private String  selectTemplateHome(ModelMap model,HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        String templateId=request.getParameter("templateId");
        String appNme=request.getParameter("appName");
        String type=request.getParameter("ext2");

        logger.info("selectTemplateHome传入的参数：templateId="+templateId+",appName="+appNme+",ext2="+type);
        Rand rand=new Rand();
        String appId=rand.getRandom(11);
        HttpSession httpSession=request.getSession();
        httpSession.setAttribute("appId",appId);
        String ext2="";
        String returnType="";
        String userId= (String) httpSession.getAttribute("userId");
        String phone= (String) httpSession.getAttribute("phone");
        logger.info("userId="+userId+"phone="+phone);
        userTempService.addUserTemp(appId,userId,phone,templateId,appNme,type,"");
        Rand r=new Rand();
        List<Template> listAll=templateService.selectExp(templateId,"","","","","");
        for(int i=0;i<listAll.size();i++){
            String  bianHao=r.getRandom(12);
            if(listAll.get(i).getPageName().equals("首页")){
                returnType=bianHao;

            }
            templateService.addTemplate("",listAll.get(i).getPageName(),listAll.get(i).getPageSet(),bianHao,appId,ext2);

        }
//         model.addAttribute("page",returnType);

        return "forward:/home2?bianhao="+returnType;
    }


    @RequestMapping(value = "selectPage")
    private String  selectPage(ModelMap model,HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        String pageSet="";
        HttpSession httpSession= request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        String page=request.getParameter("pageId");

        logger.info("selectPage传入参数：page="+page+",appId="+appId);
                List<Template> list=templateService.selectExp("","","",page,appId,"");
        logger.info(list.size()+"--------");
        pageSet=list.get(0).getPageSet();
        model.addAttribute("bianhao",list.get(0).getExt1());
        return  "tianpin/"+pageSet;
    }


    @RequestMapping(value = "selectTemplateHome1")
    private String  selectTemplateHome1(ModelMap model,HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        String appId=request.getParameter("appId");
        String type=request.getParameter("ext2");

        logger.info("selectTemplateHome传入的参数：appId="+appId+",ext2="+type);
        HttpSession httpSession=request.getSession();
        httpSession.setAttribute("appId",appId);
        String ext2="";
        String returnType="";
        String userId= (String) httpSession.getAttribute("userId");
        String phone= (String) httpSession.getAttribute("phone");
        logger.info("userId="+userId+"phone="+phone);
        List<Template> listAll=templateService.selectExp("0","","","",appId,"");
        for(int i=0;i<listAll.size();i++){
            if(listAll.get(i).getPageName().equals("首页")){
                returnType=listAll.get(i).getExt1();

            }
        }


        return "forward:/home2?bianhao="+returnType;
    }






}
