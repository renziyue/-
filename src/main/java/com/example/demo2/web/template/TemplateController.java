package com.example.demo2.web.template;

import com.example.demo2.entity.template.Template;
import com.example.demo2.service.template.TemplateService;
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
@RequestMapping("/Template")
public class TemplateController {
    private static Logger logger = LoggerFactory.getLogger(TemplateController.class);

    @Autowired
    private TemplateService templateService;

    @RequestMapping(value = "selectTemplate")
    @ResponseBody
    private Map selectTemplate(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session=request.getSession();
        String appId= (String) session.getAttribute("appId");
        logger.info("selectTemplate传入的参数:APPId="+appId);
        List<Template> list=templateService.selectAll(appId);
        map.put("result","success");
        map.put("list",list);
        return map;
    }
}
