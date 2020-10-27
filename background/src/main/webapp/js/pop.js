var ss;
$(".main-content").on("click",".category-add",function () {
    $("#pop").css("display","block");
    $(".top-text").text("新增分类");
    $("#empty-button").text("清空");
    $("#submit-button").text("提交");
    $("#categoryName").val("");
    $("#categoryParent").text("");
    ss = $(this);
    category_add($(this));
});

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

$("#submit-button").click(function () {
    if ($("#categoryName").innerHTML === null||$("#categoryName") == ""){
        alert("分类名不能为空");
        return;
    }

    if ($("#submit-button").text()==="提交"){
        $.post('main.do',
            {p:'categoryInsert',name:$("#categoryName").val(),parent:$("#categoryParent").val()},
            function (data,status) {
                console.log(data);
                if (data== 1){
                    $(".main-content").eq(0).children().eq(0).remove();
                    $(".main-content").eq(0).append(ajax_category());
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
            console.log(result);
                if (result == 1){
                    $(".main-content").eq(0).children().eq(0).remove();
                    $(".main-content").eq(0).append(ajax_category());
                }else {
                    alert("修改出错");
                }
            }
        );
        $("#pop").css("display","none");
    }
});

$(".main-content").on("click",".category-editor",function () {
    $("#pop").css("display","block");
    $(".top-text").text("编辑分类");
    $("#empty-button").text("还原");
    $("#submit-button").text("修改");
    $("#categoryName").val($(this).parent().children()[0].innerHTML);
    ss = $(this);
    category_add($(this));
    $("#categoryName").attr("data-index",$(this).parent().children().eq(0).data("index"));

});
function category_add(e) {
    if ($(e).parent().parent().parent().attr("class")!=="main-category-one"){
        var ss = $(e).parent().parent().parent().prev().children()[0].innerHTML;
        var id = $(e).parent().parent().parent().prev().children().eq(0).data("index");
        var option = new Option(ss,id);
        $("#categoryParent").empty();
        $("#categoryParent").append(option);
    }else {
        $("#categoryParent").empty();
    }
}

$("#pop").on("click","#pop-close",function () {
    $("#pop").css("display","none");
});
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















