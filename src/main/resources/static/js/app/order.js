
init();

// function addproducter(id,name,price) {
//     $("#producterlist").append("<li >\n" +
//         "<div style=\"padding-top: 50px\">\n" +
//         "\t\t\t\t\t\t<div>\n" +
//         "\t\t\t\t\t\t\t<span>订单编号：</span>\n" +
//         "\t\t\t\t\t\t\t<label>"+id+"</label>\n" +
//         "\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t<div>\n" +
//         "\t\t\t\t\t\t\t<label>"+name+"</label>\n" +
//         "\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t<div>\n" +
//         "\t\t\t\t\t\t\t<img src=\"img/tianpin/img/hh.png\" >\n" +
//         "\t\t\t\t\t\t\t<span>售价：</span>\n" +
//         "\t\t\t\t\t\t\t<span>"+price+"</span>\n" +
//         "\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t\t<div style=\"padding-right: 50px\">\n" +
//         "\t\t\t\t\t\t\t<button onclick='addproducter()'>再来一单</button>\n" +
//         "\t\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t</div>\n" +
//         "\t\t\t\t\t<div>\n" +
//         "\n" +
//         "\t\t\t\t\t</div>\n" +
//         "\t\t\t\t</li>\n" +
//         "\t\t\t\t<li>")
// }


function init() {

    $.ajax({
        url : 'Order/selectOrderInfo',
        method : 'post',
        data : {},
        traditional: false,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                // alert("购买成功,返回首页");
                var  list=result.list
                var _html="";
             for(var i in list){
                _html+=("<li >\n" +
                     "<div style=\"padding-top: 50px\">\n" +
                     "\t\t\t\t\t\t<div>\n" +
                     "\t\t\t\t\t\t\t<span>订单编号：</span>\n" +
                     "\t\t\t\t\t\t\t<label>"+list[i].orderId+"</label>\n" +
                     "\t\t\t\t\t\t</div>\n" +
                     "\t\t\t\t\t\t<div>\n" +
                     "\t\t\t\t\t\t\t<label>"+list[i].orderName+"</label>\n" +
                     "\t\t\t\t\t\t</div>\n" +
                     "\t\t\t\t\t\t<div>\n" +
                     "\t\t\t\t\t\t\t<img src=\"img/tianpin/img/hh.png\" >\n" +
                     "\t\t\t\t\t\t\t<span>售价：</span>\n" +
                     "\t\t\t\t\t\t\t<span>"+list[i].oderPrice+"</span>\n" +
                     "\t\t\t\t\t\t</div>\n" +
                     "\t\t\t\t\t\t<div style=\"padding-right: 50px\">\n" +
                     "\t\t\t\t\t\t\t<button onclick='addproducter()'>再来一单</button>\n" +
                     "\t\t\t\t\t\t</div>\n" +
                     "\t\t\t\t\t</div>\n" +
                     "\t\t\t\t\t<div>\n" +
                     "\n" +
                     "\t\t\t\t\t</div>\n" +
                     "\t\t\t\t</li>\n" +
                     "\t\t\t\t<li>")
                 $("#producterlist").append(_html);
             }

            }else {
                // alert("购买失败");
                $("#producterlist").append("您暂无购买商品")
            }

        },
        error : function(response) {
            alert(response.errorMessage);
            // window.location.href="/login";
        }
    });
}