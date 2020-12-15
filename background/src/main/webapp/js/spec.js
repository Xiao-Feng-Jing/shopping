//规格页面右边组件的添加
function right(one,two,three){
    if ($(".main-content").eq(0).children().eq(1).hasClass("sku-right")){
        const a = $(".sku-right>.main-top").eq(0);
        a.empty();
        if ($(".right-footer").children().length===0){
            $(".right-footer").append($.add_button("新增分组"));
        }else {
            $("#group").text("新增分组");
        }
        if (one != null && typeof (one) != "undefined" && one !== ""){
            a.append($.i(one.children().eq(0).text(),
                one.children().eq(0).data("index")));
        }

        if (two!=null&&two!==""&&typeof (two) != "undefined"){
            a.empty();
            a.prepend($.add_a(one.children().eq(0).text(),
                one.children().eq(0).data("index")));
            a.append($.add_inline(two.children().eq(0).text(),
                two.children().eq(0).data("index")));
        }
        if (three!==null&&three!==""&&typeof three !="undefined"){
            a.children().eq(1).children().eq(1).remove();
            a.children().eq(1).append($.add_a(two.children().eq(0).text(),
                two.children().eq(0).data("index")));
            a.append($.add_inline(three.children().eq(0).text(),
                three.children().eq(0).data("index")));
        }
        const ss = a.find("span:last-child");
        if (ss.length===0||typeof ss === "undefined"||ss===""){
            $.ajax_spec(a.children().eq(0).data("index"));
        }else {
            $.ajax_spec(ss.data("index"))
        }
    }
}

//规格组查询
$.ajax_spec = function (category_id) {
    const ul = $(".sku-right").eq(0).children().eq(1);
    ul.empty();
    $.ajax({
        url:"spec/findSpec",data :{"cid":category_id},
        type :"get",
        success:function (result) {
            for (let i = 0; i < result.length; i++) {
                ul.append($.add_spec("spec-group",result[i].name,result[i].id));
            }
        }
    });
}

//打开规格的添加界面
$(".main-content").on("click","#group",function () {
    $("#pop-2").css("display","block");
    $.add_input_spec("添加");
});
let name_spec;
let generate;
//打开规格组的编辑界面
$(".main-content").on("click","span.spec-editor.spec-group",function () {
    $("#pop-2").css("display","block");
    $.add_input_spec("还原");
    name_spec = $(this).prev().text();
    $(".top-text").eq(1).text("编辑规格组");
    $("#specName").val(name_spec);
    $("#specName").prev().attr("data-id",$(this).prev().data("id"));
});
//打开规格的编辑界面
$(".main-content").on("click","span.spec-editor.spec-param",function () {
    $("#pop-2").css("display","block");
    $.add_input_spec("还原");
    $(".top-text").eq(1).text("编辑规格");
    name_spec = $(this).prev().text()
    $("#specParamName").val(name_spec);
    $("#specParamName").prev().attr("data-id",$(this).prev().data("id"));
    generate = $(this).prev().attr("generic");
    $("input.form-radio:radio[name='generic']").prop("checked","");
    $("input.form-radio:radio[name='generic']").eq($(this).prev().attr("generic"))
        .prop("checked",true);
});
//添加弹窗底部
$.add_bottom = function(empty_text) {
    if (typeof empty_text == "undefined"||empty_text == null){
        //提交到数据库
        return $("<button id='button-two' class='button'>提交</button>").click(function () {
            let cid;
            cid = $("p.group-p.color").eq(0).children().eq(0).data("index");
            if ($(".top-text").eq(1).text()==="新增规格组"||$(".top-text").eq(1).text()==="编辑规格组"){
                if ($("#specName").val() === ""||$.trim($("#specName").val()).length === 0){
                    $("#specName").next().children().eq(0).text("规格组名不能为空");
                    return;
                }
                if ($(".top-text").eq(1).text()==="新增规格组"){
                    $.ajax({url:"spec/addSpecGroup",
                    data:{"name":$("#specName").val(),"cid":cid},
                        success:function (result) {
                        if (result === 1){
                            $.ajax_spec(cid);
                        }else {
                            alert("添加出错");
                        }
                    }});
                }else {
                    let id = $("#specName").prev().data("id");
                    $.ajax({url :"spec/updateSpecGroup",
                    data :{id:id,name:$("#specName").val()}
                        ,success:function (result) {
                            if (result == 1){
                                $.ajax_spec(cid);
                            }else {
                                alert("修改出错");}
                        }})
                }
            }
            if ($(".top-text").eq(1).text()==="编辑规格"||$(".top-text").eq(1).text()==="新增规格"){
                if ($("#specParamName").val() === ""||$.trim($("#specParamName").val()).length === 0){
                    $("#specParamName").next().children().eq(0).text("规格名不能为空");
                    return;
                }
                const gid = $(".sku-right>.main-top").eq(0).find("span:last-child").data("index");
                const generic = $('input[name="generic"]:checked').val();
                if ($(".top-text").eq(1).text()==="新增规格"){
                    $.ajax({url :"spec/addSpecParam",data :{name:$("#specParamName").val(),cid:cid
                        ,groupId:gid,generic:generic},
                        success:function (result) {
                        if (result == 1){
                            $.ajax_param(gid,cid);
                        }else {
                            alert("添加出错");
                        }
                    }});
                }else {
                    let id = $("#specParamName").prev().data("id");
                    $.ajax({url :"spec/updateSpecParam",data :{id:id,name:$("#specParamName").val()
                        ,generic:generic},success:function (result) {
                        if (result == 1){
                            $.ajax_param(gid,cid);
                        }else {
                            alert("修改出错");}
                    }})
                }
            }
            $("#pop-2").css("display","none");
        });
    }
    //清空或还原弹窗界面
    return $("<button id='button-one' class='button'>"+empty_text+"</button>").click(function() {
        $("#specName").next().children().eq(0).text("");
        let text = $(".top-text").eq(1).text()
        if (text==="编辑规格组"){
            $("#specName").val(name_spec);
        }
        if (text==="编辑规格"){
            $("#specParamName").val(name_spec);
            alert(generate);
            $("input.form-radio:radio[name='generic']").prop("checked","");
            $("input.form-radio:radio[name='generic']").eq(generate)
                .prop("checked",true);
        }
        if (text === "新增规格组"){
            $("#specName").val("");
        }
        if (text === "新增规格"){
            $("#specParamName").val("");
            $("input.form-radio:radio[name='generic']").prop("checked","");
            $("input.form-radio:radio[name='generic']").eq(0)
                .prop("checked",true);
        }
    });

}
//添加规格弹窗的内容
$.add_input_spec = function (empty_text){
    let input_add = $("<div class='input-box' id='input-add'>")
    if ($(".sku-right>.main-top").eq(0).find("span:last-child").text()!==$("p.group-p.color")
            .eq(0).children().eq(0).text()&&
        $(".sku-right>.main-top").eq(0).find("i").eq(0).text()!==$("p.group-p.color").eq(0)
            .children().eq(0).text()){
        $(".top-text").eq(1).text("新增规格");
        input_add.append($.add_label("规格名称*","specParamName"),
            $.add_input("text","specParamName","form-text"),$.add_div()
            ,$("<br>"));
        input_add.append($.add_label("是否通用"),
            $.div_input($.add_input("radio","true","form-radio","generic","0","checked"),$.add_label("是","true"),
                $.add_input("radio","false","form-radio","generic","1"),$.add_label("否","false")),$.add_div(),$("<br>"))
    }else {
        $(".top-text").eq(1).text("新增规格组");
        input_add.append($.add_label("规格组名称*","specName"),
            $.add_input("text","specName","form-text"),$.add_div(),$("<br>"));
    }
    let pop_main = $(".pop-main").eq(1);
    pop_main.empty();
    pop_main.append(input_add);
    $("#add-bottom").empty();
    $("#add-bottom").append($.add_bottom(empty_text),$.add_bottom());
};

//双击规格组显示规格
$(".main-content").on("dblclick","p.spec-group",function () {
    if ($(".sku-right>.main-top").eq(0).find("i").eq(0).text()!==""
        ||typeof $(".sku-right>.main-top").eq(0).find("i").eq(0).text() !== "undefined"){

        $(".sku-right>.main-top").eq(0).prepend(
            $.add_a($(".sku-right>.main-top").eq(0).children().eq(0).text(),
                $(".sku-right>.main-top").eq(0).children().eq(0).data("index")));
        $(".sku-right>.main-top").eq(0).children().eq(1).remove();
        $(".sku-right>.main-top").eq(0).append($.add_inline($(this).children().eq(0).text(),
            $(this).children().eq(0).data("id")));
    }else {

        $(".sku-right>.main-top").eq(0).find("span:last-child").replaceWith(
            $.add_a($(".sku-right>.main-top").eq(0).find("span:last-child").text(),
            $(".sku-right>.main-top").eq(0).find("span:last-child").data("index")));
        $(".sku-right>.main-top").eq(0).append($.add_inline($(this).children().eq(0).text(),
            $(this).children().eq(0).data("id")));
    }
    $.ajax_param($(this).children().eq(0).data("id"),
        $("p.group-p.color").eq(0).children().eq(0).data("index"));
    $("#group").text("新增规格");
});
//显示规格
$.ajax_param = function (gid,cid){
    const ul = $(".sku-right").eq(0).children().eq(1);
    ul.empty();
    $.ajax({url:"spec/specParam",
    data :{gid:gid,cid:cid},
        success:function (result) {
        for (let i = 0; i < result.length; i++) {
            ul.append($.add_spec("spec-param",result[i].name,result[i].id,
                result[i].generic))
        }
    }});
}

//添加规格的显示标签
$.add_spec = function (css,name,id,generic){
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
    const cid = $("p.group-p.color").eq(0).children().eq(0).data("index");
    $.ajax({url:"spec/specGroupDelete",
    data:{id:$(this).prev().prev().data("id")},
        success:function (result) {
        if (result == 1){
            $.ajax_spec(cid);
        }else {
            alert("删除出错");
        }
    }})
});
//规格的删除事件
$(".main-content").on("click","span.spec-param.spec-delete",function() {
    const cid = $("p.group-p.color").eq(0).children().eq(0).data("index");
    const gid = $(".sku-right>.main-top").eq(0).find("span:last-child").data("index");
    $.ajax({url:"spec/specParamDelete",data:{id:$(this).prev().prev().data("id")},
        success:function (result) {
        if (result == 1){
            $.ajax_param(gid,cid);
        }else {
            alert("删除出错");
        }
    }})
});
//关闭规格弹窗
$("#pop-sku-close").click(function () {
    $("#pop-2").css("display","none");
});

//新增按钮
$.add_button = function (txt) {
    const button = $("<button>").addClass("add-item").attr("id", "group");
    button.text(txt);
    return button;
}
//新增i标签
$.i = function (txt,id) {
    const i = $("<i>").attr("data-index", id);
    return i.text(txt);
}
//新增a标签
$.add_a = function (txt,id) {
    const a = $("<a>").addClass("a-color");
    a.attr("href","javascript:void(0);");
    a.attr("data-index",id);
    return a.text(txt);
}
//新增头标签
$.add_inline = function (txt,id) {
    const line = $("<div>").addClass("nav-inline");
    const i = $("<i>").addClass("iconfont icon-arrow-right-bold");
    const span = $("<span>");
    span.attr("data-index",id);
    span.text(txt);
    line.append(i,span);
    return line;
}
//添加input外部div
$.div_input = function (a,b,c,d){
    const div = $("<div>").addClass("input_div");
    div.append(a,b,c,d);
    return div;
}

//添加提示框
$.add_div = function (){
    const div = $("<div>").addClass("prompt");
    div.append($("<span>"));
    return div;
}
//添加label标签
$.add_label = function (data,forName){
    return $("<label>").attr("for",forName).text(data);
}
//添加input标签
$.add_input = function (type,id,className,name,val,checked){
    let input = $("<input>").attr({"type":type,"id":id,"class":className});
    if (id==="specName"){
        //判断规格组名字是否存在
        return input.blur(function (){
            $(this).next().children().eq(0).empty();
            const cid = $("p.group-p.color").eq(0).children().eq(0).data("index");
            if ($(this).val() === ""||$.trim($(this)).length === 0){
                $(this).next().children().eq(0).text("名称不能为空");
                return;
            }
            $.ajax({url:"spec/GroupName",
            data:{name:$(this).val(),id:$(this).prev().data("id"),cid:cid},
                success:function (result) {
                    if (result != 0){
                        $("#specName").next().children().eq(0).text("规格组名已存在");
                    }
                }})
        });
    }

    if (id==="specParamName"){
        //判断规格名是否存在
        return input.blur(function (){
            $(this).next().children().eq(0).empty();
            const gid = $(".sku-right>.main-top").eq(0).find("span:last-child").data("index");
            const cid = $("p.group-p.color").eq(0).children().eq(0).data("index");
            if ($(this).val() === ""||$.trim($(this)).length === 0){
                $(this).next().children().eq(0).text("规格名不能为空");
                return;
            }
            $.ajax({url:"spec/ParamName",
            data:{name:$(this).val(),id:$(this).prev().data("id"),cid:cid,gid:gid},
                success:function (result) {
                    if (result != 0){
                        $("#specParamName").next().children().eq(0).text("规格名已存在");
                    }
                }})
        });
    }
    if (name!==null||typeof name !== "undefined"){
        if (checked!==null||typeof checked !== "undefined"){
            return $("<input>").attr({"type":type,"id":id,"class":className,"name":name
                ,"checked":checked}).val(val);
        }
        return $("<input>").attr({"type":type,"id":id,"class":className,"name":name}).val(val);
    }


}
//添加select标签
$.add_select = function (id,className){
    return $("<select>").attr("id",id).attr("class",className);
}
