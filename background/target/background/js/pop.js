//分类树形菜单的隐藏和显示
$(".main-content").on("click","p.group-p",function () {
    $(".main-content p.group-p").removeClass("color");
    $(this).addClass("color");
    $(".main-category-two").css("display","none");
    $(".main-category-three").css("display","none");
    if ($(this).parent().parent().hasClass("main-category-one")){
        right($(this));
    }
    if ($(this).parent().parent().hasClass("main-category-two")){
        $(this).parent().parent().css("display","block");
        right($(this).parent().parent().prev(),
            $(this));
    }
    if ($(this).parent().parent().hasClass("main-category-three")){
        $(this).parent().parent().css("display","block");
        $(this).parent().parent().parent().parent().css("display","block");
        right($(this).parent().parent().parent().parent().prev(),
            $(this).parent().parent().prev(),
            $(this));
    }
    $(this).next().css("display","block");
});
//查询分类
function ajax_category(p) {
    var ul = $("<ul>");
    ul.addClass("main-category-one");
    $.post(
        "main.do",
        {p:"category"},
        function (result) {
            for (var i = 0;i<result.length;i++){
                var li_1 = creat_li();
                li_1.addClass("one");
                var p_1 ;
                if (p.hasClass("main-content")){
                    p_1 = creat_p_span(result[i]);
                }
                if (p.hasClass("sku-left")){
                    p_1 = creat_p(result[i]);
                }
                li_1.append(p_1);
                if (result[i].categorySet.length!==0){
                    var ul_2 = $("<ul>");
                    ul_2.addClass("main-category-two");
                    for (var j = 0;j<result[i].categorySet.length;j++){
                        var li_2 = creat_li();
                        li_2.addClass("two");
                        var p_2 ;
                        if (p.hasClass("main-content")){
                            p_2 = creat_p_span(result[i].categorySet[j]);
                        }
                        if (p.hasClass("sku-left")){
                            p_2 = creat_p(result[i].categorySet[j]);
                        }
                        li_2.append(p_2);
                        if (result[i].categorySet[j].categorySet.length!==0){
                            var ul_3 = $("<ul>");
                            ul_3.addClass("main-category-three");
                            for (var k = 0;k<result[i].categorySet[j].categorySet.length;k++){
                                var li_3 = creat_li();
                                li_3.addClass("three");
                                var p_3 ;
                                if (p.hasClass("main-content")){
                                    p_3 = creat_p_span(result[i].categorySet[j].categorySet[k]);
                                }
                                if (p.hasClass("sku-left")){
                                    p_3 = creat_p(result[i].categorySet[j].categorySet[k]);
                                }
                                li_3.append(p_3);
                                ul_3.append(li_3);
                            }
                            li_2.append(ul_3);
                        }
                        ul_2.append(li_2);
                    }
                    li_1.append(ul_2);
                }
                ul.append(li_1);
            }
        }
    );
    return ul;
}
//添加li标签
function creat_li() {
    var li = $("<li>");
    li.addClass("main-content-group");
    return li;
}
//添加分类标签
function creat_p(e) {
    var p = $("<p>");
    p.addClass("group-p");
    var span = $("<span>");
    span.html(e.categoryName);
    span.addClass("data");
    span.attr("data-index",e.categoryId);
    p.append(span);
    return p;
}
//添加分类标签
function creat_p_span(e) {
    var p = $("<p>");
    p.addClass("group-p");
    var span = $("<span>");
    span.html(e.categoryName);
    span.addClass("data");
    span.attr("data-index",e.categoryId);
    var span_1 =$("<span>");
    span_1.addClass("category-editor");
    span_1.html("编辑");
    var span_2 = $("<span>");
    span_2.addClass("category-add");
    span_2.html("添加");
    var span_3 = $("<span>");
    span_3.addClass("category-delete");
    span_3.html("删除");
    p.append(span,span_1,span_2,span_3);
    return p;
}
//删除分类
$(".main-content").on("click",".category-delete",function (e) {
    e.stopPropagation();//防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数。
    $.post("main.do",
        {p:"categoryDelete",id:$(this).prev().prev().prev().data("index")},function (result) {
            if (result == 1){
                $(".main-content").eq(0).children().eq(0).remove();
                $(".main-content").eq(0).append(ajax_category($(".main-content").eq(0)));
            }else {
                alert("删除出错");
            }
        }
    );
});
var ss;
//添加分类
$(".main-content").on("click",".category-add",function (e) {
    e.stopPropagation();//防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数。
    $("#pop").css("display","block");
    $(".top-text").eq(0).text("新增分类");
    $("#empty-button").text("清空");
    $("#submit-button").text("提交");
    $("#categoryName").val("");
    $("#categoryName").removeAttr("data-index");
    $("#categoryName").next().empty();
    $("#categoryParent").text("");
    ss = $(this);
    category_add(this);
});
//清空分类弹窗内容
$("#empty-button").click(function () {
    if ($("#empty-button").text()==="清空"){
        $("#categoryName").val("");
        $("#categoryParent").text("");
    }
    if ($("#empty-button").text()==="还原"){
        $("#categoryName").val($(ss).parent().children()[0].innerHTML);
        category_add(ss)
    }
});
//提交分类的内容
$("#submit-button").click(function () {
    if ($("#categoryName").val() === ""||$.trim($("#categoryName")).length === 0){
        $("#categoryName").next().text("分类名不能为空");
        return;
    }
    if ($("#submit-button").text()==="提交"){
        $.post('main.do',
            {p:'categoryInsert',name:$("#categoryName").val(),parent:$("#categoryParent").val()},
            function (data,status) {
                if (data== 1){
                    $(".main-content").eq(0).children().eq(0).remove();
                    $(".main-content").eq(0).append(ajax_category($(".main-content").eq(0)));
                }else {
                    alert("添加出错");
                }
            }
        );
        $("#pop").css("display","none");
    }
    if ($("#submit-button").text()==="修改"){
        $.post('main.do',
            {p:'categoryUpdate',id:$('#categoryName').data("index"),name:$("#categoryName").val(),parent:$("#categoryParent").val()},
            function (result,status) {
                if (result == 1){
                    $(".main-content").eq(0).children().eq(0).remove();
                    $(".main-content").eq(0).append(ajax_category($(".main-content").eq(0)));
                }else {
                    alert("修改出错");
                }
            }
        );
        $("#pop").css("display","none");
    }
});
//编辑分类
$(".main-content").on("click",".category-editor",function (e) {
    e.stopPropagation();//防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数。
    $("#pop").css("display","block");
    $(".top-text").eq(0).text("编辑分类");
    $("#empty-button").text("还原");
    $("#submit-button").text("修改");
    $("#categoryName").val($(this).parent().children()[0].innerHTML);
    $("#categoryName").next().empty();
    ss = $(this);
    category_add(this);
    $("#categoryName").attr("data-index",$(this).parent().children().eq(0).data("index"));

});
//查询分类
function category_add(e) {
    if (!$(e).parent().parent().parent().hasClass("main-category-one")){
        var ss = $(e).parent().parent().parent().prev().children()[0].innerHTML;
        var id = $(e).parent().parent().parent().prev().children().eq(0).data("index");
        const option = new Option(ss, id);
        $("#categoryParent").empty();
        $("#categoryParent").append(option);
    }else {
        $("#categoryParent").empty();
    }
}
//关闭分类弹窗
$("#pop-close").click(function () {
    $("#pop").css("display","none");
});
//判断分类名字是否存在
$("#categoryName").blur(function () {

    $(this).next().empty();
    if ($(this).val() === ""||$.trim($(this)).length === 0){
        $(this).next().text("分类名不能为空");
        return;
    }
    $.post("main.do",{p:"selectName",name:$(this).val(),id:$(this).data("index")},function (result) {
        if (result != 0){
            $(this).next().text("分类名已存在");
        }
    })
});
//select查询父分类
$("#categoryParent").focus(function () {
   $.ajax({
       type:'POST',
       url:'main.do',
       async:true,
       data:{p:"categoryParent"},
       success:function (result) {
           $("#categoryParent").empty();
           $("#categoryParent").prepend("<option value='0'>请选择</option>");
           for (var i = 0; i < result.length; i++) {
               if (result[i].categoryName===$("#categoryName").val()){
                   continue;
               }
               if (result[i].categoryLevel===3){
                   continue;
               }
                var option = new Option(result[i].categoryName,result[i].categoryId);
                $("#categoryParent").append(option);
           }
       },
       dateType:JSON
   });
});