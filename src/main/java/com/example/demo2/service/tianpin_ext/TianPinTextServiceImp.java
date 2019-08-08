package com.example.demo2.service.tianpin_ext;

import com.example.demo2.dao.tianpintext.TianPinTextMapper;
import com.example.demo2.entity.tianpin_text.TianPinText;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TianPinTextServiceImp implements TianPinTextService {

    @Autowired
    public TianPinTextMapper tianPinTextMapper;

    @Override
    public List<TianPinText> selectAll(String phone,String bianhao) {
        return tianPinTextMapper.selectAll(phone,bianhao);
    }

    @Override
    public List<TianPinText> selectexp(String id, String type, String isUrl, String urlSrc, String style, String value, String phone, String bianhao) {
        System.out.println("id"+id);
        TianPinText record=new TianPinText();
        record.setPhone(phone);
        record.setBianhao(bianhao);
        record.setId(id);
        return tianPinTextMapper.selectexpom(record);
    }

    @Override
    public int insertTianPin(String id,String type,String isUrl,String urlSrc, String style, String value, String phone, String bianhao) {
        TianPinText record=new TianPinText();
        record.setId(id);
        record.setType(type);
        record.setStyle(style);
        record.setValue(value);
        record.setIsUrl(isUrl);
        record.setUrlSrc(urlSrc);
//        System.out.println(value);
        record.setPhone(phone);
        record.setBianhao(bianhao);

        return tianPinTextMapper.insertTianPin(record);
    }

    @Override
    public int updata(String id, String type, String isUrl, String urlSrc, String style, String value, String phone, String bianhao) {
        TianPinText record=new TianPinText();
        record.setId(id);
        record.setType(type);
//        record.setStyle(style);
        record.setValue(value);
        record.setIsUrl(isUrl);
        record.setUrlSrc(urlSrc);
        record.setPhone(phone);
        record.setBianhao(bianhao);
        return tianPinTextMapper.upTianPin(record);
    }
}
