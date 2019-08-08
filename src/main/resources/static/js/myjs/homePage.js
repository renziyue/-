

init();
function init() {
    var xx=$("#userName").val();
    console.log(xx);
    if(xx!=""){
        $("#userlogin").hide();
        $("#user").show();
    }else {
        $("#userlogin").show();
        $("#user").show();
    }
    $("#frame1").hide();
    $("#homeImg").show();
}
function openTemplate() {
    $("#frame1").show();
    $("#homeImg").hide();
    $("#frame1").attr("src","/template");

}

function gotoHouTai() {
    window.location.href="/houtaihome";
    window.event.returnValue=false;
}

function gotoGRZX() {
    window.location.href="/myapp";
    window.event.returnValue=false;
}

function openTemplatePage(app,templateId) {
    console.log(app+"================="+templateId);
    window.location.href="/selectTemplateHome?appName="+app+"&templateId="+templateId;
    window.event.returnValue=false;
}
