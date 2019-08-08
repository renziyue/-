package com.example.demo2.web.orderInfo;

import com.example.demo2.entity.order.OrderInfo;
import com.example.demo2.entity.userAddress.UserAddress;
import com.example.demo2.service.orderInfo.OrderInfoService;
import com.example.demo2.service.userAddress.UserAddressService;
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
@RequestMapping("/Order")
public class OrderInfocontroller {
    private static Logger logger = LoggerFactory.getLogger(OrderInfocontroller.class);


    @Autowired
    private OrderInfoService orderInfoService;
     @Autowired
     private UserAddressService userAddressService;


    @RequestMapping(value = "addOrderInfo")
    @ResponseBody
    public Map addOrderInfo(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        String userId= (String) httpSession.getAttribute("userId");
        String Homebianhao= (String) httpSession.getAttribute("Homebianhao");

        String orderName=request.getParameter("orderName");
        String orderPrice=request.getParameter("orderPrice");
        String orderNum=request.getParameter("orderNum");
        String orderType=request.getParameter("orderType");
        String orderExt1=request.getParameter("orderExt1");
        logger.info("appId="+appId+",userId="+userId+",Homebianhao="+Homebianhao+",orderName="+orderName+",orderPrice="+orderPrice+",orderType="+orderType+",orderExt1="+orderExt1);
        int isOk=orderInfoService.addOrderInfo(userId,appId,orderName,orderNum,orderPrice,orderType,orderExt1);

        if(isOk==1){
            map.put("result","sucess");
            map.put("bianhao",Homebianhao);
            map.put("appId",appId);
            List<UserAddress> address=userAddressService.selectexp("",appId,"1","","","",userId);
            map.put("address",address.get(0).getAddress());
        }
        return map;
    }

    @RequestMapping(value = "deleteOrderInfo")
    @ResponseBody
    public Map deleteOrderInfo(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String appId= (String) httpSession.getAttribute("appId");
        String orderId=request.getParameter("orderId");
        int isOk=orderInfoService.deleteOrderInfo(appId,orderId);
        if(isOk==1){
            map.put("result","success");
            map.put("message","删除成功");
        }
        return map;
    }

    @RequestMapping(value = "selectOrderInfo")
    @ResponseBody
    public Map selectOrderInfo(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession httpSession=request.getSession();
        String appId= request.getParameter("appId");
        String userId= (String) httpSession.getAttribute("userId");
        logger.info("selectOrderInfo appId="+appId+",userId="+userId);
        List<OrderInfo> list=orderInfoService.selectall(appId,userId);
        map.put("result","success");
        map.put("list",list);

        return map;
    }
}
