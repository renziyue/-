//package com.example.demo2;
//
//import com.example.demo2.dao.MongoUserDao;
//import com.example.demo2.entity.MongoUser;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import javax.annotation.Resource;
//
//@RunWith(SpringRunner.class) @SpringBootTest
//public class UserDaoTest {
//    @Resource
//    private MongoUserDao mongoUserDao;
//
//    @Test
//    public void testSaveUser() throws Exception {
//        MongoUser user = new MongoUser();
//        user.setId(3L);
//        user.setUserName("小彭");
//        user.setPassWord("123456");
//        mongoUserDao.saveUser(user);
//    }
//}