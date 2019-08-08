package com.example.demo2.service.userTemp;

import com.example.demo2.entity.Xmuser.User;

import java.util.List;

public interface UserService {
    List<User> select(String phone,String passwd);

    int add(String userId,String phone,String passwd );
}
