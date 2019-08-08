package com.example.demo2.dao.userTemp;

import com.example.demo2.entity.userTemp.UserTemp;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserTempMapper {
     List<UserTemp>  selectAll(@Param("userId") String userId);

     List<UserTemp>  selectexplme(@Param("record") UserTemp record);


     int addUserTemp(@Param("record") UserTemp record);


     int updateTemp(@Param("record") UserTemp record);

     int deleteTemp(@Param("record") UserTemp record);
}
