package com.example.demo2.entity.order;

import java.util.Date;

public class OrderInfo {

    private int orderId;

    private  String appId;

    private String userId;

    private String orderName;

    private  Double orderPrice;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public Double getOderPrice() {
        return orderPrice;
    }

    public void setOderPrice(Double oderPrice) {
        this.orderPrice = oderPrice;
    }

    public int getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(int orderNum) {
        this.orderNum = orderNum;
    }

    public String getOrderext1() {
        return orderext1;
    }

    public void setOrderext1(String orderext1) {
        this.orderext1 = orderext1;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    private int orderNum;

    private String orderext1;

    private String orderType;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    private Date createTime;


}
