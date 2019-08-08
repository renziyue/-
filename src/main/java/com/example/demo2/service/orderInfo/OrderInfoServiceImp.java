package com.example.demo2.service.orderInfo;


import com.example.demo2.dao.orderInfo.OrderInfoMapper;
import com.example.demo2.entity.order.OrderInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderInfoServiceImp implements OrderInfoService{

    @Autowired
    private OrderInfoMapper orderInfoMapper;



    @Override
    public int addOrderInfo(String userId, String appId, String orderName, String orderNum, String  orderPrice, String orderType, String orderExt1) {
        OrderInfo record=new OrderInfo();
        record.setUserId(userId);
        record.setOrderName(orderName);
        record.setAppId(appId);
        record.setOderPrice(Double.valueOf(orderPrice));
        record.setOrderNum(Integer.parseInt(orderNum));
        record.setOrderext1(orderExt1);
        record.setOrderType(orderType);
        record.setCreateTime(new Date());
        return orderInfoMapper.addorderInfo(record);
    }

    @Override
    public int deleteOrderInfo(String appId, String  orderId) {
        OrderInfo record=new OrderInfo();
        record.setAppId(appId);
        record.setOrderId(Integer.parseInt(orderId));
        return orderInfoMapper.deleteOrderInfo(record);
    }

    @Override
    public List<OrderInfo> selectall(String appId,String customerId)
    {
        return orderInfoMapper.selectAll(appId,"");
    }

    @Override
    public int countnum(String appId) {
        return orderInfoMapper.countNum(appId);
    }

    @Override
    public double sumPrice(String appId) {
        System.out.println("sumPrice-------appId"+appId);
        return orderInfoMapper.sumPrice(appId);
    }
}
