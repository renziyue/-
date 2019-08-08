package com.example.demo2.service.orderInfo;

import com.example.demo2.entity.order.OrderInfo;

import java.util.List;

public interface OrderInfoService {


     int  addOrderInfo(String userId, String appId, String orderName, String orderNum, String orderPrice,String orderType,String orderExt1);


    int deleteOrderInfo(String appId, String  orderId);

    List<OrderInfo>  selectall(String appId,String customerId);

    int countnum(String appId);

    double sumPrice(String appId);



}
