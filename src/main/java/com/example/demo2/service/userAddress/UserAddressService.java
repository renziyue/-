package com.example.demo2.service.userAddress;

import com.example.demo2.entity.userAddress.UserAddress;

import java.util.List;

public interface UserAddressService {
    List<UserAddress> selectexp(String addressId,String appId,String  isDef,String address,String ext1,String ext2,String userId);
    List<UserAddress> selectAll(String appId,String userId);


    int updateAddress(String addressId,String appId,String  isDef,String userId,String address,String ext1,String ext2);


    int updateNotDef(String appId,String userId);

    int addUserAddress(String appId,String address,String isDef,String ext1,String ext2,String userId);

    int deleteAddress(String appId,String addressId,String userId);
}
