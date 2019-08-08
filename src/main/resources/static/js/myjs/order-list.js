
var pageData={};
init();

function init() {
    addAppId();
}



function selectproducter() {
    // var appId=$("#").text();
    var appId=$("#selectapp").val();
    pageData={
        "appId":appId
    }
    clean();
    selectinit();

}













// =============================================
/*产品-删除*/
function product_del(obj,appId,id){
    pageData={
        "phone":appId,
        "proid":id
    }
    layer.confirm('确认要删除吗？',function(index){
        $.ajax({
            type: 'POST',
            url: 'Order/deletepOrderInfo',
            data:pageData,
            dataType: 'json',
            success: function(data){
                $(obj).parents("tr").remove();
                layer.msg('已删除!',{icon:1,time:1000});
            },
            error:function(data) {
                console.log(data.msg);
            },
        });
    });
}

//
function fenye() {
    $('.table-sort').dataTable({
        "aaSorting": [[ 1, "desc" ]],//默认第几个排序
        "bStateSave": true,//状态保存
        "aoColumnDefs": [
            {"orderable":false,"aTargets":[0,7]}// 制定列不参与排序
        ]
    });
}
// ==================================
// 选择APP
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
                    $("#selectapp").append("<option value='"+list[i].appId+"'>"+list[i].appName+"</option>")
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
    // alert("");
}


function clean() {
    $("#htmltbody").html("");
}
// =========================================================================

function selectinit() {
    $.ajax({
        url : 'Order/selectOrderInfo',
        method : 'post',
        data : pageData,
        traditional: true,
        cache : false,
        dataType : 'json',
        success: function(result){//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var _html="";
                var list=result.list;
                for(var i in list){
                    // selectpro(JSON.stringify(list[i]));
                    $("#htmltbody").append("\t<tr class=\"text-c va-m\">\n" +
                        "\t\t\t\t\t\t<td><input name=\"\" type=\"checkbox\" value=\"\"></td>\n" +
                        "\t\t\t\t\t\t<td>"+list[i].orderId+"</td>\n" +
                        // "\t\t\t\t\t\t<td><img width=\"60\" class=\"product-thumb\" src='"+list[i].ext2+"'></td>\n" +
                        "\t\t\t\t\t\t<td class=\"text-l\"><a style=\"text-decoration:none\" onClick=\"product_show('哥本哈根橡木地板','product-show.html','10001')\" href=\"javascript:;\"></a><b class=\"text-success\">"+list[i].appId+"</b> </a></td>\n" +
                        "\t\t\t\t\t\t<td class=\"text-l\">"+list[i].orderName+"</td>\n" +
                        "\t\t\t\t\t\t<td><span class=\"price\">"+list[i].orderNum+"</span> 元</td>\n" +
                        "\t\t\t\t\t\t<td><span class=\"price\">"+list[i].oderPrice+"</span> /个</td>\n" +
                        "\t\t\t\t\t\t<td><span class=\"price\">"+list[i].orderType+"</span></td>\n" +
                        "\t\t\t\t\t\t<td><span class=\"price\">"+list[i].createTime+"</span></td>\n" +
                        "\t\t\t\t\t\t<td class='td-manage'>  <a style=\"text-decoration:none\" class=\"ml-5\" onClick='product_del(this,"+list[i].phone+","+list[i].id+")' href=\"javascript:;\" title=\"删除\"><i class=\"Hui-iconfont\">&#xe6e2;</i></a></td>\n" +
                        "\t\t\t\t\t</tr>");
                }
                fenye();
            }

        },
        error : function(response) {
            alert('失败');
        }
    });
}