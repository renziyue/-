package com.example.demo2.web.customerInfor;


import com.example.demo2.entity.ReturnMap.Resurnmap;
import com.example.demo2.entity.customerInfo.CustomerInfo;
import com.example.demo2.entity.userTemp.UserTemp;
import com.example.demo2.service.customerInfo.CustomerInfoService;
import com.example.demo2.service.orderInfo.OrderInfoServiceImp;
import com.example.demo2.service.userTemp.UserTempService;
import com.example.demo2.util.Rand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/Customer")
public class CustomerInforController {

    private static Logger logger = LoggerFactory.getLogger(CustomerInforController.class);


    @Autowired
    private CustomerInfoService customerInfoService;

    @Autowired
    private OrderInfoServiceImp orderInfoServiceImp;

    @Autowired
    private UserTempService userTempService;


    @RequestMapping(value = "selectHomePage")
    @ResponseBody
    public Map selectHomePage(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        int orderNum=0;
        int userNum=0;
        Double moneyNum=0.0;
        List<Resurnmap> resurnmaps=new ArrayList<>();
        HttpSession session=request.getSession();
        String userId= (String) session.getAttribute("userId");
        List<UserTemp> appIdlist=userTempService.selectAll(userId);

        for(int i=0;i<appIdlist.size();i++){
            Resurnmap resurnmap=new Resurnmap();
            String appId=appIdlist.get(i).getAppId();
            int userCount=customerInfoService.countnum(appId);
            userNum+=userCount;
            resurnmap.setAppId(appId);
            resurnmap.setAppName(appIdlist.get(i).getAppName());
            resurnmap.setCustomerNum(userCount);
            resurnmaps.add(resurnmap);
            int orderCount=orderInfoServiceImp.countnum(appId);
            resurnmap.setOrderNum(orderCount);
            orderNum+=orderCount;
            double moneyCount=orderInfoServiceImp.sumPrice(appId);
            resurnmap.setPriceNum(moneyCount);
            moneyNum+=moneyCount;
        }
        map.put("result","success");
        map.put("list",resurnmaps);
        map.put("userCount",userNum);
        map.put("orderCount",orderNum);
        map.put("moneyCount",moneyNum);

        return map;
    }


    @RequestMapping(value = "selectAll")
    @ResponseBody
    public Map selectAll(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session=request.getSession();
        String userId= (String) session.getAttribute("userId");
        String appId=request.getParameter("appId");

        List<CustomerInfo> list=customerInfoService.selectall(appId);
        for(int i=0;i<list.size();i++){
            appId=list.get(i).getAppId();
            list.get(i).setExt1("");
        }
        map.put("result","success");
        map.put("list",list);
        return map;
    }


    @RequestMapping(value = "addCustomer")
    @ResponseBody
    public Map addCustomer(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session=request.getSession();
        String username=request.getParameter("username");
        String passwd=request.getParameter("passwd");

        String appId= (String) session.getAttribute("appId");
        String Homebianhao= (String) session.getAttribute("Homebianhao");
        logger.info("username="+username+",passwd="+passwd);
        Rand rand=new Rand();
        String customerId= rand.getRandom(10);
        int isOk=customerInfoService.addcustomerInfo(customerId,username,passwd,appId,"","","");
        if(isOk !=0){
            logger.info("用户"+customerId+"进入"+appId+"系统");
            session.setAttribute("userId",customerId);
            map.put("result", "success");
//            map.put("message", "登录成功");
            map.put("bianhao",Homebianhao);
            map.put("appId",appId);
        }
        map.put("result","success");
        map.put("message","注册成功");
        return map;
    }

    @RequestMapping(value = "selectCustomer")
    @ResponseBody
    public Map selectCustomer(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session=request.getSession();
        String username=request.getParameter("username");
        String passwd=request.getParameter("passwd");
        String appId= (String) session.getAttribute("appId");
        String Homebianhao= (String) session.getAttribute("Homebianhao");
        logger.info("selectCustomer  username="+username+",passwd="+passwd+",appId="+appId+",bianhao="+Homebianhao);

        List<CustomerInfo> list=customerInfoService.selectCustomer(appId,username,passwd);

        if(list !=null) {
            session.setAttribute("userId",list.get(0).getCustomerId());
            logger.info("用户"+list.get(0).getCustomerId()+"进入"+appId+"系统");
            map.put("result", "success");
            map.put("message", "登录成功");
            map.put("bianhao",Homebianhao);
            map.put("appId",appId);
        }
        return map;
    }
}
