package com.mysql.jdbc;

import java.io.*;

public class Test {
    public void readwrith() throws IOException {
        int k=0;
        String url="";
        String time="";
        String jiekou="";
        File file = new File("/home/renziyue/software/channel-ipu/channelIpu-2019-03-06-2.log");
//        File file = new File("/home/renziyue/xxx.txt");
        BufferedReader reader = null;
        File files = new File("/home/renziyue/ll.xls");
        File filetime = new File("/home/renziyue/time.xls");
        File filejiekou = new File("/home/renziyue/jiekou.xls");

//         if file doesnt exists, then create it
        if (!files.exists()) {
            files.createNewFile();
        }
        if (!filetime.exists()) {
            filetime.createNewFile();
        }
        if (!filejiekou.exists()) {
            filejiekou.createNewFile();
        }

        FileWriter fw = new FileWriter(files.getAbsoluteFile());
        BufferedWriter bw = new BufferedWriter(fw);
        FileWriter fw1 = new FileWriter(filetime.getAbsoluteFile());
        BufferedWriter bw1 = new BufferedWriter(fw1);
        FileWriter fw2 = new FileWriter(filejiekou.getAbsoluteFile());
        BufferedWriter bw2 = new BufferedWriter(fw2);

//        System.out.println("Done");
        String xx="";
        try {
//            System.out.println("以行为单位读取文件内容，一次读一整行：");
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;

            int line = 1;
            // 一次读入一行，直到读入null为文件结束
            while ((tempString= reader.readLine()) != null) {
                if(k==1){
                    k=0;
//                    System.out.println(tempString);
                    String[] temps=tempString.split("at java.net");
                    url=url+"\r\n"+temps[0]+"\"";
                    bw.write(url);
                    bw.write("\n");
                    bw1.write(time);
                    bw1.write("\n");
                    bw2.write(jiekou);
                    bw2.write("\n");
//                    System.out.println(url);
                    System.out.println(time);
                    System.out.println(url);
                    System.out.println(jiekou);
                    xx="";
                    System.out.println("========================================================");
                }
                // 显示行号
//                System.out.println("line " + line + ": " + tempString);
                xx=tempString;
               if(xx.contains("调用http接口异常")){
                   k=1;
                   String[] sjcu=xx.split("\\[catalina");
                   time=sjcu[0];


                   String[] errors=sjcu[sjcu.length-1].split("com.ai.channel");
                   String[] jiekkous=errors[errors.length-1].split("http://");
                   String[] jiekouss=jiekkous[jiekkous.length-1].split("mcp");
                    jiekou="http\"//"+jiekouss[0];
                    url="\""+"com.ai.channel"+errors[1];
//                   System.out.println(error);
//                   System.out.println(time);


               }
                line++;
            }
            reader.close();
            bw.close();
            bw1.close();
            bw2.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) throws IOException {
//        Testt t=new Testt();
        Test t=new Test();
//t.readwrith();
//         Connection connection = null;
//        connection = t.getConnection();
//        t.getConnection();
      t.readwrith();

    }
}
