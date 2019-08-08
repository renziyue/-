package com.example.demo2.entity.template;

public class Template {

    private String TemplateId;

    public String getTemplateId() {
        return TemplateId;
    }

    public void setTemplateId(String template) {
        TemplateId = template;
    }

    public String getPageName() {
        return pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getPageSet() {
        return pageSet;
    }

    public void setPageSet(String pageSet) {
        this.pageSet = pageSet;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getExt1() {
        return ext1;
    }

    public void setExt1(String ext1) {
        this.ext1 = ext1;
    }

    public String getExt2() {
        return ext2;
    }

    public void setExt2(String ext2) {
        this.ext2 = ext2;
    }

    private String pageName;

    private String pageSet;

    private String appId;

    private String ext1;

    private String ext2;
}
