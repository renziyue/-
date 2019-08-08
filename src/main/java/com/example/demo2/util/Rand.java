package com.example.demo2.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Rand {
    public ArrayList getDiffNO(int n){
        // 生成 [0-n) 个不重复的随机数
        // list 用来保存这些随机数
        ArrayList list = new ArrayList();
        Random rand = new Random();
        boolean[] bool = new boolean[n];
        int num = 0;
        for (int i = 0; i < n; i++) {
            do {
                // 如果产生的数相同继续循环
                num = rand.nextInt(n);
            } while (bool[num]);
            bool[num] = true;
            list.add(num);
        }
        return list;
    }

    public String getRandom(int n){
        List list=getDiffNO(n);
        String rand="";
        for(int i=0;i<list.size();i++){
            rand+=list.get(i).toString();
        }
        return rand;
    }

    public static void main(String[] args) {
        Rand r=new Rand();
        String xx=r.getRandom(5);


    }
}
