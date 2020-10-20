window.onload=function(){
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
			}else{
				for (var i = 0;i<lis.length;i++) {
					lis[i].classList.remove("active");
				}
				for(var i = 0 ;i<headers.length;i++){
					headers[i].style.display="none";
				}
				ll.style.display="block";
				ll.firstElementChild.firstElementChild.classList.add("active");
			}	
			val.classList.add("active");
		}
	});
}
