package com.example.demo2.entity.ReturnMap;

public class Resurnmap {

    private String appId;

    private String appName;

    private int orderNum;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public int getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(int orderNum) {
        this.orderNum = orderNum;
    }

    public int getCustomerNum() {
        return customerNum;
    }

    public void setCustomerNum(int customerNum) {
        this.customerNum = customerNum;
    }

    public double getPriceNum() {
        return priceNum;
    }

    public void setPriceNum(double priceNum) {
        this.priceNum = priceNum;
    }

    private int customerNum;


    private double priceNum;
}
