var templateId="";
function selectTemplte(id) {
    console.log(id);
    templateId=id;
    $("#getappName").show();
}


function sure() {
    var app=$("#appname").val().trim();
    if(app==""){
        alert("app名称不能为空")
    }else {

        $("#appname").val("");
        $("#getappName").hide();
        successTemp(app);
    }
}

function successTemp(app) {

}
