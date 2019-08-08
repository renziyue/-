package com.example.demo2.yaxinTest;

public class TTT {
    public static void main(String[] args) {
        String a="a，，，,b,,c"+"ccc";
//        String a="a,b,c";
//        String sa[]=a.split(",");
//        for(int i=0;i<sa.length;i++){
////            if(sa[i].equals("")){
////                continue;
////            }
//            if(sa[i] == ""){
//                continue;
//            }
//            System.out.println(a);
        if(a.contains("，")){
            System.out.println("xxxx");
           String x =a.replace("，","/");
//            System.out.println(a);
//            String x="hellow，".replace("，",",");
            System.out.println(x);
        }
//        }
//
//
    }
}
