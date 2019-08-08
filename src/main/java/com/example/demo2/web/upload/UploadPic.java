package com.example.demo2.web.upload;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Controller
public class UploadPic  {
//    File file=new File("");
@RequestMapping(value="uploadFile")
@ResponseBody
private String  saveFile(MultipartFile file) {
    System.out.println("uploadFile");
    String nginxpath="";

    try {
// 文件保存路径
//        String filePath = "http://localhost/"; //映射的地址

//String filePath = request.getSession().getServletContext().getRealPath("upload/");本地项目路径

//        String filename = file.getOriginalFilename();//获取file图片名称
        String filename="";
//        System.out.println(filename);

        filename= String.valueOf(System.currentTimeMillis());
        String type=file.getContentType();
       String[] imagetypes=type.split("/");
       String filetype=imagetypes[imagetypes.length-1];
        String fileSize= String.valueOf(file.getSize());
        System.out.println(filename+","+filetype+","+fileSize);

//        uploadFile(file.getBytes(), filePath, filename);
        if(file.isEmpty()){
            return "false";
        }
        String filePath = "/home/renziyue/software/nginx/images/"+filename+"."+filetype; //映射的地址
//        String filePath="C:/nginx/html/rzy/"+filename+"."+filetype;

        nginxpath=filePath;

        File desc=new File(filePath);
//        if(!desc.getParentFile().exists()){
//            desc.getParentFile().mkdirs();
//        }
        file.transferTo(desc);
//        System.out.println("http://62.234.72.98:8080/"+filename+"."+filetype);
//        return "http://62.234.72.98/rzy/"+filename+"."+filetype;
        return "http://localhost/"+filename+"."+filetype;
//        return "http://localhost/xiumin.png";

    } catch (Exception e) {
        e.printStackTrace();
    }
    return nginxpath;
//    return "http://localhost/xiumin.png";
}

}
