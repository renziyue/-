package com.example.demo2.service.producte;

import com.example.demo2.entity.producte.Producte;

import java.util.List;
import java.util.Map;

public interface ProducteService {

    Map addprodoce(String proName, String price, String num, String proType, String ext, String proSrc, String phone, String bianhao);


    int deletepro(String id,String phone,String bianhao);


    int updatepro(String id,String proName,String price,String num,String proType,String ext,String phone,String bianhao);

    List<Producte>  selectall(String phone,String bianhao);

    List<Producte> selectexplme(String id,String proName,String price,String num,String proType,String ext,String phone,String bianhao);

    List<String> selectType(String phone,String bianhao);
}
