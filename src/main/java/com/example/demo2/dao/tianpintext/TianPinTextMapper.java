package com.example.demo2.dao.tianpintext;

import com.example.demo2.entity.tianpin_text.TianPinText;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TianPinTextMapper {
    public List<TianPinText>  selectAll(@Param("phone") String phone,@Param("bianhao") String bianhao);

    int insertTianPin(@Param("record") TianPinText record);

    public List<TianPinText> selectexpom(@Param("record") TianPinText record);

    int upTianPin(@Param("record") TianPinText record);
}
