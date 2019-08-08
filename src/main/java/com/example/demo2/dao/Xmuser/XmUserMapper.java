package com.example.demo2.dao.Xmuser;

import com.example.demo2.entity.Xmuser.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface XmUserMapper {
    int insert(@Param("record") User record);


    List<User> select(@Param("phone") String phone,@Param("passwd") String passwd);
}
