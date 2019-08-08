package com.example.demo2.dao.producte;

import com.example.demo2.entity.producte.Producte;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProducteMapper {



    List<Producte> selectAll(@Param("phone") String phone, @Param("bianhao") String bianhao);

    List<Producte> selectexplme(@Param("record") Producte record);

    int addprotype(@Param("record") Producte record);

    int deletetprotype(@Param("record") Producte record);

    int updateprotype(@Param("record") Producte record);

    int updatepro(@Param("record") Producte record);

    List<String> selectType(@Param("record") Producte record);

}
