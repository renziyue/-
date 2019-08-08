package com.example.demo2.service.template;

import com.example.demo2.dao.template.TemplateMapper;
import com.example.demo2.entity.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemplateServiceImp  implements  TemplateService{
    @Autowired
    private TemplateMapper templateMapper;

    @Override
    public int addTemplate(String templateId, String pageName, String pageSet, String ext1, String appId, String ext2) {
        Template record=new Template();
        record.setAppId(appId);
        record.setExt1(ext1);
        if(templateId != null && templateId != ""){
            record.setTemplateId(templateId);
        }else {
            record.setTemplateId("0");
        }

        record.setPageName(pageName);
        record.setPageSet(pageSet);
        return templateMapper.addTemplate(record);
    }

    @Override
    public int deleteTemplate(String appId, String ext1) {
        Template record=new Template();
        record.setAppId(appId);
        record.setExt1(ext1);
        return templateMapper.deleteTemp(record);
    }

    @Override
    public List<Template> selectAll(String appId) {
        return templateMapper.selectAll(appId);
    }

    @Override
    public List<Template> selectExp(String templateId, String pageName, String pageSet, String ext1, String appId, String ext2) {
        Template record=new Template();
        record.setAppId(appId);
        record.setExt1(ext1);
        record.setPageName(pageName);
        if(templateId != null && templateId != ""){
            record.setTemplateId(templateId);
        }else {
            record.setTemplateId("0");
        }

//        record.setPageName(pageName);
//        record.setPageSet(pageSet);
        return templateMapper.selectexplme(record);
    }
}
