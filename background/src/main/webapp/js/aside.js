!function (e,t) {
	var links = document.getElementsByClassName("aside-links");
	var headers = document.getElementsByClassName("aside-sub-headers");
	var a = document.getElementsByTagName("a");
	var lis = new Array();
	for(var i = 0 ; i<links.length;i++){
		for(var j = 0 ;j<a.length;j++){
			if(links[i]==a[j]){
				lis.push(links[i]);
			}
		}
	}
	var id_one = document.getElementById("top-one");
	var id_two = document.getElementById("top-two");
	var parent = document.getElementsByClassName("main-content")[0];
	//clear_parent(id_two,parent);
	lis.forEach(function(val,index,lis){
		var ll = val.nextElementSibling;
		lis[0].classList.add("active");
		lis[0].nextElementSibling.style.display="block";
		lis[0].nextElementSibling.firstElementChild.firstElementChild.classList.add("active");
		val.addEventListener("click",lis_click,false);
		function lis_click(){
			var s=0;
			if (ll == null) {
				var ss = val.parentElement.parentElement.previousElementSibling;
				for (var i = 0;i<lis.length;i++) {
					lis[i].classList.remove("active");
				}
				ss.classList.add("active");
				id_one.innerHTML = ss.innerHTML;
				id_two.innerHTML = val.innerHTML;
			}else{
				for (var i = 0;i<lis.length;i++) {
					lis[i].classList.remove("active");
				}
				for(var i = 0 ;i<headers.length;i++){
					headers[i].style.display="none";
				}
				ll.style.display="block";
				ll.firstElementChild.firstElementChild.classList.add("active");
				id_one.innerHTML = val.innerHTML;
				id_two.innerHTML = ll.firstElementChild.firstElementChild.innerHTML;
			}
			val.classList.add("active");
			//clear_parent(id_two,parent);
		}
	});
}();

function clear_parent(id_two,parent) {
	if (id_two.innerHTML==="分类管理"){
		if (parent.firstElementChild!==null){
			parent.firstElementChild.remove();
		}
		parent.append(ajax_category());
	}
	if (id_two.innerHTML==="规格参数"){
		if (parent.firstElementChild!==null){
			parent.firstElementChild.remove();
		}
	}
	if (id_two.innerHTML==="商品列表"){
		if (parent.firstElementChild!==null){
			parent.firstElementChild.remove();
		}
	}
	if (id_two.innerHTML==="进行中的订单"){
		if (parent.firstElementChild!==null){
			parent.firstElementChild.remove();
		}
	}
	if (id_two.innerHTML==="已完成的订单"){
		if (parent.firstElementChild!==null){
			parent.firstElementChild.remove();
		}
	}
	if (id_two.innerHTML==="用户管理"){
		if (parent.firstElementChild!==null){
			parent.firstElementChild.remove();
		}
	}
}

function ajax_category() {
	var ul = document.createElement("ul");
	ul.classList.add("main-category-one");
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200){
			var ret = request.responseText;
			var json = eval(ret);
			for (var i = 0;i<json.length;i++){
				var li_1 = creat_li();
				li_1.classList.add("one");
				var p_1 = creat_p(json[i]);
				li_1.append(p_1);
				if (json[i].categorySet.length!==0){
					var ul_2 = document.createElement("ul");
					ul_2.classList.add("main-category-two");
					for (var j = 0;j<json[i].categorySet.length;j++){
						var li_2 = creat_li();
						li_2.classList.add("two");
						var p_2 = creat_p(json[i].categorySet[j]);
						li_2.append(p_2);
						if (json[i].categorySet[j].categorySet.length!==0){
							var ul_3 = document.createElement("ul");
							ul_3.classList.add("main-category-three");
							for (var k = 0;k<json[i].categorySet[j].categorySet.length;k++){
								var li_3 = creat_li();
								li_3.classList.add("three");
								var p_3 = creat_p(json[i].categorySet[j].categorySet[k]);
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
	};
	request.open("post","main.do",true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("p=category");
	return ul;
}

$(".main-content").on("click",".one",function () {
	$(".main-category-two").css("display","none");
	$(this).children().eq(1).css("display","block");
});
$(".main-content").on("click",".two",function () {
	$(".main-category-three").css("display","none");
	$(this).children().eq(1).css("display","block");
});


function creat_li() {
	var li = document.createElement("li");
	li.classList.add("main-content-group");
	return li;
}

function creat_p(e) {
	var p = document.createElement("p");
	p.classList.add("group-p");
	var span = document.createElement("span");
	span.innerHTML = e.categoryName;
	span.setAttribute("data-index",e.categoryId);
	var span_1 = document.createElement("span");
	span_1.classList.add("category-editor");
	span_1.innerHTML = "编辑";
	var span_2 = document.createElement("span");
	span_2.classList.add("category-add");
	span_2.innerHTML = "添加";
	p.append(span,span_1,span_2);
	return p;
}

