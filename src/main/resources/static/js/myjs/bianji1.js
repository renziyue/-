// // $("#").attr("click")『
// $("#textys").bind('click', showMsg, false); //鼠标单击的时候调用showMes这个函数
// function showMsg() {
//     alert("事件监听");
// }

// alert("xx");

// $('#textys').bind('input propertychange', function() {
//     alert("事件监听");
// });

//绑定单击事件
$("#textyid").bind('click', function () {
   $("#bianjidiv").show();
   var xx=$("#textyid").attr("id");
   alert(xx);
});


function tiaozhuan(ww) {
   window.location.href="test.html";
   alert(ww);

}


var xx=$("#textyid").val();
alert("test"+"----"+xx);
$("#textyid").val("bbbb");
//
// var xx=$("#wohis").children.length;
// // var xxx=document.getElementById("wohis").getElementsByTagName("div");
// // var xxx=document.getElementById("wohis").childNodes;
// var xxx=document.getElementById("bianjiwenben").firstElementChild;
// alert(xxx);



// var i,len;
// var element=document.getElementById("wohis");
// var child=element.firstChild;
// i=0;
// len=element.length;
// while (i<len){
//    if(child.nodeType===1){
//       processC
//    }
// }