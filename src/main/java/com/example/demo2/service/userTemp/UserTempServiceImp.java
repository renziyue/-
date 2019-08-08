package com.example.demo2.service.userTemp;

import com.example.demo2.dao.userTemp.UserTempMapper;
import com.example.demo2.entity.userTemp.UserTemp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTempServiceImp implements UserTempService {

    @Autowired
    private UserTempMapper userTempMapper;

    @Override
    public List<UserTemp> selectAll(String userId) {
        return userTempMapper.selectAll(userId);
    }

    @Override
    public List<UserTemp> selectExpl() {
        return null;
    }

    @Override
    public int addUserTemp(String appId,String userId, String phone, String templateId, String appName, String ext1, String ext2) {
        UserTemp record=new UserTemp();
        record.setAppName(appName);
        record.setPhone(phone);
        record.setUserId(userId);
        record.setTemplateId(templateId);
        record.setAppId(appId);
        return userTempMapper.addUserTemp(record);
    }

    @Override
    public int updateTemp(String appId, String userId, String phone, String templateId, String appName, String ext1, String ext2) {
        UserTemp record=new UserTemp();
        record.setAppName(appName);
        record.setPhone(phone);
        record.setUserId(userId);
        record.setTemplateId(templateId);
        record.setAppId(appId);
        return userTempMapper.updateTemp(record);
    }

    @Override
    public int deleteTemp(String appId, String userId) {
        UserTemp record=new UserTemp();

        record.setUserId(userId);

        record.setAppId(appId);
        return userTempMapper.deleteTemp(record);
    }
}
