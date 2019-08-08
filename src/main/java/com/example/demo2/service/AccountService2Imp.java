package com.example.demo2.service;

//import com.forezp.dao.AccountMapper2;


import com.example.demo2.dao.AccountMapper2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by fangzhipeng on 2017/4/20.
 */
@Service
public class AccountService2Imp implements AccountService2 {

    @Autowired
    AccountMapper2 accountMapper2;

    @Transactional
    public void transfer() throws RuntimeException{
        accountMapper2.update(90,1);//用户1减10块 用户2加10块
//        accountMapper2.findAccount(1);
////        int i=1/0;
////        accountMapper2.update(110,2);
    }
}
