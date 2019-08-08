package com.example.demo2.web.producte;


import com.example.demo2.entity.producte.Producte;
import com.example.demo2.service.producte.ProducteService;
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
@RequestMapping("/Producte")
public class ProducteController {

    @Autowired
    public ProducteService producteService;

    @RequestMapping(value = "addprodocte")
    @ResponseBody
    public Map  addprodocte(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String phone= (String) httpSession.getAttribute("appId");
        String proName=request.getParameter("proName");
        String proType=request.getParameter("proType");
        String price=request.getParameter("price");
        String proNum=request.getParameter("proNum");
        String proext=request.getParameter("proext");
        String proSrc=request.getParameter("proSrc");
//        String phone=request.getParameter("phone");
        String bianhao=request.getParameter("bianhao");

        Map map1=producteService.addprodoce(proName,price,proNum,proType,proext,proSrc,phone,bianhao);
        int isadd= (int) map1.get("isok");
        if(isadd==0){
            map.put("result","error");
            map.put("errormessage","添加失败");
        }else {
            map.put("result","success");
            map.put("errormessage","添加成功");
            map.put("id",map1.get("id"));

            System.out.println("id="+map1.get("id"));
        }
        return map;
    }

    @RequestMapping(value = "selectproType")
    @ResponseBody
    public Map  selectproType(HttpServletRequest request, HttpServletResponse response){

        System.out.println("进入查询type");
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        String proType=request.getParameter("proType");
//        String phone=request.getParameter("phone");
        String bianhao=request.getParameter("bianhao");
        List<String> list=producteService.selectType(appId,"");
        for(int i=0;i<list.size();i++){
            System.out.println(list.get(i));
        }
        map.put("result","success");
        map.put("list",list);
        System.out.println("离开查询type");
        return map;
    }

    @RequestMapping(value = "selectprodocte")
    @ResponseBody
    public Map  selectprodocte(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        String proid=request.getParameter("proid");
        String proType=request.getParameter("proType");
        if(appId==null ||appId.equals("")){
             appId=request.getParameter("phone");
        }
        String binahao=request.getParameter("bianhao");
        System.out.println("查询pro参数:proid="+",phone="+appId+",bianhao="+binahao);
        List<Producte> list=producteService.selectexplme(proid,"","","",proType,"",appId,binahao);
        map.put("result","success");
        map.put("listCount",list.size());
        map.put("list",list);
        return map;
    }

    @RequestMapping(value = "deleteprodocte")
    @ResponseBody
    public Map  deleteprodocte(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String phone= (String) httpSession.getAttribute("appId");
        String proid=request.getParameter("proid");
//        String phone=request.getParameter("phone");
        String bianhao=request.getParameter("bianhao");

        System.out.println("删除产品：proid="+proid+",phone="+phone+",bianhao="+bianhao);
        int isdelete=producteService.deletepro(proid,phone,bianhao);
        if(isdelete==0){
            map.put("result","error");
            map.put("errormessage","删除失败");
        }else {
            map.put("result","success");
            map.put("errormessage","删除成功");
        }
        return map;
    }

    @RequestMapping(value = "updateprodocte")
    @ResponseBody
    public Map  updateprodocte(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String phone= (String) httpSession.getAttribute("appId");
        String proid=request.getParameter("proid");
        String proName=request.getParameter("proName");
        String proType=request.getParameter("proType");
        String price=request.getParameter("price");
        String proNum=request.getParameter("proNum");
        String proext=request.getParameter("proext");
//        String phone=request.getParameter("phone");
        String bianhao=request.getParameter("bianhao");
        System.out.println("updatepro   appId="+phone);

        int isUpdate=producteService.updatepro(proid,proName,price,proNum,proType,proext,phone,bianhao);
        if(isUpdate==0){
            map.put("result","error");
            map.put("errormessage","添加失败");
        }else {
            map.put("result","success");
            map.put("errormessage","添加成功");
        }
        return map;
    }
}
