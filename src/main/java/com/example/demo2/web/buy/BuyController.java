package com.example.demo2.web.buy;


import com.example.demo2.entity.producte.Producte;
import com.example.demo2.service.producte.ProducteService;
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
//@RequestMapping("buy")
public class BuyController {

    private static Logger logger = LoggerFactory.getLogger(BuyController.class);


    @Autowired
    private ProducteService producteService;

    @RequestMapping(value = "buyone")
    public String buy(ModelMap model, HttpServletRequest request, HttpServletResponse response){
        HttpSession httpSession=request.getSession();
        String phone= (String) httpSession.getAttribute("appId");
//        String phone=request.getParameter("phone");
        String bianhao=request.getParameter("bianhao");
        String id=request.getParameter("id");
        logger.info("购买页面入参：id="+id+",phone="+phone+",bianhao="+bianhao);

        List<Producte> list=producteService.selectexplme(id,"","","","","",phone,"");
        logger.info("conut:"+list.size());
        for(int i=0;i<list.size();i++){
            logger.info(id,list.get(i).getProName(),list.get(i).getExt2());
            model.addAttribute("proid", id);
            model.addAttribute("proname", list.get(i).getProName());
            model.addAttribute("protype",list.get(i).getProType());
            model.addAttribute("prosrc",list.get(i).getExt2());
            model.addAttribute("proprice",list.get(i).getPrice());
            model.addAttribute("pronum",list.get(i).getCount());
            model.addAttribute("ext",list.get(i).getExt1());
            model.addAttribute("bianhao",list.get(i).getBianHao());
            model.addAttribute("phone",list.get(i).getPhone());
        }
//        model.addAttribute("phone", phone);

        return "bysj/buys";
    }
}
