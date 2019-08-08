package com.example.demo2.dao.userAdddress;

import com.example.demo2.entity.userAddress.UserAddress;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserAddressMapper {
    public List<UserAddress> selectexplme(@Param("record") UserAddress record);
    public List<UserAddress> selectAll(@Param("appId") String appId,@Param("userId") String userId);

    int updateAddress(@Param("record") UserAddress record);

    int updateNotDef(@Param("appId") String appId,@Param("userId") String userId);


    int addUserAddress(@Param("record") UserAddress record);

    int deleteAddress(@Param("record") UserAddress record);
}
