package com.example.demo2.service.template;

import com.example.demo2.entity.template.Template;

import java.util.List;

public interface TemplateService {

    int addTemplate(String templateId,String pageName,String pageSet,String ext1,String appId,String ext2 );


    int deleteTemplate(String appId,String ext1);


    List<Template> selectAll(String appId);

    List<Template> selectExp(String templateId,String pageName,String pageSet,String ext1,String appId,String ext2);


}
