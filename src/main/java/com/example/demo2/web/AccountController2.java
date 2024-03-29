package com.example.demo2.web;

//import com.forezp.service.AccountService2;

import com.example.demo2.service.AccountService2Imp;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//import org.mybatis.spring.annotation.MapperScan;

/**
 * Created by fangzhipeng on 2017/4/20.
 */
@RestController
@RequestMapping("/account2")
@MapperScan("com.example.demo2.dao")
public class AccountController2 {
    @Autowired
    AccountService2Imp accountService;

    @RequestMapping(value = "transfer", method = RequestMethod.GET)
    public void transfer(){
        accountService.transfer();
    }
}
