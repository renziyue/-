
/*-----------公共变量---start------------------------------*/
// var bianhao="";
// bianhao=request.bianhao;
// alert(bianhao);


$("#bianji").hide();
initdata();
hideBtn();
// selecthref();
// test();
var type="";
var pageData = {};
var str="";
var textPageData={};
var imgPageData=new Array();
// alert($("#shouye").val);
// var xx=$("#shouye").attr("id");
// alert(xx+"----------");
var ids="";
var values="";
var phone=$("#phone").val();
var bianhao=$("#bianhao").val();


// var value=$("#img16").attr("src");
// var href=$("#img16").attr("href");
// alert(value+"---------------"+href);

/*-------------公共变量---end-------------------------------*/

/*-------------公共变量---end-------------------------------*/
function hideBtn() {
    $("#baocunwenjian").hide();
    $("#testFather").hide();
}
function childToP(){
    // 下面两种操作父页面方法的方式一样
    // window.parent.childToParent();
    parent.play();
    var parInp = window.parent.document.getElementById('input1');
    parInp.value='通过子页面js赋值'; }

// 编辑产品
function diaoyongParenttext(){
    parent.showprotext();
}

// 编辑图片
function exitpic(id) {
    parent.play(id)
}
function dengdai(id) {
    var parInp=window.parent.document.getElementById('baocun');
    var xianzaisrc=parInp.src;
    // console.log(xianzaisrc);
    $("#"+id).attr("src",xianzaisrc);

}

// 添加商品
function savepro() {
    var parInp=window.parent.document.getElementById('baocun');
    var proSrc=parInp.src;
    var parInp1=window.parent.document.getElementById('proName');
    var proName=parInp1.value;
    var parInp1=window.parent.document.getElementById('proType');
    var proType=parInp1.value;
    var parInp1=window.parent.document.getElementById('proNum');
    var proNum=parInp1.value;
    var parInp1=window.parent.document.getElementById('proprice');
    var proprice=parInp1.value;
    var parInp1=window.parent.document.getElementById('proext');
    var proext=parInp1.value;

    var phone=$("#phone").val();
    var bianhao=$("#bianhao").val();
    pageData={
        "proName":proName,
        "proType":proType,
        "price":proprice,
        "proNum":proNum,
        "proext":proext,
        "proSrc":proSrc,
        "bianhao":bianhao,
        "phone":phone
    }

    addShowPro(proName,proType,proprice,proNum,proSrc,proext);
    // alert(proNum+proprice);


}

// 更新商品
function updatepro() {
    var parInp=window.parent.document.getElementById('baocun');
    var proSrc=parInp.src;
    var parInp1=window.parent.document.getElementById('proName');
    var proName=parInp1.value;
    var parInp1=window.parent.document.getElementById('proType');
    var proType=parInp1.value;
    var parInp1=window.parent.document.getElementById('proNum');
    var proNum=parInp1.value;
    var parInp1=window.parent.document.getElementById('proprice');
    var proprice=parInp1.value;
    var parInp1=window.parent.document.getElementById('proext');
    var proext=parInp1.value;
    var parInp1=window.parent.document.getElementById('proid');
    var proid=parInp1.value;

    var phone=$("#phone").val();
    var bianhao=$("#bianhao").val();
    pageData={
        "proid":proid,
        "proName":proName,
        "proType":proType,
        "price":proprice,
        "proNum":proNum,
        "proext":proext,
        "proSrc":proSrc,
        "bianhao":bianhao,
        "phone":phone
    }

    updateshowpro(proid,proName,proType,proprice,proNum,proSrc,proext);
    // alert(proNum+proprice);


}

function test1() {

    // window.location.href="buy?bianhao=123&phone=456";
    // window.event.returnValue=false;

}





// function addpro() {
//     $("#boxNewsList").append("\t<li class=\"sumary_list modSet\">\n" +
//         "\t\t\t\t\t\t\t\t<div class=\"newPic imgSet\">\n" +
//         "\t\t\t\t\t\t\t\t\t<a href=\"newsDetail.html@newsid=49133\" target=\"_self\" id=\"img17\" >\n" +
//         "\t\t\t\t\t\t\t\t\t\t<img class=\"News_img\" src=\"img/tianpin/img/hh.png\" id=\"img17\" isUrl=\"yes\"></a>\n" +
//         "\t\t\t\t\t\t\t\t\t<div class=\"zTm\" style=\"margin-top:75%\"></div>\n" +
//         "\t\t\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t\t\t<div class=\"newCont\">\n" +
//         "\t\t\t\t\t\t\t\t\t<div class=\"newTitle\">\n" +
//         "\n" +
//         "\t\t\t\t\t\t\t\t\t\t<div class=\"newDetail detailSet mobile\">\n" +
//         "\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\"   id=+text34+\" value=\"描述\" style=\"background:transparent;border:0 solid #ffffff\"/>\n" +
//         "\n" +
//         "\t\t\t\t\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t\t\t\t<div class=\"newB\">\n" +
//         "\t\t\t\t\t\t\t\t\t\t<span class=\"newSort sortSet\">\n" +
//         "\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\"   id=\"text35\" value=\"描述\" style=\"background:transparent;border:1px solid #ffffff\"/>\n" +
//         "\n" +
//         "\t\t\t\t\t\t\t\t\t\t</span>\n" +
//         "\t\t\t\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t\t\t\t<div class=\"show_all\">\n" +
//         "\t\t\t\t\t\t\t\t\t\t<a class=\"btnaSet\" href=\"newsDetail.html@newsid=49133\" target=\"_self\" id=\"text36\">\n" +
//         "\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\"   isUrl=\"yes\" id=\"text36\" value=\"去购买\" style=\"background:transparent;border:0 solid #ffffff\"/>\n" +
//         "\n" +
//         "\t\t\t\t\t\t\t\t\t\t</a>\n" +
//         "\t\t\t\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t\t</li>")
//
// }
// function addtypeli1() {
//     $("#typeli").append("\t<li class=\"oneSet\">\n" +
//         "\t\t\t\t\t\t\t\t<a href=\"#\" target=\"_self\" id=\"hreftext13\">\n" +
//         "\t\t\t\t\t\t\t\t<input type=\"text\" isUrl=\"1\"  value=\"布丁\" style=\"background:transparent;border: 0 solid #ffffff\"/>\n" +
//         "\t\t\t\t\t\t\t\t</a></li>\n");
//
// }
function addtypeli(value) {
    var bianhao=$("#bianhao").val();
    console.log(bianhao);
    $("#typeul").append("<li class='oneSet' id='typeli'>"
    +"<a href='/bianjiPage?page=产品页&bianhao="+bianhao+"' target='_self' id='href'>"
        +"<input type='text'  value='"+value+"' style='background:transparent;border: 0 solid #ffffff' readonly='readonly'/>"
        +"</a></li>");

}

function addprotest(id,proName,proType,proprice,proNum,proSrc,proext) {
    var xx={
        "id":id,
        "proName":proName,
        "proType":proType,
        "price":proprice,
        "proNum":proNum,
        "proext":proext,
        "proSrc":proSrc
    }
    $("#boxNewsList").append(" <li class='sumary_list modSet' id='li"+id+"' > <button id='modif"+id+"' onclick='modifpro("+JSON.stringify(xx)+")'>修改</button><button id='delete"+id+"' onclick='shanchupro("+id+")'>删除</button><div class='newPic imgSet'>"
        + "<a href='buyone?phone="+phone+"&id="+id+"&bianhao="+bianhao+"' target='_self'><img id='img"+id+"' class='News_img' src='"+proSrc+"' ></a> <div class='zTm' style='margin-top:75%'></div> </div>"

        +"<div class='newCont'> <div class='newTitle'> <div class='newName'>"

        // +" <a class='titleSet' href='newsDetail.html@newsid=49129' target='_self' >"
        +"<span>售价：</span>"
        +"<input type='text' readonly='readonly' value='"+proprice+"' id='price"+id+"' style='background:transparent;border:0 solid #ffffff;font-max-size: '>"
        // + "</a> "
        + "</div>"
        +"<div class='newB'> "

        +" <div class='show_all'> "
        + "<a class='btnaSet' href='buyone?phone="+phone+"&id="+id+"&bianhao="+bianhao+"' target='_self'>去购买</a>"
        +"<input type='text' style='border:0px;background:rgba(0, 0, 0, 0);' readonly='readonly'>"
      +"  </div> </div> </li>"
       // +"<button>修改</button>"
       // +"<button>删除</button>"
    )
}




function modifpro(list) {
    // alert("xiugai");
    // alert(list.id+"---"+list.proName);
    parent.modiftext(list.id,list.proName,list.proType,list.price,list.proNum,list.proSrc,list.proext);
}

function shanchupro(id) {
    var phone=$("#phone").val();
    var bianhao=$("#bianhao").val();
    pageData={
        "proid":id,
        "phone":phone,
        "bianhao":bianhao
    }
    delectshowpro();
    $("#li"+id).hide();
}

//
// function qudeid() {
//
//     // type=$("#"+id)[0].tagName;
//     // var type2=$("#"+id).attr("type");
//     // // alert(type2);
//     // if(type=="IMG"){
//     //
//     // }
//     // if(type2=="text"){
//     //     var value=$("#"+id).val();
//     //    textPageData.push[{"id":id,"value":value}];
//     //
//     // }
//
//
// }


function updataData() {
    var url="";
    var urlsrc="";
    var urlsrcone="";
    var typeall="";
    var value="";
    var textPageData=new Array();
    for(var i=1 ;i<24;i++){
        var id="text"+i;
        type=$("#"+id)[0].tagName;
        var type2=$("#"+id).attr("type");
        if(type=="IMG"){
            urlsrcone=$("#"+id).attr("src");
            var isUrl="0";
            value="#";

        }
        if(type2=="text"){
             value=$("#"+id).val();
            var isUrl=$("#"+id).attr("isUrl");
             // style=$("#"+id).attr("style");
            // var isUrl="0";
            // urlsrcone="#";
            type="text";

            // alert(isUrl);
            if(isUrl=='1'){
                value="****";
                alert($("#href"+id).attr("href"));
                urlsrcone=$("#href"+id).attr("href");
            }
            else {
                isUrl="0";
                urlsrcone="#";
            }
        }

        // alert(id+value);
        ids+=id+"@";
        values+=value+"@";
         url+=isUrl+"@";
         urlsrc+=urlsrcone+"@";
         typeall+=type+"@";


    }
    var phone=$("#phone").val();
    var bianhao=$("#bianhao").val();
    console.log(bianhao);
    // alert(ids);
    pageData={
            "ids":ids,
            "values":values,
            "phone":phone,
            "type":typeall,
            "bianhao":bianhao,
            "isUrl":url,
            "urlSrc":urlsrc
    }
    update();

}

function xx(id) {
    $("#bianji").show();
    // type=$("#"+id)[0].tagName;
    // type=$("#"+id).attr("type");

    // type=type;
    alert(type);
    $("#pic").show();
    $("#lianjie").show();
    if(type=="IMG"){
        $("#upload").show();
        $("#neirong").hide();
    }
    else{
        $("#upload").hide();
        $("#neirong").show();
    }
    // if($("#"+id).attr("isUrl")!="yes"){
    //     $("#bianji").val($("#"+id).val);
    //     // alert("xxx");
    //     $("#lianjie").hide();
    //     $("#pic").hide();
    //     $("#upload").hide();
    // }else {
    //
    //
    // }
}

function initdata() {
    // hideBtn();
    var phone=$("#phone").val();
    var bianhao=$("#bianhao").val();
    console.log("tianpin--"+bianhao);
    pageData={
        "phone":phone,
        "bianhao":bianhao
    }
    init();
    selectshowpro();
    selecttype();
}


// function savemessage() {
//         var uploadname=$("#uploadname").val;
//         // var isUrl=$("#islianjie").val;
//         // var bianji=$("#bjvalue").val;
//         var neirong=$("#neirong").val;
//         var phone=$("#phone").val;
//         var bianhao=$("#bianhao").val;
//         pageData={
//             "phone":phone,
//             "bianhao":bianhao,
//             "uploadname":uploadname,
//             // "isUrl":isUrl,
//             // "bianji":bianji,
//             "neirong":neirong
//         }
//     // insert();
//
// }


function clearandhide() {
    $("#uploadname").val("");
    // $("#islianjie").val("");
    $("#neirong").val("");

}


/*-------------公共变量---end-------------------------------*/

function init() {
    $.ajax({
        url : 'TianPinText/selectAll',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
               var list=result.list;
               // count=list.length();
               // alert(/count);
               for(var i in list){
                   if(list[i].type=="text"){
                       $("#"+list[i].id).val(list[i].value);
                       if(list[i].style != ""){
                           $("#"+list[i].id).attr("style",list[i].style);
                       }
                   }else {
                       $("#"+list[i].id).attr("src",list[i].urlSrc);
                   }

                   // if(list[i])
               }
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}



function update() {
$.ajax({
    url : 'TianPinText/updateTianPin',
    method : 'post',
    data : pageData,
    traditional: true,
    cache : false,
    dataType : 'json',
    success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
        if (result.result == "success") {
            alert("保存成功");
        }

    },
    error : function(response) {
        alert('失败');
    }
});

}

// =====================================================
//
// function upload() {
//     var formData = new FormData();
//     formData.append("file", $("#upfile")[0].files[0]);
//     $.ajax({
//         url: 'addUserInfo',
//         method: 'post',
//         data: formData,
//         contentType: false,
//         processData: false,
//         success: function (result) {//返回的参数就是 action里面所有的有get和set方法的参数
//             // window.location.href="result";
//            $("#upload16").attr("src",result);
//         },
//         error: function (response) {
//             alert('失败');
//         }
//     });
// }

// ==============================================================

//初始化商品

function selectshowpro() {
    $.ajax({
        url : 'Producte/selectprodocte',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var list=result.list;
                for(var i in list){
                 addprotest(list[i].id,list[i].proName,list[i].proType,list[i].price,list[i].count,list[i].ext2,list[i].ext1);
                }
            }

        },
        error : function(response) {
            alert('失败');
        }
    });

}

function updateshowpro(id,proName,proType,proprice,proNum,proSrc,proext) {
    $.ajax({
        url : 'Producte/updateprodocte',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                alert("修改成功!");
                $("#img"+id).attr("src",proSrc);
                $("#price"+id).val(proprice);
            }

        },
        error : function(response) {
            alert('失败');
        }
    });

}
function delectshowpro() {
    $.ajax({
        url : 'Producte/deleteprodocte',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
       alert("删除成功！");
            }

        },
        error : function(response) {
            alert('失败');
        }
    });

}

// ==========================================================================================


function addShowPro(proName,proType,proprice,proNum,proSrc,proext) {
    $.ajax({
        url : 'Producte/addprodocte',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                alert("添加成功");
                var id=result.id;
                // console.log(id);
                addprotest(id,proName,proType,proprice,proNum,proSrc,proext);
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}


// ==========================================================================================

// 查询类型

function selecttype() {
    $.ajax({
        url : 'Producte/selectproType',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var list=result.list;
                // alert("添加成功");
                for( var i  in list){
                    addtypeli(list[i]);
                }
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}