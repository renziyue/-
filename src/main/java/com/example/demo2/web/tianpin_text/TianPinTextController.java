package com.example.demo2.web.tianpin_text;


import com.example.demo2.entity.tianpin_text.TianPinText;
import com.example.demo2.service.tianpin_ext.TianPinTextService;
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
@RequestMapping("/TianPinText")
public class TianPinTextController {
    private static Logger logger = LoggerFactory.getLogger(TianPinTextController.class);

    @Autowired
    public TianPinTextService tianPinTextService;


    @RequestMapping(value = "selectAll")
    @ResponseBody
    public Map selectAll(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
//        String phone=request.getParameter("phone").trim();
        String bianhao=request.getParameter("bianhao").trim();
        String xx=request.getParameter("_");
        System.out.println(xx);
        logger.info("appId="+appId+",bianhao="+bianhao);
        List<TianPinText> record=tianPinTextService.selectAll(appId,bianhao);
//        if(record.size()>0){
            map.put("result","success");
            map.put("list",record);
//        }
//        else {
//            Rand rand=new Rand();
//            String newbainhao=rand.getRandom(10);
//            List<TianPinText> list=tianPinTextService.selectAll("",bianhao);
//            if(list.size()>0){
//                logger.info("加载出错");
//            }else {
//                for(int i=0;i<list.size();i++){
////                   int isInsert= tianPinTextService.add(list);
////
////                    if(isInsert==0){
////                        logger.info("插入新数据失败");
////                    }
//                }
//            }
//            x修改拎一个表,,chaxun meizuo..
//            map.put("result","success");
//            map.put("bianhao",newbainhao);
//        }

logger.info("========================selectAll----end===============================");
        return map;
    }

    @RequestMapping(value = "updateTianPin")
    @ResponseBody
    public Map updateTianPin(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String ids=request.getParameter("ids");
        String values=request.getParameter("values");
        String isUrl=request.getParameter("isUrl");
        String urlSrc=request.getParameter("urlSrc");
        String types=request.getParameter("type");
        String phone= (String) httpSession.getAttribute("appId");
        String bianhao=request.getParameter("bianhao");
        logger.info("ids="+ids+"\n"+"values="+values);
        logger.info("isurl="+isUrl+"\n"+"urlsrc"+urlSrc+"\n"+"types="+types);
        ids=ids.substring(0,ids.length()-1);
        values=values.substring(0,values.length()-1);
        isUrl=isUrl.substring(0,isUrl.length()-1);
        urlSrc=urlSrc.substring(0,urlSrc.length()-1);
        types=types.substring(0,types.length()-1);
//        urlSrc=urlSrc.substring(0,urlSrc.length()-1);
        String[] allId=ids.split("@");
        String[] allValue=values.split("@");
        String[] allisUrl=isUrl.split("@");
        String[] allurlSrc=urlSrc.split("@");
        String[] type=types.split("@");
        logger.info("idscount="+allId.length+",valueCount="+allValue.length+",isurl:"+allisUrl.length+",src"+allurlSrc.length+",phone="+phone+",bianhao="+bianhao);
//        List<TianPinText> list=tianPinTextService.selectAll(phone,bianhao);
        for(int i=0;i<allId.length;i++){
            logger.info("------------------");
            List<TianPinText> list=tianPinTextService.selectexp(allId[i],"","","","","",phone,bianhao);
            logger.info(String.valueOf(list.size()));
            if(list.size()<=0){
                logger.info(allId[i]+",text"+","+allisUrl[i]+","+allurlSrc[i]+","+allValue[i]+","+phone+bianhao);
                int isAdd=tianPinTextService.insertTianPin(allId[i],type[i],allisUrl[i],allurlSrc[i],"",allValue[i],phone,bianhao);
               logger.info(String.valueOf(isAdd));
                if(isAdd==0){
                    map.put("result","erroradd");
                }else {
                    map.put("result","success");
                }
            }
            else {
                logger.info("update");
                int isUpdate=tianPinTextService.updata(allId[i],type[i],allisUrl[i],allurlSrc[i],"",allValue[i],phone,bianhao);
                if(isUpdate!=0){
                    map.put("result","success");
                }else {
                    map.put("result","errorupdate");
                }
            }
        }
        return map;

    }



}
