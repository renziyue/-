package com.example.demo2.service.customerInfo;


import com.example.demo2.dao.customerInfo.CustomerInfoMapper;
import com.example.demo2.entity.customerInfo.CustomerInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CustomerInfoServiceImp  implements CustomerInfoService{

    @Autowired
    private CustomerInfoMapper customerInfoMapper;

    @Override
    public int addcustomerInfo(String customerId,String customerInfoPhone, String customPwd, String appId, String customerkey, String ext1, String ext2) {
        CustomerInfo record=new CustomerInfo();
        record.setCustomerPhone(customerInfoPhone);
        record.setCustomePasswd(customPwd);
        record.setAppId(appId);
        if(customerkey !=""){
            record.setCustomerKey(customerkey);
        }
        record.setCreateTime(new Date());

        record.setCustomerId(customerId);
        return customerInfoMapper.addcustomerInfo(record);
    }

    @Override
    public int deletecustomerInfo(String appId, String customerId) {
        CustomerInfo record=new CustomerInfo();
        record.setAppId(appId);
        record.setAppId(customerId);
        return customerInfoMapper.deleteCustomerInfo(record);
    }

    @Override
    public List<CustomerInfo> selectall(String appId) {
        return customerInfoMapper.selectAll(appId);
    }

    @Override
    public int countnum(String appId) {
        return customerInfoMapper.countNum(appId);
    }

    @Override
    public List<CustomerInfo> selectCustomer(String appId, String customerPhone, String customerPasswd) {
        return customerInfoMapper.selectCustomer(appId,customerPhone,customerPasswd);
    }


}
