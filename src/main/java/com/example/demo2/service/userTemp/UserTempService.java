package com.example.demo2.service.userTemp;

import com.example.demo2.entity.userTemp.UserTemp;

import java.util.List;

public interface UserTempService {

    public List<UserTemp> selectAll(String userId);

    public List<UserTemp> selectExpl();

    int addUserTemp(String appId,String userId,String phone,String templateId,String appName,String ext1,String ext2);


    int updateTemp(String appId,String userId,String phone,String templateId,String appName,String ext1,String ext2);


    int deleteTemp(String appId,String userId);
}
