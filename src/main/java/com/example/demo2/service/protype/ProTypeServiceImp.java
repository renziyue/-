package com.example.demo2.service.protype;

import com.example.demo2.dao.protype.ProTypeMapper;
import com.example.demo2.entity.protype.ProType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProTypeServiceImp implements ProTypeService{

    @Autowired
    private ProTypeMapper proTypeMappering;


    @Override
    public int addProType(String id,String protype, String phone, String bianhao) {
        ProType proType=new ProType();
        proType.setProType(protype);
        proType.setPhone(phone);
        proType.setBianHao(bianhao);
        proType.setId(id);
        return proTypeMappering.addprotype(proType);
    }

    @Override
    public int deleteProType(String id, String phone, String bianhao) {
        ProType proType=new ProType();
//        proType.setProType(protype);
        proType.setPhone(phone);
        proType.setBianHao(bianhao);
        proType.setId(id);
        return proTypeMappering.deletetprotype(proType);
    }

    @Override
    public int updateProType(String protype, String id, String phone, String bianhao) {
        ProType proType=new ProType();
        proType.setProType(protype);
        proType.setPhone(phone);
        proType.setBianHao(bianhao);
        proType.setId(id);
        return proTypeMappering.updateprotype(proType);
    }

    @Override
    public List<ProType> selectAll( String id,String phone, String bianhao) {
        return proTypeMappering.selectAll(phone,bianhao,id);
    }

    @Override
    public List<String> selecProType(String phone, String bianhao) {
        return proTypeMappering.selecProType(phone,bianhao);
    }
}
