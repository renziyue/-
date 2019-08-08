function xx() {
    var vm = new Vue({
        el:'#limian',
        // el: $('#waimian'),
        data:{
            msg_text:'xxxxxx',
            msg_text1:'',
            html:'<input type="button" value="xxx"/>'
        }
    })
}




function onclicks(id) {
    $("#limian"+id).show();
}
initPage();

function initPage() {
//     var _html="";
//     _html+=
//         // '<div id="1">'
//         // +
//             '<input type="text" id="textxx1" v-model:value="msg_text" hidden="hidden">';
//
//         // + '<button onclick="onclicks(\'xxx1\')"></button>'
//     // +'</div>'
//
//     alert(_html);
// $("#xx").append(_html);
    // $("#xx").innerText=_html;
    // document.getElementById("xx").innerHTML =_html;



    $("#limian").append("<span>456</span>");
    // var xx=$("#limian").parentElement;
    var xx=$("#limian").parent().attr("id");
    alert(xx);

}
