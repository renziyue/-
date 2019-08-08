package com.example.demo2.entity.protype;

public class ProType {

    private String id;

    private String proType;

    private String phone;

    private String bianHao;

    private String ext1;

    private String ext2;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProType() {
        return proType;
    }

    public void setProType(String proType) {
        this.proType = proType;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBianHao() {
        return bianHao;
    }

    public void setBianHao(String bianHao) {
        this.bianHao = bianHao;
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
        return "ProTypeMapper{" +
                "id='" + id + '\'' +
                ", proType='" + proType + '\'' +
                ", phone='" + phone + '\'' +
                ", bianHao='" + bianHao + '\'' +
                ", ext1='" + ext1 + '\'' +
                ", ext2='" + ext2 + '\'' +
                '}';
    }
}
