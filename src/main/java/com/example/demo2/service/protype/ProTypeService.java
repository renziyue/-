package com.example.demo2.service.protype;

import com.example.demo2.entity.protype.ProType;

import java.util.List;

public interface ProTypeService {

    public int addProType(String id,String protype,String phone,String bianhao);


    public  int deleteProType(String id,String phone,String bianhao );

    public int updateProType(String protype,String id,String phone,String bianhao);


    public List<ProType> selectAll(String id,String phone,String bianhao);


    public List<String > selecProType(String phone,String bianhao);


}
