/* prolist */

var myScroll;
var navScroll;

$(function(){
	load();
	getData(5, 10);
	addNavScroll();
	getIconData();
	myScroll.on("scrollStart", function(){
		//无效果代码
	});
	
});
	//默认iscroll阻止
	$("#wrapper")[0].addEventListener("touchmove", function(e){
		e.preventDefault();
	}, true);

	//触摸结束后出发此事件
	$("#wrapper").on("touchend", function(){
		if(myScroll.y > 0){
			//实际上的刷新
			$("#scrollBox").html("");
		}
		if(myScroll.y < myScroll.maxScrollY - 50){
			//原来的基础上追加
			getData(5, 5);
		}
	});


function load(){
	myScroll = new IScroll("#wrapper", {
		mouseWheel : true,
		scrollbars : true,
		//静止拖动滚动条滚动
		interactiveScrollbars : false
	});
}


function getData(row, num){
	$("#loading").show();
	$.ajax({
		type : "get",          //默认请求方式就是get
		dataType : "jsonp",
		url : "http://datainfo.duapp.com/shopdata/getGoods.php",
		data : {classID : row, linenumber : num},
		success : function(data){
			$("#loading").hide();
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
			}
		}

	});
}

function getIconData(){
	var navWidth = 0;
	$.ajax({
		url : "http://datainfo.duapp.com/shopdata/getclass.php",
		success : function(data){
			var thisdata = JSON.parse(data);
			var $navs = $("#main_nav");
			// var $group = $("<div class='iconfontGroup' id='iconfontGroup'>");
			 var $group = $("#iconfontGroup");
			$.each(thisdata, function(index){	
				navWidth += 50;
				var $icons = $("<i class='iconfont iconbox'>"+thisdata[index].icon+"</i>");
				// $("#title").text(thisdata[index].className);
				$group.append($icons);
				// $navs.append($group);

				//绑定事件
				$icons.on("click" , function(){
					$("#scrollBox").html("");
					$("#title").text(thisdata[index].className);
					getData(thisdata[index].classID, 5);
				});
			});
			$group.width(navWidth);
			navScroll.refresh();
		}
	});
}

function addNavScroll(){
	navScroll = new IScroll("#main_nav", {
		// mouseWheel : true,
		// scrollbars : true,
		// scrollY : false,
		scrollX : true,
		click : true
	});
}





















