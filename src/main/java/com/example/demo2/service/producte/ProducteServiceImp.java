package com.example.demo2.service.producte;

import com.example.demo2.dao.producte.ProducteMapper;
import com.example.demo2.entity.producte.Producte;
import com.example.demo2.util.Rand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class ProducteServiceImp implements ProducteService {

    @Autowired
    private ProducteMapper producteMapper;


    @Override
    public Map addprodoce(String proName, String price, String num, String proType, String ext, String proSrc, String phone, String bianhao) {
      Map map=new HashMap();
        String id="";
        Producte record=new Producte();
//        record.setProName(proName);
//        record.setPrice(Double.parseDouble(price));
//        record.setCount(Integer.parseInt(num));
//        record.setProType(proType);
        record.setPhone(phone);
        record.setBianHao(bianhao);
        Rand rand=new Rand();
        while (true){
            id=rand.getRandom(10);
            record.setId(id);
            List isexit=producteMapper.selectexplme(record);
            if(isexit.size()==0){
                break;
            }
        }
        record.setProName(proName);
        record.setPrice(Double.parseDouble(price));
        record.setCount(Integer.parseInt(num));
        record.setProType(proType);
        record.setExt1(ext);
        record.setExt2(proSrc);

        int isok=producteMapper.addprotype(record);
        map.put("isok",isok);
        map.put("id",id);
        return map;
    }

    @Override
    public int deletepro(String id, String phone, String bianhao) {
        Producte record=new Producte();
        record.setId(id);
        record.setPhone(phone);
        record.setBianHao(bianhao);
        return producteMapper.deletetprotype(record);
    }

    @Override
    public int updatepro(String id, String proName, String price, String num, String proType,String ext, String phone, String bianhao) {
        Producte record=new Producte();
        record.setProName(proName);
        record.setPrice(Double.parseDouble(price));
        record.setCount(Integer.parseInt(num));
        record.setProType(proType);
        record.setId(id);
        record.setExt1(ext);
        record.setPhone(phone);
        record.setBianHao(bianhao);
        return producteMapper.updatepro(record);
    }

    @Override
    public List<Producte> selectall(String phone, String bianhao) {
        return null;
    }

    @Override
    public List<Producte> selectexplme(String id,String proName, String price, String num, String proType, String ext, String phone, String bianhao) {
        Producte record=new Producte();
        record.setProName(proName);
        if(price !="")
        record.setPrice(Double.parseDouble(price));
        if(num != "")
        record.setCount(Integer.parseInt(num));
        record.setProType(proType);
        record.setId(id);
        record.setExt1(ext);
        record.setPhone(phone);
        record.setBianHao(bianhao);
        return producteMapper.selectexplme(record);
    }

    @Override
    public List<String> selectType(String phone, String bianhao) {
        Producte record=new Producte();
        record.setBianHao(bianhao);
        record.setPhone(phone);
        return producteMapper.selectType(record);
    }
}
