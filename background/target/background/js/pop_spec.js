//规格页面右边组件的添加
function right(one,two,three){
    if ($(".main-content").eq(0).children().eq(1).hasClass("sku-right")){
        var a = $(".sku-right>.main-top").eq(0);
        a.empty();
        if ($(".right-footer").children().length===0){
            $(".right-footer").append(button("新增分组"));
        }else {
            $("#group").text("新增分组");
        }
        if (one != null && typeof (one) != "undefined" && one != ""){
            a.append(i(one.children().eq(0).text(),
                one.children().eq(0).data("index")));
        }

        if (two!=null&&two!=""&&typeof (two) != "undefined"){
            a.empty();
            a.prepend(add_a(one.children().eq(0).text(),
                one.children().eq(0).data("index")));
            a.append(add_inline(two.children().eq(0).text(),
                two.children().eq(0).data("index")));
        }
        if (three!==null&&three!=""&&typeof three !="undefined"){
            a.children().eq(1).children().eq(1).remove();
            a.children().eq(1).append(add_a(two.children().eq(0).text(),
                two.children().eq(0).data("index")));
            a.append(add_inline(three.children().eq(0).text(),
                three.children().eq(0).data("index")));
        }
        clear_spec();
        var ss = a.find("span:last-child");
        if (ss.length===0||typeof ss === "undefined"||ss===""){
            ajax_spec(a.children().eq(0).data("index"));
        }else {
            ajax_spec(ss.data("index"))
        }
    }
}

//规格页面右边组件的树形菜单的清空
function clear_spec() {
    var ul = $(".sku-right").eq(0).children().eq(1);
    ul.empty();
}
//规格组查询
function ajax_spec(category_id) {
    var ul = $(".sku-right").eq(0).children().eq(1);
    $.post(
        "spec.do",
        {p:"findSpec",cid:category_id},
        function (result) {
            for (var i = 0; i < result.length; i++) {
                ul.append(add_spec("spec-group",result[i].name,result[i].id));
            }
        }
    );
}
//新增按钮
function button(txt) {
    var button = $("<button>").addClass("add-item").attr("id","group");
    button.text(txt);
    return button;
}
//新增i标签
function i(txt,id) {
    var i =$("<i>").attr("data-index",id);
    return i.text(txt);
}
//新增a标签
function add_a(txt,id) {
    var a = $("<a>").addClass("a-color");
    a.attr("href","javascript:void(0);");
    a.attr("data-index",id);
    return a.text(txt);
}
//新增头标签
function add_inline(txt,id) {
    var line = $("<div>").addClass("nav-inline");
    var i = $("<i>").addClass("iconfont icon-arrow-right-bold");
    var span = $("<span>");
    span.attr("data-index",id);
    span.text(txt);
    line.append(i,span);
    return line;
}
//打开规格的添加界面
$(".main-content").on("click","#group",function (e) {
    $("#pop-sku").css("display","block");
    add_input_spec();
});
//打开规格组的编辑界面
$(".main-content").on("click","span.spec-editor.spec-group",function (e) {
    $("#pop-sku").css("display","block");
    add_input_spec();
    $(".top-text").eq(1).text("编辑规格组");
    $("#specName").val($(this).prev().text());
    $("#specName").attr("data-id",$(this).prev().data("id"));
});
//打开规格的编辑界面
$(".main-content").on("click","span.spec-editor.spec-param",function (e) {
    $("#pop-sku").css("display","block");
    add_input_spec();
    $(".top-text").eq(1).text("编辑规格");
    $("#specParamName").val($(this).prev().text());
    $("#specParamName").attr("data-id",$(this).prev().data("id"));
    console.log($("input.form-radio:radio[name='generic']").length);
    $("input.form-radio:radio[name='generic']").prop("checked","");
    $("input.form-radio:radio[name='generic']").eq($(this).prev().attr("generic")).prop("checked",true);
});
//添加规格弹窗的内容
function add_input_spec(){
    $("#input-add").empty();
    if ($(".sku-right>.main-top").eq(0).find("span:last-child").text()!==$("p.group-p.color").eq(0).children().eq(0).text()&&
        $(".sku-right>.main-top").eq(0).find("i").eq(0).text()!==$("p.group-p.color").eq(0).children().eq(0).text()){
        $(".top-text").eq(1).text("新增规格");
        $("#input-add").append(add_label("规格名称*","specParamName"),
            add_input("text","specParamName","form-text"),$("<span>"),$("<br>"));
        $("#input-add").append(add_label("是否通用"),
            add_input("radio","true","form-radio","generic","0","checked"),add_label("是","true"),
            add_input("radio","false","form-radio","generic","1"),add_label("否","false"),$("<br>"))
    }else {
        $(".top-text").eq(1).text("新增规格组");
        $("#input-add").append(add_label("规格组名称*","specName"),
            add_input("text","specName","form-text"),$("<span>"),$("<br>"));
    }
}
//双击规格组显示规格
$(".main-content").on("dblclick","p.spec-group",function (e) {
    if ($(".sku-right>.main-top").eq(0).find("i").eq(0).text()!==""
        ||typeof $(".sku-right>.main-top").eq(0).find("i").eq(0).text() !== "undefined"){

        $(".sku-right>.main-top").eq(0).prepend(
            add_a($(".sku-right>.main-top").eq(0).children().eq(0).text(),
                $(".sku-right>.main-top").eq(0).children().eq(0).data("index")));
        $(".sku-right>.main-top").eq(0).children().eq(1).remove();
        $(".sku-right>.main-top").eq(0).append(add_inline($(this).children().eq(0).text(),
            $(this).children().eq(0).data("id")));
    }else {
        add_a($(".sku-right>.main-top").eq(0).find("span:last-child").text(),
            $(".sku-right>.main-top").eq(0).find("span:last-child").data("index"))
            .replaceAll($(".sku-right>.main-top").eq(0).find("span:last-child"));
        $(".sku-right>.main-top").eq(0).append(add_inline($(this).children().eq(0).text(),
            $(this).children().eq(0).data("id")));
    }
    clear_spec();
    var ul = $(".sku-right").eq(0).children().eq(1);
    $.post("spec.do",{p:"specParam",
        gid:$(this).children().eq(0).data("id"),
        cid:$("p.group-p.color").eq(0).children().eq(0).data("index")},function (result) {
        for (var i = 0; i < result.length; i++) {
            ul.append(add_spec("spec-param",result[i].name,result[i].id,result[i].generic))
        }
    });
    $("#group").text("新增规格");
});
//添加规格的显示标签
function add_spec(css,name,id,generic){
    const li = $("<li>").addClass("spec");
    const p = $("<p>").addClass(css);
    const span_txt = $("<span>").text(name).attr({"data-id": id,"generic":generic});
    const span = $("<span>").addClass("spec-editor " + css).text("编辑");
    const span_1 = $("<span>").addClass("spec-delete " + css).text("删除");
    p.append(span_txt,span,span_1);
    li.append(p);
    return li;
}
//规格组的删除按钮
$(".main-content").on("click","span.spec-group.spec-delete",function (e) {
    e.stopPropagation();//防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数。
    $.post("spec.do",{p:"specGroupDelete",id:$(this).prev().prev().data("group-id")},function (result) {
        if (result == 1){
            spec_Overload();
        }else {
            alert("删除出错");
        }
    })
});
//提交到数据库
$("#submit").click(function (e) {

    var cid;
    cid = $("p.group-p.color").eq(0).children().eq(0).data("index");
    if ($(".top-text").eq(1).text()==="新增规格组"||$(".top-text").eq(1).text()==="编辑规格组"){
        if ($("#specName").val() === ""||$.trim($("#specName").val()).length === 0){
            $("#specName").next().text("规格组名不能为空");
            return;
        }
        if ($(".top-text").eq(1).text()==="新增规格组"){

            $.post("spec.do",{p:"addSpecGroup",name:$("#specName").val(),cid:cid},function (result) {
                if (result == 1){
                    spec_Overload();
                }else {
                    alert("添加出错");
                }
            });
        }else {
            $.post("spec.do",{p:"updateSpecGroup",id:id,name:$("#specName").val()},function (result) {
                if (result == 1){
                    spec_Overload();
                }else {
                    alert("修改出错");}
            })
        }
    }
    if ($(".top-text").eq(1).text()==="编辑规格"||$(".top-text").eq(1).text()==="新增规格"){
        if ($("#specParamName").val() === ""||$.trim($("#specParamName").val()).length === 0){
            $("#specParamName").next().text("规格名不能为空");
            return;
        }
        var gid = $(".sku-right>.main-top").eq(0).find("span:last-child").data("index");
        console.log($(".specParamGeneric:radio[name='generic']:checked").val());
        if ($(".top-text").eq(1).text()==="新增规格"){
            $.post("spec.do",{p:"addSpecParam",name:$("#specName").val(),cid:cid,groupId:gid},function (result) {
                if (result == 1){
                    spec_Overload();
                }else {
                    alert("添加出错");
                }
            });
        }else {
            $.post("spec.do",{p:"updateSpecParam",id:id,name:$("#specName").val()},function (result) {
                if (result == 1){
                    spec_Overload();
                }else {
                    alert("修改出错");}
            })
        }
    }
    $("#pop-sku").css("display","none");
});
//判断显示哪个分类或规格组下的规格
function spec_Overload(){
    clear_spec();
    const ss = $(".sku-right>.main-top").eq(0).find("span:last-child");
    if(ss.length===0||typeof ss === "undefined"||ss===""){
        ajax_spec($(".sku-right>.main-top").eq(0).children().eq(0).data("index"));
    }else{
        ajax_spec($(".sku-right>.main-top").eq(0).find("span").data("index"));
    }
}
//关闭规格弹窗
$("#pop-sku-close").click(function () {
    $("#pop-sku").css("display","none");
});
//添加label标签
function add_label(data,forName){
    return $("<label>").attr("for",forName).text(data);
}
//添加input标签
function add_input(type,id,className,name,val,checked){
    if (name!==null||name.length>0||typeof name !== "undefined"){
        if (checked!==null||checked.length>0||typeof checked !== "undefined"){
            return $("<input>").attr({"type":type,"id":id,"class":className,"name":name,"checked":checked}).val(val);
        }
        return $("<input>").attr({"type":type,"id":id,"class":className,"name":name}).val(val);
    }
    return $("<input>").attr({"type":type,"id":id,"class":className});


}
//添加select标签
function add_select(id,className){
    return $("<select>").attr("id",id).attr("class",className);
}
