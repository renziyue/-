function addproducter(id,name,price) {
    $("#producterlist").append("<li >\n" +
        "<div style=\"padding-top: 50px\">\n" +
        "\t\t\t\t\t\t<div>\n" +
        "\t\t\t\t\t\t\t<span>订单编号：</span>\n" +
        "\t\t\t\t\t\t\t<label>"+id+"</label>\n" +
        "\t\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t\t<div>\n" +
        "\t\t\t\t\t\t\t<label>"+name+"</label>\n" +
        "\t\t\t\t\t\t</div>\n" +
        "\t\t\t\t\t\t<div>\n" +
        "\t\t\t\t\t\t\t<img src=\"img/tianpin/img/hh.png\" >\n" +
        "\t\t\t\t\t\t\t<span>售价：</span>\n" +
        "\t\t\t\t\t\t\t<span>"+price+"</span>\n" +
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
}


function onceAgin(id) {

}