//商品添加按钮
$.add_goods = function () {

    $.step = function (text) {
        let div = $("div.header-li-box.editing-now");
        let p =$("p.header-radius.editing-now");
        div.removeClass("editing-now");
        p.removeClass("editing-now");
        let div_1;
        if (text === '下一步' ){
            div.addClass("finish");
            p.addClass("finish iconfont icon-seleted",300)
            p.children().eq(0).hide(300);
            let n = 1;
            if (p.text()==='3'){
                n = 0;
            }
            div_1 = div.parent().next().children().eq(n);
        }else {
            div.removeClass("finish");
            p.removeClass("finish iconfont icon-seleted",300);
            p.children().eq(0).show(300);
            div_1 = div.parent().prev().children().eq(1);
            div_1.children().eq(0).children().eq(0).show(300);
        }
        div_1.removeClass("finish");
        div_1.addClass("editing-now");
        div_1.children().eq(0).removeClass("finish iconfont icon-seleted");
        div_1.children().eq(0).addClass("editing-now");
        let one =$("#button-one")
        one.removeAttr("disabled").removeClass("disabled");
        let two = $("#button-two");
        two.removeAttr("disabled").removeClass("disabled");
        if (p.text()==='3'&&div_1.children().eq(0).text()==='4'){

            two.attr("disabled","disabled").addClass("disabled");
        }
        if (p.text() === '2'&&div_1.children().eq(0).text()==='1'){
            one.attr("disabled","disabled").addClass("disabled");
        }
    }
    //商品弹窗底部内容添加
    $.goods_bottom = function (text) {
        if (text ==="上一步") {
            return $("<button id='button-one' class='button'>"+text+"</button>").click(function() {

                $.step(text);
            });
        }
        if (text ==="下一步") {
            return $("<button id='button-two' class='button'>"+text+"</button>").click(function() {
                $.step(text);
            });
        }
    }
    $.li_main = function (text,id) {
        let li = $("<li class='header-li'>").attr("data-id",id);
        let em;
        if (id!==4){
            em= $("<em class='header-line'>");
        }

        let div = $("<div class='header-li-box'>");
        let span = $("<p class='header-radius'>");
        let strong = $("<strong>").text(id);
        if (id===1){
            div.addClass("editing-now");
            span.addClass("editing-now");
        }
        span.append(strong);
        let p = $("<strong class='header-text'>"+text+"</strong>");
        div.append(span,p)
        li.append(em,div);
        return li;
    }
    $.ul_main = function () {
        return $("<ul class='main-header'>").append($.li_main("基本信息",1),$.li_main("商品描述",2),
            $.li_main("规格参数",3),$.li_main("sku属性",4));
    }
    $.div_main = function () {
        return undefined;
    }
    return $("<button id='add-goods'>新增商品</button>").click(function() {
        $("#pop-2").css("display",'block');
        $(".top-text").eq(1).text("新增商品");
        let pop_main = $(".pop-main").eq(1);
        let pop_bottom = $("#add-bottom");
        pop_main.empty();
        pop_main.append($.ul_main(),$.div_main());
        pop_bottom.append($.goods_bottom("上一步"),$.goods_bottom("下一步"));
        $("#button-one").attr("disabled","disabled").addClass("disabled");
    });
}


//状态子栏
$.add_li = function (text) {
    let li = $("<li class='status-li'>");
    let strong = $("<strong class='status'>"+text+"</strong>");
    if (text==="全部"){
        li.addClass("status-color");
    }
    li.append(strong);
    strong.click(function() {
        $(".status-li").removeClass("status-color");
        $(this).parent().addClass("status-color");
    });
    return li;
}
//添加商品状态栏
$.add_status = function () {
    let status = $("<div class='div-status'><em class=''>状态:</em></div>");
    let ul_status = $("<ul class='status-ul'>");
    ul_status.append($.add_li("全部"),$.add_li("上架"),$.add_li("下架"))
    status.append(ul_status);

    return status;
}
//添加商品搜索框
$.add_search = function () {
    let input_search = $("<input type='text' class='search-input'>")
    let em_search = $("<em class='iconfont icon-search'>").click(function() {
        alert("2");
    });
    let search = $("<div class='goods-search'>");

    search.append(input_search,em_search);
    return search;
}
//添加商品按钮，状态查找，搜索
$.goods_top = function () {
    let div_top = $("<div class='goods-top'>");
    div_top.append( $.add_goods(), $.add_status(), $.add_search())
    return div_top;
}
//添加商品显示列表
$.goods_info = function () {
    return $("<div class='goods-info'>");
}