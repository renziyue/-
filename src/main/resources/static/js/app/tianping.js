
/*-----------公共变量---start------------------------------*/



$("#bianji").hide();
initdata();
// selecthref();
// test();
var type="";
var pageData = {};
var str="";
var textPageData={};
var imgPageData=new Array();

var ids="";
var values="";
var phone=$("#phone").val();
var bianhao=$("#bianhao").val();




/*-------------公共变量---end-------------------------------*/
$(".sss").attr("readonly","readonly");

// function test1() {
//
//     window.location.href="appBuy?bianhao=123&phone=456&proId";
//     window.event.returnValue=false
//
// }






function addtypeli(value) {
    var bianhao=$("#bianhao").val();
    $("#typeul").append("<li class='oneSet' id='typeli'>"
    +"<a href='/appCommPage?page=产品页&bianhao"+bianhao+"' target='_self' id='href'>"
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
    $("#boxNewsList").append(" <li class='sumary_list modSet' id='li"+id+"' > <div class='newPic imgSet'>"
        + "<a href='appBuy?phone="+phone+"&id="+id+"&bianhao="+bianhao+"' target='_self'><img id='img"+id+"' class='News_img' src='"+proSrc+"' ></a> <div class='zTm' style='margin-top:75%'></div> </div>"

        +"<div class='newCont'> <div class='newTitle'> <div class='newName'>"

        // +" <a class='titleSet' href='newsDetail.html@newsid=49129' target='_self' >"
        +"<span>售价：</span>"
        +"<input type='text' readonly='readonly' value='"+proprice+"' id='price"+id+"' style='background:transparent;border:0 solid #ffffff;font-max-size: '>"
        // + "</a> "
        + "</div>"
        +"<div class='newB'> "

        +" <div class='show_all'> "
        + "<a class='btnaSet' href='appBuy?phone="+phone+"&id="+id+"&bianhao="+bianhao+"' target='_self'>去购买</a>"
        +"<input type='text' style='border:0px;background:rgba(0, 0, 0, 0);' readonly='readonly'>"
      +"  </div> </div> </li>"
       // +"<button>修改</button>"
       // +"<button>删除</button>"
    )
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
    var phone=$("#phone").val();
    var bianhao=$("#bianhao").val();
    pageData={
        "phone":phone,
        "bianhao":bianhao
    }
    init();
    selectshowpro();
    selecttype();
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

// function updateshowpro(id,proName,proType,proprice,proNum,proSrc,proext) {
//     $.ajax({
//         url : 'Producte/updateprodocte',
//         method : 'post',
//         data : pageData,
//         traditional: true,
//         cache : false,
//         dataType : 'json',
//         success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
//             if (result.result == "success") {
//                 alert("修改成功!");
//                 $("#img"+id).attr("src",proSrc);
//                 $("#price"+id).val(proprice);
//             }
//
//         },
//         error : function(response) {
//             alert('失败');
//         }
//     });
//
// }
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

//
// function addShowPro(proName,proType,proprice,proNum,proSrc,proext) {
//     $.ajax({
//         url : 'Producte/addprodocte',
//         method : 'post',
//         data : pageData,
//         traditional: true,
//         cache : false,
//         dataType : 'json',
//         success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
//             if (result.result == "success") {
//                 alert("添加成功");
//                 var id=result.id;
//                 // console.log(id);
//                 addprotest(id,proName,proType,proprice,proNum,proSrc,proext);
//             }
//
//         },
//         error : function(response) {
//             alert('失败');
//         }
//     });
// }


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