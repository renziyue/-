var pageData={};

init();
function init() {
    $.ajax({
        url : 'Customer/selectHomePage',
        method : 'post',
        data : {},
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var _html="";
                var list=result.list;
                for(var i in list){

                    _html+="<tr class=\"text-c\">\n"
                        + "<td>"+list[i].appName+"</td>\n" +
                        "<td>"+list[i].customerNum+"</td>\n" +
                        "<td>"+list[i].orderNum+"</td>"
                    + "<td>"+list[i].priceNum+"</td>\n" ;
                }
                _html+="<tr class=\"text-c\">" +
                    "\t\t\t\t<td>总数</td>\n" +
                    "\t\t\t\t<td>"+result.userCount+"</td>\n" +
                    "\t\t\t\t<td>"+result.orderCount+"</td>\n" +
                    "\t\t\t\t<td>"+result.moneyCount+"</td>\n" +
                    "\t\t\t</tr>";

                $("#userInfo").append(_html);
                // fenye();
            }

        },
        error : function(response) {
            alert("暂无已上线的应用程序");
        }
    });
}