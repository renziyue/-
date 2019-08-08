//package com.example.demo2.service;
//
//import com.example.demo2.dao.MongoUserDao;
//import com.example.demo2.entity.MongoUser;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.Update;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.Resource;
//import java.util.List;
//
//@Service("mongoUserDao")
//public class MongoUserDaoImpl implements MongoUserDao {
//    @Resource
//    private MongoTemplate mongoTemplate;
//
//    @Override
//    public void saveUser(MongoUser user) { mongoTemplate.save(user);
//    }
//
//    @Override
//    public MongoUser findUserById(long id) { Query query = new Query(Criteria.where("id").is(id));
//        return mongoTemplate.findOne(query,MongoUser.class);
//    }
//    @Override
//    public MongoUser findUserByUserName(String userName) { Query query = new Query(Criteria.where("userName").is(userName));
//        MongoUser user = mongoTemplate.findOne(query , MongoUser.class);
//        return user;
//    }
//    @Override
//    public void updateUser(MongoUser user) { Query query=new Query(Criteria.where("id").is(user.getId()));
//        Update update= new Update().set("userName", user.getUserName()).set("passWord", user.getPassWord());
//        //更新查询返回结果集的第一条
//        mongoTemplate.updateFirst(query,update,MongoUser.class);
//        //更新查询返回结果集的所有
//        // mongoTemplate.updateMulti(query,update,User.class);
//    } @Override
//    public void deleteUserById(Long id) { Query query=new Query(Criteria.where("id").is(id));
//        mongoTemplate.remove(query,MongoUser.class);
//    } @Override
//    public List<MongoUser> findAll(int pageNo, int pageSize) { Query query = new Query();
//        query.skip((pageNo - 1) * pageSize);
//        query.limit(pageSize);
//        query.with(new Sort(new Sort.Order(Sort.Direction.ASC, "userId")));//按照userId排序
//        List<MongoUser> users = mongoTemplate.find(query,MongoUser.class);
//        return users;
//    } @Override
//    public List<MongoUser> list() { Query query = new Query();
//        List<MongoUser> users = mongoTemplate.find(query,MongoUser.class);
//        return users;
//    }
//}
