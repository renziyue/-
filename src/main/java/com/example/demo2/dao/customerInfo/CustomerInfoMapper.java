package com.example.demo2.dao.customerInfo;

import com.example.demo2.entity.customerInfo.CustomerInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CustomerInfoMapper {



    List<CustomerInfo> selectAll(@Param("appId") String appId);


    int addcustomerInfo(@Param("record") CustomerInfo record);

    int deleteCustomerInfo(@Param("record") CustomerInfo record);


    int countNum(@Param("appId") String appId);

    List<CustomerInfo>  selectCustomer(@Param("appId") String appId,@Param("customerPhone") String customerPhone ,@Param("customerPasswd") String customerPasswd );




}
