package com.example.demo2.dao;

import com.example.demo2.entity.Account;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fangzhipeng on 2017/4/20.
 */
public interface AccountMapper2 {
   int update(@Param("money") double money, @Param("id") int id);
   List<Account> findAccount(@Param("id") int id);
}
