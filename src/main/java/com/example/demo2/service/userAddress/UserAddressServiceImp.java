package com.example.demo2.service.userAddress;

import com.example.demo2.dao.userAdddress.UserAddressMapper;
import com.example.demo2.entity.userAddress.UserAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserAddressServiceImp implements  UserAddressService {

    @Autowired
    private UserAddressMapper userAddressMapper;

    @Override
    public List<UserAddress> selectexp(String addressId, String appId, String  isDef, String address, String ext1, String ext2,String userId) {
        UserAddress record=new UserAddress();
        record.setUserId(userId);
        if(addressId!=""){
            record.setAddressId(Integer.parseInt(addressId));
        }
        if(isDef!=""){
            record.setIsDef(Integer.parseInt(isDef));
        }
        record.setAppId(appId);
        record.setAddress(address);
        record.setExt1(ext1);
        record.setExt2(ext2);
        return userAddressMapper.selectexplme(record);
    }

    @Override
    public List<UserAddress> selectAll(String appId,String userId) {
        return userAddressMapper.selectAll(appId,userId);
    }

    @Override
    public int updateAddress(String addressId, String appId, String isDef,String userId, String address, String ext1, String ext2) {
        UserAddress record=new UserAddress();
        if(addressId!=""){
            System.out.println(addressId+"addresId");
            record.setAddressId(Integer.parseInt(addressId));
        }
        if(isDef!=""){
            System.out.println("isdef="+isDef);
            record.setIsDef(Integer.parseInt(isDef));
        }
        record.setAppId(appId);
        record.setUserId(userId);
        record.setAddress(address);
        record.setExt1(ext1);
        record.setExt2(ext2);
        userAddressMapper.updateAddress(record);
        return 0;
    }

    @Override
    public int updateNotDef(String appId,String userId) {
        return userAddressMapper.updateNotDef(appId,userId);
    }

    @Override
    public int addUserAddress(String appId, String address, String isDef, String ext1, String ext2,String userId) {
        UserAddress record=new UserAddress();
        record.setAppId(appId);
        record.setIsDef(Integer.parseInt(isDef));
        record.setAddress(address);
        record.setExt1(ext1);
        record.setExt2(ext2);
        record.setUserId(userId);
        return userAddressMapper.addUserAddress(record);
    }

    @Override
    public int deleteAddress(String appId, String addressId,String userId) {
        System.out.println("imp:"+addressId);
        UserAddress record=new UserAddress();
        record.setAppId(appId);
        record.setUserId(userId);
        record.setAddressId(Integer.parseInt(addressId));
        return userAddressMapper.deleteAddress(record);
    }
}
