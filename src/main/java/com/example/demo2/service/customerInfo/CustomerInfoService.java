package com.example.demo2.service.customerInfo;

import com.example.demo2.entity.customerInfo.CustomerInfo;

import java.util.List;

public interface CustomerInfoService {


     int  addcustomerInfo(String customerId,String customerInfoPhone,String customPwd,String appId,String customerkey,String ext1,String ext2);


    int deletecustomerInfo(String appId,String customerId);

    List<CustomerInfo>  selectall(String appId);

    int countnum(String appId);

    List<CustomerInfo>  selectCustomer(String appId,  String customerPhone ,  String customerPasswd );





}
