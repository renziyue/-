

var pageData={};



function getdata() {
    var id=$("#proid").val();
    pageData={
        "id":id
    }
}

function buyPro() {
    var orderName=$("#lx").val();
    var orderPrice=$("#price").val();
    var orderNum=$("#kc").val();
    var orderType=$("#fl").val();
    var orderExt1=$("#qt").val();
    var pageData={
        "orderName":orderName,
        "orderPrice":orderPrice,
        "orderNum":orderNum,
        "orderType":orderType,
        "orderExt1":orderExt1,
    }
    $.ajax({
        url : 'Order/addOrderInfo',
        method : 'post',
        data : pageData,
        traditional: false,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "sucess") {
                alert("购买成功！\n购买信息"+result.address+"\n返回首页");
                // setTimeout("",5000);
                window.location.href="/openPageHome?appId="+result.appId+"&bianhao="+result.bianhao;
                // window.event.returnValue=false;
            }else {
                alert("购买失败");
            }

        },
        error : function(response) {
            alert(response.errorMessage);
            // window.location.href="/login";
        }
    });

}


function addCar() {
    alert("加入购物车成功");

}
