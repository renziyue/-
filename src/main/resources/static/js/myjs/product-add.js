
var proData = {};
addAppId();

function saveProduce() {
    var proName=$("#proname").val();
    var proprice=$("#proprice").val();
    var proNum=$("#pronum").val();
    var proType=$("#protype").val();
    var phone =$("#selectApp").val();
    var proext =$("#proext1").val();
    proData={
        "proName":proName,
        "proType":proType,
        "price":proprice,
        "proNum":proNum,
        "proext":proext,
        // "proSrc":proSrc,
        "bianhao":"bianhao2",
        "phone":phone
    }
    addPro();
}


// ======================================================
// 添加商品


function addPro() {
    $.ajax({
        url : '/teshuaddPro',
        method : 'post',
        data : proData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                alert("添加成功");
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
        alert("");
}


function addAppId() {
    $.ajax({
        url : 'userTemp/selectApp',
        method : 'post',
        data : {},
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var list=result.list;
                for(var i in list)
                $("#selectApp").append("<option value='"+list[i].appId+"'>"+list[i].appName+"</option>")
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
    // alert("");
}