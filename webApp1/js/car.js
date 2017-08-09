
$(function(){

	var dateEnd = new Date().getTime();
	
	var data = localStorage.getItem("user");
	if(data && data != ""){
		getCar();
	}else{
		location.href = "../html/login.html";
	}

	function getCar(){
		$.ajax({
			type : "get",          //默认请求方式就是get
			dataType : "jsonp",
			url : "http://datainfo.duapp.com/shopdata/getCar.php",
			data : {userId : JSON.parse(data).userID},
			success : function(data){
				/*$("#loading").hide();
				if(data.length){
					var $scrollBox = $("#scrollBox");
					$.each(data, function(index){
						var $prodbox = $("<div class='prodbox'></div>");
						var imgBox = $("<div class='imgBox'></div>");
						var thisimg = $("<img src='"+data[index].goodsListImg+"' alt='图片加载中...' title='图片'>");
						var prodname = $("<div class='prodname'>" +data[index].goodsName+ "</div>");
						var priceBox = $("<div class='priceBox'>" +data[index].price+ "</div>");
						$prodbox.append(imgBox);
						$prodbox.append(prodname);
						$prodbox.append(priceBox);
						//加载时iscroll需要刷新
						thisimg.on("load", function(){
							myScroll.refresh();
							imgBox.append(thisimg);
						});
						$scrollBox.append($prodbox);
					});
				}*/
				var dom = $("#scrollBox");
				render(dom, {"goods" : data});
			}
		});
	}

	function render(dom, res){
		var html = template("goodsList", res);
		dom.html(html);
		myScroll.refresh();
	}
});
