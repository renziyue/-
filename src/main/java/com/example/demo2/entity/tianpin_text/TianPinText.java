package com.example.demo2.entity.tianpin_text;

public class TianPinText {

    private String id;

    private String type;

    private  String value;

    private String isUrl;

    public String getIsUrl() {
        return isUrl;
    }

    public void setIsUrl(String isUrl) {
        this.isUrl = isUrl;
    }

    public String getUrlSrc() {
        return urlSrc;
    }

    public void setUrlSrc(String urlSrc) {
        this.urlSrc = urlSrc;
    }

    private String urlSrc;

    private String style;

    private String phone;

    private String bianhao;

    private  String ext1;

    private String ext2;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBianhao() {
        return bianhao;
    }

    public void setBianhao(String bianhao) {
        this.bianhao = bianhao;
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

    @Override
    public String toString() {
        return "TianPinText{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", value='" + value + '\'' +
                ", isUrl='" + isUrl + '\'' +
                ", urlSrc='" + urlSrc + '\'' +
                ", style='" + style + '\'' +
                ", phone='" + phone + '\'' +
                ", bianhao='" + bianhao + '\'' +
                ", ext1='" + ext1 + '\'' +
                ", ext2='" + ext2 + '\'' +
                '}';
    }
}
