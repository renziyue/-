package com.example.demo2.dao;

//import com.forezp.entity.Customer;

import com.example.demo2.entity.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CustomerRepository extends MongoRepository<Customer, String> {

     Customer findByFirstName(String firstName);
     List<Customer> findByLastName(String lastName);

}