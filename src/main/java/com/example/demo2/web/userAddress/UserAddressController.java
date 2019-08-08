package com.example.demo2.web.userAddress;


import com.example.demo2.entity.userAddress.UserAddress;
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
@RequestMapping("/address")
public class UserAddressController {

    private static Logger logger = LoggerFactory.getLogger(UserAddressController.class);


    @Autowired
    private UserAddressService userAddressService;


    @RequestMapping(value = "selectAllAddress")
    @ResponseBody
    public Map selectAddress(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        List<UserAddress> list=null;
        HttpSession session = request.getSession();
        String appId= (String) session.getAttribute("appId");
        String userId= (String) session.getAttribute("userId");
        logger.info("查询全部传入参数 APPId="+appId+",userId="+userId);
            list=userAddressService.selectAll(appId,userId);
            logger.info(String.valueOf(list.size()));
        map.put("result","success");
        map.put("list",list);
        return map;
    }

    @RequestMapping(value = "updateDef")
    @ResponseBody
    public Map updateDef(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        List<UserAddress> list=null;
        HttpSession session = request.getSession();
        String appId= (String) session.getAttribute("appId");
        String userId= (String) session.getAttribute("userId");
        String isDef=request.getParameter("isDef");
        String addressId=request.getParameter("addressId");
        logger.info("更新传入参数 APPId="+appId+",isDef="+isDef+",addressId"+addressId+",userId="+userId);
            int isUpdate=userAddressService.updateNotDef(appId,userId);
//            if(isUpdate==1){
                isUpdate=  userAddressService.updateAddress(addressId,appId,isDef,userId,"","","");
//            }
        map.put("result","success");
        return map;
    }

    @RequestMapping(value = "addAddress")
    @ResponseBody
    public Map addAddress(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session = request.getSession();
        String appId= (String) session.getAttribute("appId");
        String userId= (String) session.getAttribute("userId");
        String isDef=request.getParameter("isDef");
        String address=request.getParameter("address");
        String name=request.getParameter("name");
        String phone=request.getParameter("phone");
        String page=request.getParameter("page");
        logger.info("add传入参数 APPId="+appId+",isDef="+isDef+",address="+address+",name="+name+",phone="+phone);
        if("1".equals(isDef)){
            userAddressService.updateNotDef(appId,userId);
        }
        int isAdd=userAddressService.addUserAddress(appId,address,isDef,name,phone,userId);
        map.put("result","success");
        map.put("page",page);
        return map;
    }
    @RequestMapping(value = "deleteAddress")
    @ResponseBody
    public Map deleteAddress(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session = request.getSession();
        String appId= (String) session.getAttribute("appId");
        String userId= (String) session.getAttribute("userId");
        String addressId=request.getParameter("addressId");
        String page=request.getParameter("page");
        logger.info("delete传入参数 APPId="+appId+",addressId="+addressId);

        int isAdd=userAddressService.deleteAddress(appId,addressId,userId);
        map.put("result","success");
        map.put("page",page);
        return map;
    }
}
