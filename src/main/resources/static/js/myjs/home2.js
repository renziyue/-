
// =======================================================================
// 变量
var idval="";
var pageData={};
var phone="";
var bianhao="";
// ========================================================================

// 方法
// $(function(){ $("#btn").click(function(){
//     var id=$(this).attr(id);
//     console.log(id);
//     // 获取子页面窗口对象
//     // var childjq = $("#frame1").contents();
//     // // 获取子页面标签对象
//     // var inp1val = childjq.find("#baocunwenjian");
//     var childWin = document.getElementById('frame1').contentWindow;
//     // // 调用子页面对象
//     childWin.updataData();
//
//     // 为子标签属性赋值
//     // alert(inp1val);
//     // inp1val.val('jquery修改子页面inp1的值')
// });
// });


// $(function(){ $("#btn1").click(function(){
//     // 获取子页面窗口对象
//   $("#frame1").attr("src","/regist");
// });
// });

init();

function init() {
    BindHomePage();
    selectPage();
}

function saveFarem1(bianhao) {
    var childWin = document.getElementById('frame1').contentWindow;
    // 调用子页面对象
    childWin.updataData();
    $("#frame1").attr("src","/selectPage?pageId="+bianhao);
}
// 编辑图片
function play(id) {
    $("#showbianji").show();
    $("#probianji").hide();
    $("#updatepro").hide();
    $("#modifpro").hide();
    $("#modifsrc").show();
    idval=id;

}
function ccc() {
    var bianhao1=$("#bianhao1").val();
    $("#frame1").attr("src","/home?bianhao="+bianhao1);
    console.log(bianhao1);
}

function BindHomePage() {
    var bianhao1=$("#bianhao1").attr("value");
    $("#frame1").attr("src","/home?bianhao="+bianhao1);


}
function fabu() {
    alert("请点击下载：http://62.234.72.98/rzy/ok.apk");
}
// function xishi() {
//     $("#baocun").attr("src","img/tianpin/img/hh.png")
// }

//清空编辑框
function clearPage() {
    $("#proName").val("");
    $("#proType").val("");
    $("#proNum").val("");
    $("#proprice").val("");
    $("#proext").val("");
    $("#baocun").attr("src","");
}

function bindimg() {
    var childWin = document.getElementById('frame1').contentWindow;
    // 调用子页面对象
    childWin.dengdai(idval);
    $("#showbianji").hide();
}


function bindpro() {
    var childWin = document.getElementById('frame1').contentWindow;
    // 调用子页面对象
    childWin.savepro();
    clearPage();
    $("#showbianji").hide();
}

function modiftext(id,proName,proType,proprice,proNum,proSrc,proext) {

    $("#proid").val(id);
    // alert($("#proid").val());
    $("#proName").val(proName);
    $("#proType").val(proType);
    $("#proNum").val(proNum);
    $("#proprice").val(proprice);
    $("#proext").val(proext);
    $("#baocun").attr("src",proSrc);
    $("#showbianji").show();
    $("#modifpro").hide();
    $("#updatepro").show();
    $("#modifsrc").hide();
    
}


function modifproduce() {
    var childWin = document.getElementById('frame1').contentWindow;
    // 调用子页面对象
    childWin.updatepro();
    clearPage();
    $("#showbianji").hide();
}

function quxao() {
    clearPage();
    $("#showbianji").hide();
}

function showprotext() {

    $("#showbianji").show();
    $("#probianji").show();
    $("#modifpro").show();
    $("#modifsrc").hide();
    $("#updatepro").hide();
}


// -=======================================================================

// ajax请求 上传图片
function upload() {
    var formData=new FormData();
    formData.append("file",$("#upfile")[0].files[0]);
    $.ajax({
        url : 'uploadFile',
        method : 'post',
        data :formData,
        contentType:false,
        processData:false,
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            // window.location.href="result";
            $("#baocun").attr("src",result);
        },
        error : function(response) {
            alert('失败');
        }
    });
}


// =========================================================================

function selectPage() {
    $.ajax({
        url : 'Template/selectTemplate',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var _html="";
                var  list=result.list;
                for(var i in list){
                    console.log(list[i].pageName);
                    _html+="   <li class=\"fkw-li-site\" >\n" +
                        // "                        <a target=\"_blank\" href='saveFarem1(\"+list[i].ext1+\")'>\n" +
                        "                            <span class=\"fkw-nav-icon\"></span>\n" +
                        "                            <div class='fkw-nav-box' style='padding-left: 5px;width: 107px;left: 35px' >\n" +
                        "                                <button id='"+list[i].ext1+"' onclick=\"saveFarem1('"+list[i].ext1+"')\" style='background-color: #c7fffd;width: 75px;height: 50px;'>"+list[i].pageName+"</button>\n" +
                        "                              <!--<div class=\"fkw-nav-box-detail-zz\"></div>&lt;!&ndash;详情遮罩&ndash;&gt;-->\n" +
                        "                            </div>\n" +
                        // "                        </a>\n" +
                        "                    </li>";
                }
                $("#selectPage").append(_html);
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}