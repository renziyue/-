package com.example.demo2.dao.template;

import com.example.demo2.entity.template.Template;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TemplateMapper {


    int addTemplate(@Param("record")Template record);

    int deleteTemp(@Param("record")Template record);

    List<Template> selectexplme(@Param("record")Template record);


    List<Template> selectAll(@Param("appId") String appId);

//    List<String>  selectTempId/
}
