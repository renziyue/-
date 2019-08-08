
// alert("xx");
function add(){


// $("#leixing").append("<li class='oneSet'><a href='productCenter.html@pgid=67782' target='_self'>布丁</a></li>");
}

// ===================================================================================
// 变量
var pageData = {};
// 页面初始化
initData();
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
// ===================================================================================



// 页面初始化
function initData() {
     var phone=$("#phone").val();
     var bianhao=$("#bianhao").val();
     var value=$("#value").val();
     pageData={
         "phone":phone,
         "bianhao":bianhao
         // "value":value
     }
     init();

    pageData={
        "phone":phone,
        // "bianhao":bianhao,
        "value":value
    }
    // init();
     selecttype();
     selectshowpro();
}


// 添加类型
function addtypeli(value) {
    // $("#typeul").append("<li class='oneSet' style='background: #2fa0ec' ><span onclick='seletTypeis("+value+")'>"+value+"</span></li>");
    $("#typeul").append("<li class=\"oneSet\" style=\"background: #2fa0ec\"><a href=\"#\" target=\"_self\" onclick=\"seletTypeis(\'"+value+"\')\">"+value+"</a></li>");
}


// 添加产品
function addprotest(id,proName,proType,proprice,proNum,proSrc,proext) {
    // console.log(id+"-----add");
    var xx={
        "id":id,
        "proName":proName,
        "proType":proType,
        "price":proprice,
        "proNum":proNum,
        "proext":proext,
        "proSrc":proSrc
    }
    // alert(id+"----xx");
    var phone=$("#phone").val();
    // alert(phone);
    var bianhao=$("#bianhao").val();
    $("#prod_Ulist").append("<li class='prod_Item modSet'>" +
        // "<button id='modif"+id+"' onclick='modifpro("+JSON.stringify(xx)+")'>修改</button><button id='delete"+id+"' onclick='delectshowpro("+id+")'>删除</button>"
       + "<div class='relative'>" +
        "<!-- 产品图片 -->\n" +
        "<div class='prodImg_box imgSet'>" +
        "<div class='prod_img'><a href='appBuy?phone="+phone+"&id="+id+"&bianhao="+bianhao+"' target='_self'><img id='img"+id+"' class='pro_img horizontal' src='"+proSrc+"' /><span></span></a></div>" +
        "<div class='dummy' style='margin-top:67%'></div>\n" +
        "</div>\n" +
        "<!-- 内容 -->\n" +
        "<div class='prod_info'>\n" +
        "<div class='p_line'>\n" +
        "</div>\n" +
        "<div class=\"p_name titleSet mobile\"><a href='appBuy?phone="+phone+"&id="+id+"&bianhao"+bianhao+"' target=\"_self\"><input type='text' id='text"+id+"' value='"+proName+"' class='producterinput' readonly='readonly'></a></div>\n" +
        "<div class=\"p_detail detailSet mobile\"></div>\n" +
        "<div class=\"p_line\">\n" +
        "<div class=\"p_group\">\n" +
        "<span class=\"p_lb sortSet\">类别：</span>\n" +
        "<span class=\"p_category sortSet\"><input type='text' id='type"+id+"' value='"+proType+"' class='producterinput' readonly='readonly'></span>\n" +
        "</div>\n" +
        "</div>\n" +
        "<!--购买按钮-->\n" +
        "</div>\n" +
        "</div>\n" +
        "</li>" )
}


// 分类显示
function seletTypeis(value) {
    phone=$("#phone").val(); //storeId
    bianhao=$("#bianhao").val();

    pageData={
        "phone":phone,
            // "bianhao":bianhao,
        "proType":value
    }
    $("#prod_Ulist").find("li").remove();
    selectshowpro();
}


// 添加产品
function diaoyongParenttext(){
    parent.showprotext();
}

// 修改产品
function modifpro(list) {
    // alert("xiugai");
    // alert(list.id+"---"+list.proName);
    parent.modiftext(list.id,list.proName,list.proType,list.price,list.proNum,list.proSrc,list.proext);
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
// =======================================================================
//编辑图片
function exitpic(id) {
    parent.play(id)
}
function dengdai(id) {
    var parInp=window.parent.document.getElementById('baocun');
    var xianzaisrc=parInp.src;
    $("#"+id).attr("src",xianzaisrc);

}

// ====================================================================
// 保存本页面
function updataData() {
    var url="";
    var urlsrc="";
    var urlsrcone="";
    var typeall="";
    var value="";
    var textPageData=new Array();
    for(var i=1 ;i<5;i++){
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


// ====================================================================

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
                $("#text"+id).val(proName);
                $("#type"+id).val(proType);
            }

        },
        error : function(response) {
            alert('失败');
        }
    });

}
function delectshowpro(id) {
    console.log(id+"----del");
    pageData={
        "proid":id,
        "phone":"112233"
    }
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

// ============================================================================

// 初始化本页信息
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




// 更新本页信息
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