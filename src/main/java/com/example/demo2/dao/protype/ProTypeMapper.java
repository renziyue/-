package com.example.demo2.dao.protype;

import com.example.demo2.entity.protype.ProType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProTypeMapper {

    List<ProType> selectAll(@Param("phone") String phone, @Param("bianhao") String bianhao,@Param("id")String id);

    List<String> selecProType(@Param("phone") String phone, @Param("bianhao") String bianhao);

    int addprotype(@Param("record") ProType record);

    int deletetprotype(@Param("record") ProType record);


    int updateprotype(@Param("record") ProType record);


}
