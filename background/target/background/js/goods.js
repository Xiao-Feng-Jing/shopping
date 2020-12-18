//商品信息


//商品添加按钮
$.add_goods = function () {


    return $("<button id='add-goods' type='button'>新增商品</button>").click(function() {
        $("#pop-2").css("display",'block');
        $(".top-text").eq(1).text("新增商品");
        let pop_main = $(".pop-main").eq(1);
        let pop_bottom = $("#add-bottom");
        pop_main.empty();
        //pop_main.append();
		let div_content = $("<div class='pop-main-content'>");
		let content_form = $("<form id='goods-info' class='goods-form'>");
		div_content.append(content_form)
        pop_bottom.append($.goods_bottom("上一步",content_form),$.goods_bottom("下一步",content_form));
        $("#button-one").attr("disabled","disabled").addClass("disabled");
		pop_main.append($.ul_main(),div_content);
		$.goods(content_form);
		$.goods_add(content_form);
    });
}
//下一步和上一步
$.step = function (text,content_form) {
	
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
	
	$.goods_add(content_form);
	
}
//商品弹窗底部内容添加
$.goods_bottom = function (text,content_form) {
    if (text ==="上一步") {
        return $("<button id='button-one' class='button'>"+text+"</button>").click(function() {

            $.step(text,content_form);
        });
    }
    if (text ==="下一步") {
        return $("<button id='button-two' class='button'>"+text+"</button>").click(function() {
            $.step(text,content_form);
        });
    }
}
//弹窗顶部具体进度栏
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
//弹窗顶部具体进度栏
$.ul_main = function () {
    return $("<ul class='main-header'>").append($.li_main("基本信息",1),$.li_main("商品描述",2),
        $.li_main("规格参数",3),$.li_main("sku属性",4));
}
function focusInputLoginBox(obj) {
	obj.prev(".item_tip").removeClass("item_tip_val");
    obj.prev(".item_tip").addClass("item_tip_focus item_tip_color");
}

function blurInputLoginBox(obj) {
    const v = obj.val();
	obj.prev(".item_tip").removeClass("item_tip_color")
    if (v ==="") {
        obj.prev(".item_tip").removeClass("item_tip_focus item_tip_val");
    } else {
		console.log(1);
        obj.prev(".item_tip").addClass("item_tip_focus item_tip_val");
    }

}
/* 添加商品基本信息栏 */
$.add_divs= function(name,input_class,text,divs_class,maxLength) {
	let divs,input;
	if(typeof divs_class != "undefined"){
		if(divs_class ==="text-area-2"){
			divs = $('<div class="div-text '+divs_class+'"></div>');
			input = $("<textarea class='"+input_class+"' id="+name+" style='resize:none;width:660px;height:63px;' name='"+name+"' maxLength="+maxLength+">");
		}else{
			divs = $('<div class="div-text '+divs_class+'"></div>');
			input = $("<textarea class='"+input_class+"' id="+name+" style='resize:none;width:660px;height:42px;' name='"+name+"' maxLength="+maxLength+">");
		}
		
	}else{
		divs = $('<div class="div-text"></div>');
		input = $(`<input type="text" name=`+name+" class='"+input_class+"'id="+name+">");
	}
	let prompt = $("<p class='Error-prompt'>");
	let p = $("<p><span id='"+name+"_num'>0</span><span>/"+maxLength+"</span></p>")
    let div_category =  $(`<em class="item_tip">`+text+`</em>`);
    divs.append(div_category,input);
	if(divs_class!=="text-area-2"){
		divs.append(prompt);
	}
	if (typeof maxLength !="undefined") {
    	divs.append(p);
    }
    return divs;
}
/*$.goods_spec = function () {
    $.ajax({
        url :"spec/findSpec",
        data:{"cid":1},
        type: "post",
        success:function(data) {

        }
    })
    return undefined;
}*/
$.goods_sku = function () {
    return undefined;
}
/*查询商品分类*/
$.ajax_cate=function(l,parent) {
    let d=Object();
    l=Number(l);
    d.level=l;
    if (typeof parent !="undefined"){
        d.parent = parent;
    }
    let div_ul;
    $.ajax({
        url :"main/categoryLevel",
        data:d,
        dataType : 'json',
        type :"get",
        async:false,
        contentType :"application/json",
        success : function(data) {
            console.log(data);
            if (data.length!==0){
                div_ul=$("<ul class='category-select-item' >");
                for (let i = 0; i < data.length; i++) {
                    let div_li = $("<li class='item-li'>");
                    let a = $("<a href='javascript:void(0);' class='item-li-a'>");
                    a.attr("data-categoryId", data[i].categoryId);
                    a.text(data[i].categoryName);
                    div_li.append(a);
                    div_ul.append(div_li);
                    div_li.click(function () {
                        div_ul.children().removeClass("active");
                        div_ul.next("ul").remove();
                        $(this).addClass("active");
                        div_ul.after($.ajax_cate(l + 1, data[i].categoryId));
                    })
                }
            }


        },
        error : function(data) {

        }
    });
    return div_ul;
}
//商品基本信息栏
$.goods = function (form) {
	let div_1 = $("<div id='class_1'>")
    div_1.append($.add_divs("goods_category","form_input","商品分类*"),
        $.add_divs("goods_title","form_input","商品标题*","text-area","100"),
		$.add_divs("packing_list","form_input","包装清单","text-area-2","1000"),
		$.add_divs("after_service","form_input","售后服务","text-area-2","1000"));
	let div_2 = $("<div id='class_2' class='Rich-text'></div>");
	let div_3 = $("<div id='class_3' class='goods-spec'></div>");
	//div_3.append($.goods_spec());
	let div_4 = $("<div id='class_4' class='goods-sku'></div>");
    div_4.append($.goods_sku());
	form.append(div_1,div_2,div_3,div_4);
	/*分类下拉选择器*/


	form.ready(function(){

		let names = $("[name]");
		for (let i=0;i<names.length;i++) {

			if (names.eq(i).length>0) {
				if (names.eq(i).val().length===0) {
					names.eq(i).prev(".item_tip").removeClass("item_tip_focus item_tip_val");
				}else {
					names.eq(i).prev(".item_tip").addClass("item_tip_focus item_tip_val");
				}
			}
		}

		$("#goods_category").click(function() {
		    let t=$(this).parent();
		    if (t.find("ul").length !== 0){
		        t.find("ul").remove();
            }else {
		        let div=$("<div class='category-select'>")
               div.append($.ajax_cate(1));
		        t.append(div);
            }

		})

		/* 添加富文本编辑器 */
		const E = window.wangEditor;
		const editor = new E('#goods-info #class_2')
		editor.config.uploadImgShowBase64 = true;
		editor.create();
		//console.log($("#goods-info #class_2"))
		$(".form_input").blur(function() {
	        blurInputLoginBox($(this))
	    })
	    $(".form_input").focus(function(){
	        focusInputLoginBox($(this))
	    })
		/*文本域字数限制*/
		$("textarea").on("input",function(){
			limit($(this));
		}) 
		$("textarea").ready(function(){
			let t = $("textarea");
			for(let i=0;i<t.length;i++){
				limit(t.eq(i))
			}
		});
	
	})
}
//商品内容栏
$.goods_add = function (div) {
	
    let strong =$("p.header-radius.editing-now").children().eq(0).text();
	if (strong==='1'){
        div.children().hide();
		div.children("#class_1").show();
    }
    if (strong==='2'){
		div.children().hide();
		div.children("#class_2").show();
    }
    if (strong==='3'){
		div.children().hide();
		div.children("#class_3").show();
    }
    if (strong==='4'){
		div.children().hide();
		div.children("#class_4").show();
    }
}
//字数限制和显示
function limit(t){
	let a = t.val().length;
	t.nextAll().children().eq(0).text(a);
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
    let input_search = $("<input type='search' class='search-input'>")
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