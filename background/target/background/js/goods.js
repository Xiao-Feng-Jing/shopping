//商品信息

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
$.delete_goods = function() {
    return $("<button id='delete-goods' type='button'>删除商品</button>");
}
$.goods_top = function () {
    let div_top = $("<div class='goods-top'>");
    div_top.append( $.add_goods(),$.delete_goods(), $.add_status(), $.add_search())
    return div_top;
}

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
            let text_t = $(".form_input");
            let f=true;
            let s=0
            for (let i = 0; i < text_t.length; i++) {
                if (text_t.eq(i).val().length === 0 &&text_t.eq(i).next(".Error-prompt").length !==0){
                    f = false;
                    s=i
                    break;
                }
            }
            if (!f){
                text_t.eq(s).next(".Error-prompt").text("该字段不能为空")
            }else {
                text_t.eq(s).next(".Error-prompt").text("");
                $.step(text,content_form);
            }
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
		input = $(`<input type="text" name=`+name+" class='"+input_class+"'id="+name+`>`);
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
/*查询商品分类*/
$.ajax_cate=function(l,t,parent) {
    const div=$("<div class='category-select level-"+l+"'>")
    let d=Object();
    l=Number(l);
    d.level=l;
    if (typeof parent !="undefined"){
        d.parent = parent;
    }
    let div_ul;
    let f;
    $.ajax({
        url :"main/categoryLevel",
        data:d,
        dataType : 'json',
        type :"get",
        async:false,
        contentType :"application/json",
        success : function(data) {
            data=JSON.parse(data);
            if (data.length!==0){
                div_ul=$("<ul class='category-select-item' >");
                for (let i = 0; i < data.length; i++) {
                    let div_li = $("<li class='item-li'>");
                    let a = $("<a href='javascript:void(0);' class='item-li-a'>");
                    a.attr("data-categoryId", data[i].categoryId);
                    a.text(data[i].categoryName);
                    div_li.append(a);
                    div_ul.append(div_li);
                    div_li.click(function (e) {
                        e.preventDefault();/* 阻止默认事件 */
                        e.stopPropagation()
                        let div = $(".category-select");
                        for (let z=0;z <div.length; z++){
                            for (let j=l+1;j<=3;j++){
                                if (div.eq(z).hasClass("level-"+j)){
                                    div.eq(z).remove()
                                }
                            }
                        }
                        div_ul.children().removeClass("active");
                        $(this).addClass("active");
                        let s = $.ajax_cate(l + 1,t, data[i].categoryId)

                        if (s) {
                            const level = t.find('.active');
                            let value='/';
                            let id = '/';
                            for (let j = 0;j<level.length; j++){
                                value=value+level.eq(j).text()+"/";
                                id = id + level.eq(j).children("a").data("categoryid")+"/"
                            }
                            value = value.substring(1,value.length-1);
                            id = id.substring(1,id.length-1);
                            $("#goods_category").parent().find("div.select-div").remove();
                            $("#goods_category").focus()
                            $("#goods_category").val(value);
                            $("#goods_category").removeAttr("data-category");
                            $("#goods_category").attr("data-category",id);
                        }else {
                            div_ul.after(s);
                        }

                    })
                }
                div.append(div_ul);
                t.append(div);
                f = false;
            }else {
                f = true;
            }

        },
        error : function(data) {

        }
    });
    return f;
}
let details;
//商品基本信息栏
$.goods = function (form) {
	let div_1 = $("<div id='class_1'>")
    div_1.append($.add_divs("goods_category","form_input","商品分类*"),
        $.add_divs("goods_name","form_input","商品名称*"),
        $.add_divs("goods_title","form_input","商品标题*","text-area","100"),
		$.add_divs("packing_list","form_input","包装清单","text-area-2","1000"),
		$.add_divs("after_service","form_input","售后服务","text-area-2","1000"));
	let div_2 = $("<div id='class_2' class='Rich-text'></div>");
	let div_3 = $("<div id='class_3' class='goods-spec'></div>");
	//div_3.append($.goods_spec());
	let div_4 = $("<div id='class_4' class='goods-sku'></div>");
	form.append(div_1,div_2,div_3,div_4);



	form.ready(function(){
	    $("#goods_category").attr("readOnly","readOnly");
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
		$("#goods_category").click(function(e) {
            e.preventDefault();/* 阻止默认事件 */
            e.stopPropagation()
		    let t=$(this).parent();
		    if (t.find("div.select-div").length !== 0){
		        console.log(t.find("div.select-div"))
		        t.find("div.select-div").remove();
            }else {
                /*分类下拉选择器*/
		        let div = $("<div class='select-div'>");
		        div.append($.ajax_cate(1,div))
		        t.append(div);
            }

		})
        $(document).click(function(e) {
            let d = $("#pop-2")
            if (d.find("div.select-div").length !== 0){
                d.find("div.select-div").remove();
            }
        })

		/* 添加富文本编辑器 */
		const E = window.wangEditor;
        const editor = new E('#class_2');
        details = editor;
        editor.config.fontSizes = {
            'x-small': { name: '10px', value: '1' },
            'small': { name: '13px', value: '2' },
            'normal': { name: '16px', value: '3' },
            'large': { name: '18px', value: '4' },
            'x-large': { name: '24px', value: '5' },
            'xx-large': { name: '32px', value: '6' },
            'xxx-large': { name: '48px', value: '7' },
        }
        // 设置编辑区域高度为 370px
        editor.config.height = 370;
        editor.config.showLinkImg = false;
        // 关闭粘贴内容中的样式
        editor.config.pasteFilterStyle = false;
        // 忽略粘贴内容中的图片
        editor.config.pasteIgnoreImg = true;
        // 将图片大小限制为 3M
        editor.config.uploadImgMaxSize = 5 * 1024 * 1024;
        // 限制一次最多上传 1 张图片
        editor.config.uploadImgMaxLength = 1;
        //隐藏上传网络图片的功能 false
        editor.config.showLinkImg = false;
        //限制类型
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp','.webp'];
        editor.config.uploadImgServer = 'http://localhost/background/upload'; // 上传图片的接口地址
        editor.config.uploadFileName = 'file' // formdata中的name属性
        editor.config.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                let url =result.data.imageUrl;//获取后台返回的url
                insertImg(url);
            }
        };
        editor.create();
		//console.log($("#goods-info #class_2"))
		$(".form_input").on("blur input propertychange",function() {
		    if ($(this).val().length===0){
                $(this).next(".Error-prompt").text("该字段不能为空");
            }else {
                $(this).next(".Error-prompt").text("");
            }

	        blurInputLoginBox($(this));
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
/*生成表格的头部内容*/
$.table_th_title= function (s) {
    return $("<th>").text(s);
}
$.table_td = function (text) {
    return $("<td>").text(text);
}
$.table_td_input = function (name,t) {
    const td = $("<td>");
    let input;
    input = $("<input type='text' placeholder='0' value='0'>").attr("name",name)
    if (t){
        input.attr("pattern",'(([1-9]\\d*)|^0)(\\.\\d{1,2})?$');
    }else {
        input.attr('pattern','(([1-9]\\d*)|^0)');
    }
    return td.append(input);
}
$.table_td_checked = function (r,name) {
    const td = $("<"+r+">");
    const input = $("<input type='checkbox'>").attr({"name":name}).val("1");
    return td.append(input);
}
/*生成sku数据表格内容*/
$.ajax_sku_data = function (text){
    const table_tr=$("<tr class='sku-tr-td'>");
    let td_text = text.split("/")
    for (let tdTextKey of td_text) {
        const td = tdTextKey.split("_");
        table_tr.append($.table_td(td[0]).attr("data-index",td[1]));
    }
    table_tr.append($.table_td_input("goodsPrice",true),
        $.table_td_input("goodsSalePrice",true),
        $.table_td_input("stock",false))
    table_tr.append($.table_td_checked("td","goodsIsEnable"))
    const table_t=$("table.sku-data-table");
    table_t.append(table_tr);
}
/*根据二维数组生成笛卡尔积*/
function list_result_sku(r_list,re,n,str) {
    /*获取当前数组*/
    let list = r_list[n];
    for (let i = 0; i < list.length; i++) {
        if (n+1<r_list.length){
            if (typeof str==="undefined"){
                list_result_sku(r_list,re,n+1,list[i]+"_"+i+"/");
            }else {
                list_result_sku(r_list,re,n+1,str+list[i]+"_"+i+"/");
            }
        }else {
            if (typeof str==="undefined"){
                re.push(list[i]+"_"+i);
            }else {
                re.push(str+list[i]+"_"+i);
            }

        }
    }
}
/*详细生成sku*/
function add_sku_data(s) {
    let l = s.length
    let t = 0;
    /*规格集合*/
    let r=[];
    let o=name_data(t,l);
    if (o!==0){
        $(".sku-list .notFollow").remove();
        const div_title=$("<div class='sku-data'>");
        const table_t=$("<table class='sku-data-table'>");
        const table_tr=$("<tr class='sku-tr'>");
        if ($(".sku-list .sku-data").length ===0){
            if (r.length ===0){
                r[0]=[]
                r[0][0]=($("#goods_name").val())
                table_tr.append($.table_th_title("商品名称"))
            }else {
                for (let i = 0; i < l;i++){
                    table_tr.append($.table_th_title(
                        s.eq(i)
                            .children().eq(0)
                            .children().eq(0).text())
                    )
                }
            }
            table_tr.append($.table_th_title("价格"),
                $.table_th_title("优惠价格"),
                $.table_th_title("库存"),
                $.table_th_title("是否启用"))
            table_t.append(table_tr);
            div_title.append(table_t);

            $(".sku-list").append(div_title);


        }
        console.log(r)
        let re = new Array();
        list_result_sku(r,re,0);
        if (l!==0){
            $(".sku-data-table").find("tr.sku-tr-td").remove();
        }
        for (let reElement of re) {
            $.ajax_sku_data(reElement)
        }
    }else {
        $(".sku-list .sku-data").remove();
        if ($(".sku-list .notFollow").length ===0){
            $(".sku-list").append(empty_notspec("无"));
        }
    }
    function name_data(k,z) {
        if (z===0){
            return 1;
        }
        let sku = $(`input.sku-`+k);
        let q=[];
        let j=0;
        k++;
        for (let i = 0; i < sku.length; i++) {
            if (sku.eq(i).val().length!==0){
                q[i]=sku.eq(i).val();
                j++
            }
        }
        r.push(q);
        if (k===z){
            return j;
        }
        let w=name_data(k,z)
        return w*j;
    }
}
/*生成详细的sku数据*/
function sku_list(x) {
    x.on("keyup",".sku-input",function() {
        const s = $(".sku-param-data.sku");
        add_sku_data(s)
    });
}
//商品内容栏
var cid_3;
var cid_4;
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
		div.children("#class_3").show(function () {
            spu_param($(this),3);
        });
    }
    if (strong==='4'){
		div.children().hide();
		div.children("#class_4").show(function () {
            spu_param($(this),4);
            sku_list($(this));
        });
    }
}
/*通用规格输入的添加*/
$.ajax_class_3 = function (eve,id) {
    const div=$("<div class='goods-add-group' id='spu-goods'>");
    console.log(id);
    $.ajax({
        url :'spec/findSpecCategory',
        data: {"cid":id},
        contentType :"application/json",
        success : function(data) {
            console.log(data);
            if (data.data.length!==0){
                for (let datum of data.data) {
                    let div_data = $("<div class='spu-group'>").attr("data-group-id",datum.id);
                    const span_data = $("<p class='group-title'>").text(datum.name);
                    let div_params= $("<div class='spu-params'>");
                    for (let paramsData of datum.paramsList) {
                        let div_param = $("<div class='spu-param'>").attr({"data-param":paramsData.id+"_"+paramsData.main+"_"+paramsData.generic});
                        const em_params = $("<em class='item_tip'>").text(paramsData.name);
                        const input_params = $("<input type='text' class='form_input' name='param'>");
                        input_params.on("focus ",function(e) {
                            focusInputLoginBox($(this));
                        })
                        input_params.on("blur",function(e) {
                            blurInputLoginBox($(this));
                        })
                        div_param.append(em_params,input_params);
                        div_params.append(div_param);
                    }
                    div_data.append(span_data,div_params);
                    div.append(div_data)
                }
            }
            if (div.children().length ===0) {
                div.append(empty_notspec("没有通用规格参数"));
            }
            eve.append(div);
        }
    })

}
/*新增sku输入框*/
$.div_param = function (name,id) {
    const div_param = $("<div class='sku-param'>");
    let input = $("<input type='text' name='"+name+"' class='sku-input sku-"+id+"'>");
    let em = $("<em class='iconfont icon-delete'>");
    em.click(function() {
        if($(this).parent().siblings().length === 0){
            return false;
        }
        $(this).parent().remove();

    })
    return div_param.append(input,em);
}
/*保存按钮*/
$.pre_button = function () {
    let button = $("<button class='sku-prv-button' name='' type='button'>");
    button.text("保存商品信息");
    button.append($("<em class='iconfont icon-shangchuan'>"))
    button.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        button.attr("disabled",true);
        /*数据获取部分*/
        let cid = $("#goods_category").attr("data-category");
        let goods_name = $("#goods_name").val();
        let goods_title = $("#goods_title").val();
        let packing_list = $("#packing_list").val();
        let after_service = $("#after_service").val();
        let description = details.txt.html();
        /*添加数据*/
        let json = {};
        json.cid=cid;
        let goodsSpu= {};
        let spuDetail ={};
        goodsSpu.title = goods_title
        goodsSpu.goodsName = goods_name;
        spuDetail.packingList=packing_list;
        spuDetail.afterService=after_service;
        spuDetail.description=description;
        /*获取spu全部规格属性*/
        let specifications = [];
        let group = $(".spu-group");
        for (let i = 0; i < group.length; i++){
            let json_group = Object();
            json_group.id=group.eq(i).attr("data-group-id");
            json_group.group =group.eq(i).children("p.group-title").text();
            let param =[];
            let param_div = group.eq(i).children(".spu-params");
            for (let j = 0; j < param_div.length; j++) {
                let param_s = param_div.eq(j).children(".spu-param");
                for (let k = 0; k < param_s.length; k++) {
                    let json_param = Object();
                    json_param.k=param_s.eq(j).find(".item_tip").text();
                    json_param.v=param_s.eq(j).find("input[name='param']").val();
                    let parameter = param_s.eq(0).attr("data-param");
                    let t = parameter.split("_");
                    json_param.id=t[0];
                    json_param.main=t[1];
                    json_param.generic=t[2];
                    param.push(JSON.stringify(json_param));
                }
            }
            json_group.param=param;
            specifications.push(json_group)
        }
        /*获取sku特有规格属性*/

        let specTemplate = {};
        let sku_params=$(".sku-param-data.sku");
        for (let i = 0; i < sku_params.length; i++){
            let param_sku=[];

            let sku_param = sku_params.eq(i).find(".sku-param");
            for (let j = 0; j <sku_param.length; j++) {
                param_sku.push(sku_param.eq(j).children().eq(0).val())
            }
            specTemplate[sku_params.eq(i)
                .children('p.param-title').eq(0)
                .children().eq(0).text()] = param_sku;
        }
        /*获取sku属性*/
        let skus = [];
        let goods_sku = $("tr.sku-tr-td");
        if (goods_sku.length ===0&&sku_params.length !==0) {
            button.attr("disabled",false)
            return ;
        }
        for (let j=0;j < goods_sku.length; j++) {
            let goodsSku = {}
            let sku_data = goods_sku.eq(j).children();
            /*sku特有规格下标*/
            let indexs="";
            let ownSpec = {};
            for (let i = 0; i < sku_data.length; i++) {
                if (i<sku_params.length){
                    indexs = indexs+sku_data.eq(i).attr("data-index")+"_";
                    ownSpec[$("table.sku-data-table tr:eq(0) th:eq("+i+")").text()]=sku_data.eq(i).text();
                }else if (i===sku_data.length-1){
                    let t =0;
                    if(sku_data.eq(i).find("input[name='goodsIsEnable']").prop("checked")){
                        t=1;
                    }
                    goodsSku.goodsIsEnabled = t;
                }else{
                    goodsSku[sku_data.eq(i).children().eq(0).attr("name")] = sku_data.eq(i).children().eq(0).val();
                }
            }
            goodsSku.indexes=indexs;
            goodsSku.ownSpec = ownSpec;
            skus.push(goodsSku);
        }
        //将JavaScript对象转为字符串格式
        spuDetail.specifications=specifications;
        spuDetail.specTemplate = specTemplate;
        json.goodsSpu=goodsSpu;
        json.skus = skus;
        json.spuDetail=spuDetail;
        $.ajax({
            url :"goods/addGoods",
            data: JSON.stringify(json),
            headers : {
                Accept:"application/json",
                contentType:"application/json",
            },
            type:"post",
            async:true,
            success : function(result){
                button.attr("disabled",false);
                $("#pop-2").hide();
                //刷新goods列表
                $.pages_goods(1,sessionStorage.row);
            }
        })
    });
    return button;
}
/*添加ajax-sku规格*/
$.ajax_class_4 = function (l, id) {
    const div=$("<div class='spec-div' id='sku-goods'>");
    $.ajax({
        url :'spec/findSpecSku',
        data: {"cid":id},
        contentType :"application/json",
        success : function(data) {
            const datum = data.data;
            for (let i = 0; i < datum.length; i++) {
                let div_data = $("<div class='sku-param-data sku'>").attr({"data-param-id":datum[i].id+"_"+datum[i].main+"_"+datum[i].generic});
                const p_data = $("<p class='param-title'>");
                const span_data = $("<span class='title-span'>").text(datum[i].name);
                const em_add =  $("<em class='iconfont icon-add-select add'>");
                p_data.append(span_data,em_add)
                const div_params= $("<div class='sku-params'>");
                div_params.append($.div_param(datum[i].name,i));
                div_data.append(p_data,div_params);
                div.append(div_data);
                em_add.click(function() {
                    div_params.append($.div_param(datum[i].name,i));
                })
            }
            let sku_data = $("<div class='sku-param-data sku-list'>");
            const p_sku = $("<p class='param-title'>");
            const span_sku = $("<span class='title-span'>").text("sku列表");
            p_sku.append(span_sku);
            sku_data.append(p_sku);
            sku_data.append(empty_notspec("无"));
            div.append(sku_data);

            div.append($("<div class='button-goods'>").append($.pre_button()))
            l.append(div);
            if (datum.length===0){
                const s = $(".sku-param-data.sku");
                add_sku_data(s);
            }
        }
    })
}
/*没有规格参数*/
function empty_notspec(text) {
    let div_notFollow=$("<div class='notFollow'></div>");
    let span_not=$("<span class='iconfont icon-kong icon-h6'></span>");
    let div_text=$("<div class='notFollow-text'>"+text+"</div>");
    div_notFollow.append(span_not,div_text);
    return div_notFollow;
}
/*判断是否需要对步骤界面更新*/
function spu_param(l,n) {
    let id= $("#goods_category").attr("data-category");
    if (id!=null) {
        if (id!=cid_3||l.children().length===0||id != cid_4){
            l.empty();
            if (n === 3) {
                cid_3=id;
                $.ajax_class_3(l,id);
            }else if (n ===4){
                cid_4=id
                $.ajax_class_4(l,id);
            }
        }
    }else {
        l.empty();
    }
}
//字数限制和显示
function limit(t){
	let a = t.val().length;
	t.nextAll().children().eq(0).text(a);
}


//添加商品显示列表
$.goods_info = function () {
    let goods_info= $("<div class='goods-info'>");
    goods_info.append($.add_goods_list())
    return goods_info;
}
$.add_table_goods_list = function () {
    let table = $("<table class='table-goods-list'>");
    let table_header = $("<thead class='goods-list-header'>");
    let header_tr = $("<tr class='list-tr'>");
    let tr_1 = $.table_td_checked("th","goods_choice");
    let tr_2 = $.table_th_title("id");
    let tr_3 = $.table_th_title("商品名称");
    let tr_4 = $.table_th_title("分类");
    let tr_5 = $.table_th_title("操作");
    header_tr.append(tr_1,tr_2,tr_3,tr_4,tr_5);
    table_header.append(header_tr);
    table.append(table_header);
    return table;
}
$.add_page_goods = function () {
    let div_page = $("<div class='page-goods'>");
    let div_page_g = $("<div class='page-goods-Jump'>");
    let span_t = $("<span class='rows-page'>").text("当前页码：");
    let select_div = $("<div class='select-page-div'>");
    let select = $("<select class='page'>");
    select_div.append(select)
    div_page_g.append(span_t,select_div);

    let div_page_c = $("<div class='page-goods-in'>");
    let p_rows_count=$("<p class='count_rows'>");
    let p_span_rows=$("<span class='rows_goods'>").text(0);
    let span_row_now=$("<span class='rows_goods'>").text("0-0");
    p_rows_count.append("共",p_span_rows,"条,当前：",span_row_now,"条");
    div_page_c.append(p_rows_count)

    let div_page_np = $("<div class='page-goods-np'>");
    let div_prev=$("<div class='page-np' id='prev'>");
    let prev_em=$("<em class='iconfont icon-arrow-left'>");
    div_prev.append(prev_em);
    let div_next=$("<div class='page-np' id='next'>");
    let next_em=$("<em class='iconfont icon-arrow-right'>");
    div_next.append(next_em);
    div_page_np.append(div_prev,div_next);
    div_page.append(div_page_g,div_page_c,div_page_np);
    return div_page;
}

$.add_goods_list = function () {
    let div = $("<div class='goods-content'>");
    let goods_list=$("<div class='goods-list'>");
    let goods_page_Controller = $("<div class='goods_pages'>");
    goods_list.append($.add_table_goods_list());
    goods_page_Controller.append(($.add_page_goods()))
    div.append(goods_list,goods_page_Controller);
    div.ready(function (){
        /*第几页，一页多少条*/
        $.pages_goods(1,6);
        sessionStorage.setItem('row',6);
        $("select.page").change(function (){
            let page = $("select.page option:selected").val();
            $.pages_goods(page,sessionStorage.row);
        })
        $("#prev").click(function() {
            if (!$(this).hasClass("disabled")){
                $.pages_goods(Number(sessionStorage.page)-1,sessionStorage.row)
            }
        })
        $("#next").click(function() {
            if (!$(this).hasClass("disabled")){
                $.pages_goods(Number(sessionStorage.page)+1,sessionStorage.row)
            }
        })

    })
    return div;
}
/*显示商品*/
$.pages_goods = function (page, row,search,saleable) {
    let j = new Object();
    j.page=page;
    j.row=row;
    j["search"]=search;
    j.saleable=saleable;
    $(".table-goods-list").find("tbody").remove();
    $.ajax({
        url:"goods/page",
        data:j,
        async:true,
        contentType :"application/json",
        success:function (result) {
            if (result.code===200){
                sessionStorage.setItem('page',result.data.pageNum);
                let page_list=$(".page-goods")
                let jump = page_list.children(".page-goods-Jump");
                jump.find("select.page").empty();
                for (let i = 1; i <= result.data.pages;i++){
                    let option = $("<option value='"+i+"'>").text(i);
                    if (i===result.data.pageNum){
                        option.attr("selected",true)
                    }
                    jump.find("select.page").append(option);
                }
                let page_goods=page_list.children(".page-goods-in");
                page_goods.find("span").eq(0).text(result.data.total);
                page_goods.find("span").eq(1).text(result.data.rowSize);

                if (result.data.pageNum ===1){
                    $("#prev").addClass("disabled");
                }else if(result.data.pageNum ===result.data.pages) {
                    $("#next").addClass("disabled");
                    $("#prev").removeClass("disabled");
                }else {
                    $("#prev").removeClass("disabled");
                    $("#next").removeClass("disabled");
                }
                let tbody = $("<tbody class='goods-listbody'>");
                for (const list of result.data.list) {
                    let tr=$("<tr class='list-tr goods'>");
                    let td_1=$.table_td_checked("td","goods_choice");
                    let td_2=$.table_td(list.goodsSpu.spuId);
                    let td_3=$.table_td(list.goodsSpu.goodsName);
                    let td_4=$.table_td(list.cid);
                    let td_5=$("<td>");
                    let div = $("<div class='span-goods-operation'>");
                    let span_1 = $("<span class='iconfont icon-editor'>");
                    let span_2 = $("<span class='iconfont icon-delete'>");
                    let span_3 = $("<span class='Enabled'>");
                    if (list.goodsSpu.goodsIsEnabled===0) {
                        span_3.text("上架");
                    }else {
                        span_3.text("下架");
                    }
                    div.append(span_1,span_2,span_3)
                    td_5.append(div);
                    tr.append(td_1,td_2,td_3,td_4,td_5);
                    tbody.append(tr);
                }
                $(".table-goods-list").append(tbody);
            }
        }
    })
}