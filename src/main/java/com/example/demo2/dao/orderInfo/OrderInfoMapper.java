package com.example.demo2.dao.orderInfo;

import com.example.demo2.entity.order.OrderInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderInfoMapper {



    List<OrderInfo> selectAll(@Param("appId") String appId,@Param("customerId") String customerId);


    int addorderInfo(@Param("record") OrderInfo record);

    int deleteOrderInfo(@Param("record") OrderInfo record);


    int countNum(@Param("appId") String appId);

    double sumPrice(@Param("appId") String appId);

}
