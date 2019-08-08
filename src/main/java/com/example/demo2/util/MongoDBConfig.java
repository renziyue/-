//package com.example.demo2.util;
//
//import com.mongodb.MongoClientURI;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.data.mongodb.MongoDbFactory;
//import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
//
//import java.net.UnknownHostException;
//
//@Configuration //等价于XML中配置bean
// @PropertySource(value = "classpath:database.properties",ignoreResourceNotFound = true)
//public class MongoDBConfig {
//    @Value("${mongodb.schema}")
//    private String databaseName;
//    @Value("${mongodb.uri}")
//    private String uri;
//    @Value("${mongodb.username}")
//    private String userName;
//    @Value("${mongodb.password}")
//    private String password;
//    @Bean
//    public MongoDbFactory mongoDbFactory() throws UnknownHostException {
//        String uriStr="mongodb://"+userName+":"+password+"@"+uri+"/"+databaseName;
//        System.out.println(uriStr);
//        MongoClientURI mongoClientURI=new MongoClientURI(uriStr);
//        MongoDbFactory mongoDbFactory=new SimpleMongoDbFactory(mongoClientURI); return mongoDbFactory; } }
