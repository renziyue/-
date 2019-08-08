
init();
var pageData={};
// ======================================



function init() {
    addAppId();
}


function xx() {
    var _html="";
    _html+=" <tr class=\"text-c\" >\n" +
        "        <td><input type=\"checkbox\" value=\"1\" name=\"\"></td>\n" +
        "        <td>1</td>\n" +
        "        <td>男</td>\n" +
        "        <td>13000000000</td>\n" +
        "        <td>admin@mail.com</td>\n" +
        "      </tr>"
}
function fenye() {
    $('.table-sort').dataTable({
        "lengthMenu":false,//显示数量选择
        "bFilter": false,//过滤功能
        "bPaginate": false,//翻页信息
        "bInfo": false,//数量信息
        "aaSorting": [[ 1, "desc" ]],//默认第几个排序
        "bStateSave": true,//状态保存
        "aoColumnDefs": [
            //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
            {"orderable":false,"aTargets":[0,3,4]}// 制定列不参与排序
        ]
    });
}

function selectUser() {
    var appId=$("#selectApp").val();
    pageData={
        "appId":appId
    }
    selectinit();

}




// =====================================================
function addAppId() {
    $.ajax({
        url: 'userTemp/selectApp',
        method: 'post',
        data: {},
        traditional: true,
        cache: false,
        dataType: 'json',
        success: function (result) {//返回的参数就是 action里面所有的有get和set方法的参数
            if (result.result == "success") {
                var list = result.list;
                for (var i in list)
                    $("#selectApp").append("<option value='" + list[i].appId + "'>" + list[i].appName + "</option>")
            }

        },
        error: function (response) {
            alert('失败');
        }
    });
}

// ========================================================

function selectinit() {
    $.ajax({
        url : 'Customer/selectAll',
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
                    // alert(list[i].appId);
                    // selectpro(JSON.stringify(list[i]));
                    $("#htmlBody").append("\t<tr class=\"text-c va-m\">\n" +
                        "\t\t\t\t\t\t<td><input name=\"\" type=\"checkbox\" value=\"\"></td>\n" +
                        "\t\t\t\t\t\t<td>"+list[i].appId+"</td>\n" +
                        "\t\t\t\t\t\t<td>"+list[i].ext1+"</td>\n" +
                        // "\t\t\t\t\t\t<td class=\"text-l\"><a style=\"text-decoration:none\" onClick=\"product_show('哥本哈根橡木地板','product-show.html','10001')\" href=\"javascript:;\"></a><b class=\"text-success\">"+list[i].proName+"</b> </a></td>\n" +
                        "\t\t\t\t\t\t<td class=\"text-l\">"+list[i].customerPhone+"</td>\n" +
                        "\t\t\t\t\t\t<td><span class=\"price\">"+list[i].createTime+"</span></td>\n" +
                        // "\t\t\t\t\t\t<td class=\"td-status\"><span class=\"label label-success radius\">已发布</span></td>\n" +
                        // "\t\t\t\t\t\t<td class='td-manage'> <a style=\"text-decoration:none\" class=\"ml-5\" onClick=\"product_edit('产品编辑','product-add.html','10001')\" href=\"javascript:;\" title=\"编辑\"><i class=\"Hui-iconfont\">&#xe6df;</i></a> <a style=\"text-decoration:none\" class=\"ml-5\" onClick='product_del(this,"+list[i].phone+","+list[i].id+")' href=\"javascript:;\" title=\"删除\"><i class=\"Hui-iconfont\">&#xe6e2;</i></a></td>\n" +
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



