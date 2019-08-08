

function showError(id,text){
    $(id).show();
    $(id).text(text);
}
function clearError(id){
    $(id).hide();
}

$(document).keypress(function(e){
    if(e.keyCode==13){
        login();
    }
});



function login(){

    var loginName = $("#userName").val();
    var password = $("#passwd").val();
    var verifyCode = $("#verifyCode").val();

    //检查账号
    if (loginName == "") {
        showError("#erruser","登录名不能为空!");
        return false;
    }else{
        clearError("#erruser");
    }
    //检查密码
    if (password == "") {
        showError("#errpwd","密码不能为空!");
        return false;
    }else{
        clearError("#errpwd");
    }
    //检查验证码
    if (verifyCode == "") {
        showError("#errvacode","验证码不能为空!");
        return false;
    }else{
        clearError("#errvacode");
    }


    $.ajax({
        url : 'loginController/login.action',
        method : 'post',
        data : {
            "loginName":loginName,
            "password":password,
            "verifyCode":verifyCode
        },
        dataType : 'json',
        success: function(result){

            if (result.result == "success") {
                clearError("#erruser");
                clearError("#errpwd");
                clearError("#errvacode");
                // window.location.href = indexHref + "/template/index.jsp";
            }else{
                var str = result.errorMsg;
                if (str.indexOf("用户") >= 0) {
                    showError("#erruser",result.errorMsg);
                }else if (str.indexOf("密码") >= 0) {
                    showError("#errpwd",result.errorMsg);
                }else {
                    showError("#errvacode",result.errorMsg);
                }
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}


function logout(){
    $.ajax({
        url : 'loginController/logout.action',
        method : 'post',
        data : {},
        dataType : 'json',
        success: function(result){

            if (result.result == "success") {

                window.location.href = indexHref + "/template/login.jsp";
            }else{
                alert(result.errorMsg);
            }

        },
        error : function(response) {
            window.location.href = indexHref + "/template/login.jsp";
        }
    });
}

function changeImg(){
    var url = $("#imgObj").prop('src');
    if(url != undefined){
        url = url.substr(0,url.lastIndexOf('code/')+5);
        url = url + (new Date()).valueOf() + ".action";
        $("#imgObj").prop('src',url);
    }
}

function resetform(){
    $("#userName").val("");
    $("#passwd").val("");
    $("#verifyCode").val("");
}

$(function() {
    //changeImg();
});