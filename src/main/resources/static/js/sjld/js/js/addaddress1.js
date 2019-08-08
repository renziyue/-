
// ==============================================================================
// 变量
var pageData={};
init();

// ===============================================================================
function getaddress() {
    // alert("xx");
    var x=$(".s").text()+$(".c").text()+$(".q").text()+$("#xiangxi").val();
    var name=$("#sjrname").val();
    var telPhone=$("#sjrphone").val();
    $("#addressText").val("收件人姓名："+name+"\r\n"+"收件人电话："+telPhone
    +"\r\n"+"收件人地址："+x);
}
//初始化
function init() {
    pageData={
    }
    selectaddress();
}

// 更改默认地址
function defaddaddress(addressId) {
    pageData={
        "isDef":"1",
        "addressId":addressId
    }
    updateDef();

}

function setaddress(isdef) {
    var name=$("#sjrname").val();
    var phone=$("#sjrphone").val();
    var address=$(".s").text()+$(".c").text()+$(".q").text()+$("#xiangxi").val();
    pageData={
        "isDef":isdef,
        "address":address,
        "phone":phone,
        "name":name,
        "page":address
    }
    addaddress();

}

// 清除li内容
 function clearli() {
     $("#addresslist").find("li").remove();
 }


 function gotoaddress() {
     window.location.href="/testcity";
     window.event.returnValue=false
 }


 function deleteaddress(id) {
     pageData={
         "addressId":id
     }
     ajaxdeleteAddrss();
 }
// =========================================================================
function selectaddress() {
    $.ajax({
        url : 'address/selectAllAddress',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
             var  list=result.list;
              for(var i in list){
                var addresslists="<li>"
                    + " <div  style=\"background-color: #f9f9f9\">\n" +
                    "  <label>"+list[i].address+"</label>\n"
                    +"<input type=\"button\" onclick='deleteaddress("+list[i].addressId+")' value=\"删除\" style=\"vertical-align: middle;background-color: #f9f9f9;padding-left: 20%" +
                      "\"  + </div>" ;
                  if(list[i].isDef=="0"){
                      addresslists+="<input type='button' value='设为默认地址' onclick='defaddaddress("+list[i].addressId+")'>"
                  }
                    addresslists+="</li>";
                    $("#addresslist").append(addresslists);
              }
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}
function addaddress() {
    $.ajax({
        url : 'address/addAddress',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                alert("添加成功");
                window.location.href="/gotoadress"
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}


function updateDef() {
    $.ajax({
        url : 'address/updateDef',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                clearli();
               init();
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}



function ajaxdeleteAddrss() {
    $.ajax({
        url : 'address/deleteAddress',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                clearli();
                init();
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}
