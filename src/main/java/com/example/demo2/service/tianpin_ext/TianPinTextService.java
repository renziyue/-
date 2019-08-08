package com.example.demo2.service.tianpin_ext;

import com.example.demo2.entity.tianpin_text.TianPinText;

import java.util.List;

public interface TianPinTextService {
    public List<TianPinText> selectAll(String phone,String bianhao);

    public List<TianPinText> selectexp(String id,String type,String isUrl,String urlSrc,String style,String value,String phone,String bianhao);

    int insertTianPin(String id,String type,String isUrl,String urlSrc,String style,String value,String phone,String bianhao);

    public int updata(String id,String type,String isUrl,String urlSrc,String style,String value,String phone,String bianhao);
}
