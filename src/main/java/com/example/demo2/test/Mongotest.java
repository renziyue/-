package com.example.demo2.test;

import com.example.demo2.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.demo2.dao.CustomerRepository;
public class Mongotest {
    @Autowired
    private CustomerRepository repository;


    @RequestMapping("/mongo")
    @ResponseBody
    public String mongo() {
        String aa="";
//    repository.deleteAll();
//
////		 save a couple of customers
//    repository.save(new Customer("Alice", "Smith"));
//    repository.save(new Customer("Bob", "Smith"));

//		// fetch all customers
//		System.out.println("Customers found with findAll():");
//		System.out.println("-------------------------------");
        for (Customer customer : repository.findAll()) {
            System.out.println(customer.firstName);
            aa+=customer.firstName+",";

        }

        //		// fetch an individual customer
//		System.out.println("Customer found with findByFirstName('Alice'):");
//		System.out.println("--------------------------------");
//		System.out.println(repository.findByFirstName("Alice"));
//
//		System.out.println("Customers found with findByLastName('Smith'):");
//		System.out.println("--------------------------------");
//		for (Customer customer : repository.findByLastName("Smith")) {
//			System.out.println(customer);
//		}
        return aa;
    }
}
