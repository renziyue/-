package com.example.demo2.web.userTemp;


import com.example.demo2.entity.userTemp.UserTemp;
import com.example.demo2.service.userTemp.UserTempService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/userTemp")
public class UserTempController {

    private static Logger logger = LoggerFactory.getLogger(UserTempController.class);

    @Autowired
    private UserTempService userTempService;

    @RequestMapping(value = "selectApp")
    @ResponseBody
    public Map selectApp(HttpServletRequest request, HttpServletResponse response){
        Map map=new HashMap();
        HttpSession session=request.getSession();
        String userId= (String) session.getAttribute("userId");
        String phone= (String) session.getAttribute("phone");

//        userId="789456";
        logger.info("addTempUser传入的参数：userId="+userId);
        List<UserTemp> list=userTempService.selectAll(userId);
        map.put("result","success");
        map.put("list",list);
        return map;
    }

//    public static void main(String[] args) {
//        List<UserTemp> list=new ArrayList<UserTemp>();
//        UserTemp user1=new UserTemp();
//        user1.setAppId("1115555");
//        user1.setAppName("aaa");
//        list.add(user1);
//        UserTemp user2=new UserTemp();
//        user2.setAppId("112233");
//        user2.setAppName("bbb");
//        list.add(user2);
//        for(int i=0;i<list.size();i++){
//            System.out.println(list.get(i).getAppId());
//        }
//
//        List<String> list2=new ArrayList<>();
//        list2.add("aa");
//        list2.add("bb");
//        list2.add("cc");
//        for(int i=0;i<list2.size();i++){
//            System.out.println(list2.get(i));
//        }
//    }
}
