package com.example.demo2.test;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
public class Write {
    public static void main( String[] args )
    {
        try {

            String content = "<!DOCTYPE html> <html lang='en'> <head> <title>Title</title> </head> <body> <h1>xxxxxxxxxxxxxxxxx</h1> </body> </html>";

            File file = new File("/home/renziyue/filename.html");

            // if file doesnt exists, then create it
            if (!file.exists()) {
                file.createNewFile();
            }

            FileWriter fw = new FileWriter(file.getAbsoluteFile());
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(content);
            bw.close();

            System.out.println("Done");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
