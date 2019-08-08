package com.example.demo2.yaxinTest;

//import org.apache.el.parser.ParseException;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class Testt {

    private static String USERNAMR = "SCAPP";
    private static String PASSWORD = "ebiz,123";
    private static String DRVIER = "oracle.jdbc.driver.OracleDriver";
    private static String URL = "jdbc:oracle:thin:@10.4.64.56:1521:orcl";
    // 创建一个数据库连接
    Connection connection = null;
    // 创建预编译语句对象，一般都是用这个而不用Statement
    PreparedStatement pstm = null;
    public void AddData() throws SQLException {
        connection = getConnection();
        String sql ="";
//        PreparedStatement sqlStr = connection.prepareStatement("insert into SCAPP.TAB_MENU_WHITELIST (OPERATOR_CODE,MENU_ID,DONE_DATE) "
//                + "values(?,?,?)");
//        sqlStr.setString(1, "xxx");              //设置参数1，创建id为3212的数据
//        sqlStr.setString(2, "1182");
//        //设置参数2，name 为王刚
//        SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
//        java.util.Date myDate2 = null;
//        try {
//            myDate2 = dateFormat2.parse("2010-09-13");
//        } catch (java.text.ParseException e) {
//            e.printStackTrace();
//        }
//        sqlStr.setDate(3,new java.sql.Date(myDate2.getTime()));
////            psql.setFloat(5, (float) 2000.3);
//        sqlStr.executeUpdate();
    }

    public Connection getConnection() {
        try {
            Class.forName(DRVIER);
            connection = DriverManager.getConnection(URL, USERNAMR, PASSWORD);
            System.out.println("成功连接数据库");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("class not find !", e);
        } catch (SQLException e) {
            throw new RuntimeException("get connection error!", e);
        }

        return connection;
    }

    public void readwrith() {
        File file = new File("/home/renziyue/xxx.txt");
        BufferedReader reader = null;
        try {
//            System.out.println("以行为单位读取文件内容，一次读一整行：");
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;
            int line = 1;
            // 一次读入一行，直到读入null为文件结束
            while ((tempString = reader.readLine()) != null) {
                // 显示行号
//                System.out.println("line " + line + ": " + tempString);
                System.out.println(tempString);
                line++;
            }
            reader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
Testt t=new Testt();
//t.readwrith();
//         Connection connection = null;
//        connection = t.getConnection();
//        t.getConnection();
        try {
            t.AddData();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
