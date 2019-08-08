package com.example.demo2.web.protype;


import com.example.demo2.entity.protype.ProType;
import com.example.demo2.service.protype.ProTypeService;
import com.example.demo2.util.Rand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/ProType")
public class ProTypeController {

    private static Logger logger = LoggerFactory.getLogger(ProTypeController.class);

    @Autowired
    public ProTypeService proTypeService;

    @RequestMapping(value = "selectAll")
    public Map selectAll(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();


        String phone= (String) httpSession.getAttribute("appId");
        String bianhao=request.getParameter("bianhao");

        if(phone == null || "".equals(phone) || bianhao == null || "".equals(bianhao)){
            map.put("result","error");
            map.put("errorMessage","手机号或编号丢失");
            logger.info("手机号或编号丢失");
        }
        else {
            List<ProType> list=proTypeService.selectAll("",phone,bianhao);
            map.put("result","success");
            map.put("list",list);
        }
        return map;
    }




    @RequestMapping(value = "insertProType")
    public Map insertProType(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String protype= (String) httpSession.getAttribute("appId");
        String phone=request.getParameter("phone");
        String bianhao=request.getParameter("bianhao");

        if(phone == null || "".equals(phone) || bianhao == null || "".equals(bianhao) || protype ==null || "".equals(protype)){
            map.put("result","error");
            map.put("errorMessage","类型不能为空");
            logger.info("类型不能为空");
        }
        else {
            List<ProType> list=proTypeService.selectAll(protype,phone,bianhao);
            if(list.size()>0){
                map.put("result","error");
                map.put("errorMessage","已经存在"+protype+"类型");
            }
            else {
                Rand rand=new Rand();
                String id=rand.getRandom(10);
                int isOk=proTypeService.addProType(id,protype,phone,bianhao);
                if(isOk==0){
                    map.put("result","error");
                    map.put("errorMessage","插入"+protype+"失败");
                }
                else {
                    map.put("result","success");
                    map.put("list",list);
                }

            }

        }
        return map;
    }


    @RequestMapping(value = "deleteProType")
    public Map deleteProType(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String id=request.getParameter("id");
        String phone= (String) httpSession.getAttribute("appId");
        String bianhao=request.getParameter("bianhao");

        if(phone == null || "".equals(phone) || bianhao == null || "".equals(bianhao) || id ==null || "".equals(id)){
            map.put("result","error");
            map.put("errorMessage","类型不能为空");
            logger.info("类型不能为空");
        }
        else {
            int isOk=proTypeService.deleteProType(id,phone,bianhao);
            if(isOk==0){
                map.put("result","error");
                map.put("errorMessage","删除失败");
            }else {
                map.put("result","success");
                map.put("message","删除成功");
            }

        }
        return map;
    }

    @RequestMapping(value = "updateProType")
    public Map updateProType(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String id=request.getParameter("id");
        String protype=request.getParameter("protype");
        String phone= (String) httpSession.getAttribute("appId");
        String bianhao=request.getParameter("bianhao");

        if(phone == null || "".equals(phone) || bianhao == null ||
                "".equals(bianhao) || protype ==null || "".equals(protype)
       ||id == null || "".equals(id) ){
            map.put("result","error");
            map.put("errorMessage","传参含空");
            logger.info("传参含空");
        }
        else {
                int isOk=proTypeService.updateProType(id,protype,phone,bianhao);
                if(isOk==0){
                    map.put("result","error");
                    map.put("errorMessage","插入"+protype+"失败");
                }
                else {
                    map.put("result","success");
                    map.put("message","更新成功");
                }

        }
        return map;
    }


    @RequestMapping(value = "selectType")
    public Map selectType(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String phone= (String) httpSession.getAttribute("appId");
        String bianhao=request.getParameter("bianhao");

        if(phone == null || "".equals(phone) || bianhao == null ||
                "".equals(bianhao)  ){
            map.put("result","error");
            map.put("errorMessage","传参含空");
            logger.info("传参含空");
        }
        else {
            List<String> list=proTypeService.selecProType(phone,bianhao);
            map.put("result","success");
        }
        return map;
    }

}
