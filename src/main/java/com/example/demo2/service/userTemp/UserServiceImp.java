package com.example.demo2.service.userTemp;

import com.example.demo2.dao.Xmuser.XmUserMapper;
import com.example.demo2.entity.Xmuser.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImp implements UserService {

    @Autowired
    private XmUserMapper xmUserMapper;
//    @Override
//    public List<User> inert(String phone, String passwd) {
//
//        return xmUserMapper.select(phone,passwd);
//    }

    @Override
    public List<User> select(String phone, String passwd) {
        return xmUserMapper.select(phone,passwd);
    }

    @Override
    public int add(String userId,String phone, String passwd) {
        User record=new User();
        record.setPhone(phone);
        record.setUserId(userId);
        record.setPasswd(passwd);
        return xmUserMapper.insert(record);

    }
}
