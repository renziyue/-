package com.example.demo2.test;

import com.example.demo2.service.producte.ProducteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.HashMap;
import java.util.Map;


@Controller
public class UploadPicT {


    @Autowired
    public ProducteService producteService;

    @RequestMapping(value="proUplode")
    @ResponseBody
    private String proUplode(MultipartFile file, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("proUplode");
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
//            if(file.isEmpty()){
//                return "false";
//            }
            String filePath = "/home/renziyue/software/nginx/images/"+filename+"."+filetype; //映射的地址




            File desc=new File(filePath);
            if(!desc.getParentFile().exists()){
                desc.getParentFile().mkdirs();
            }
            file.transferTo(desc);

            System.out.println("http://localhost/"+filename+"."+filetype);
            nginxpath= "http://localhost/"+filename+"."+filetype;
            HttpSession session=request.getSession();
            session.setAttribute("imgsrc",nginxpath);
//        return "http://localhost/xiumin.png";

        } catch (Exception e) {
            e.printStackTrace();
        }
        return nginxpath;
//    return "http://localhost/xiumin.png";
    }




    @RequestMapping("/teshuaddPro")
    @ResponseBody
    public Map teshuaddPro(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        String phone=request.getParameter("phone");
        String proName=request.getParameter("proName");
        String proType=request.getParameter("proType");
        String price=request.getParameter("price");
        String proNum=request.getParameter("proNum");
        String proext=request.getParameter("proext");

        String bianhao=request.getParameter("bianhao");

        HttpSession session=request.getSession();
        String proSrc= (String) session.getAttribute("imgsrc");
        System.out.println("session中获取的src="+proSrc);

        Map map1=producteService.addprodoce(proName,price,proNum,proType,proext,proSrc,phone,bianhao);
        int isadd= (int) map1.get("isok");
        System.out.println(isadd);
        if(isadd==0){
            map.put("result","error");
            map.put("errormessage","添加失败");
        }else {
            map.put("result","success");
            map.put("errormessage","添加成功");
//            map.put("id",map1.get("id"));

//            System.out.println("id="+map1.get("id"));
        }
        return map;
    }
}
