!function (e,t) {
	$.ajaxSetup({
		contentType:'application/json',
		dataType : "json",
	})
	const id_one = $("#top-one");
	const id_two = $("#top-two");
	const parent = $(".main-content").eq(0);
	clear_parent(id_two,parent);
	const links= $("a.aside-links");
	links.removeClass("active");
	links.eq(0).addClass("active");
	links.eq(0).next().css("display","block");
	links.eq(1).addClass("active");
	$("#aside").on("click","a",function () {
		$("#aside a").removeClass("active");
		$(this).addClass("active");
		if ($(this).next().length === 0){
			const ss = $(this).parent().parent().prev();
			ss.addClass("active");
			id_one.html(ss.html());
			id_two.html($(this).html());
		}else {
			$(".aside-sub-headers").css("display","none");
			$(this).next().css("display","block");
			$(this).next().children().eq(0).children().eq(0).addClass("active");
			id_one.html($(this).html());
			id_two.html($(this).next().children().eq(0).children().eq(0).html());
		}
		clear_parent(id_two,parent);
	});
}();
//清空显示内容，并根据左边的选择显示相应的内容
function clear_parent(id_two, parent) {
	const two = id_two.html();
	parent.empty();
	if (two==="分类管理"){
		parent.append(ajax_category(parent));
	}
	if (two==="规格参数"){
		parent.append($("<div>").addClass("sku-left"),$("<div>").addClass("sku-right"));
		parent.children().eq(0).append($("<p>").html("选择分类，查看规格参数:"),ajax_category(parent.children().eq(0)));
		parent.children().eq(1).append($("<div>").addClass("main-top"),$("<ul>").addClass("spec-ul"),$("<div>").addClass("right-footer"));
	}
	if (two==="商品列表"){
		parent.append($.goods_top(),$.goods_info())
	}
	if (two==="交易统计"){

	}
	if (two==="订单管理"){

	}
	if (two==="物流管理"){

	}
	if (two==="用户管理"){

	}
}