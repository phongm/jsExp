var myScroll,navscroll;
$(function (){
	 load();

	 getData();
	 navScroll();
	 getIcondata();
	 
	//下来刷新
     myScroll.on("scrollStart",function(){
	 //获取下拉的高度
	  console.log(myScroll.y); 
    }); 
    
   //去掉默认的touch事件,
   document.addEventListener("touchmove",function(e){
   	 e.preventDefault();
   },false);
    //触摸结束触发此事件
    $("#wrapper").on("touchend",function(){
    	 if(myScroll.y>0){
    	 	//console.log("上拉刷新");
    	 	//window.reload(true);
    	 	//刷新本页，出现一个loading的图片等待
    	 	$("#scrollBox").html("");
    	 	getData(0,1)
    	 }
    	 if(myScroll.y<myScroll.maxScrollY-50){
    	 
    	 	var num = $("#num").val();
    	 		console.log(num);
    	 	getData(num++,0);
    	 	$("#num").val(num++);
    	 }
    });
});

function load(){
	myScroll = new IScroll("#wrapper",{
		 mouseWheel:true,
		 scrollbars:true,
		 //禁止控制滚动条滚动
		 interactivScrollbars:false
	});
}
 
function navScroll(){

	 navscroll = new IScroll("#main_nav",{
		scrollX:true,
		click:true
		
	});
		
}
function getData(page){
	$("#loading").show();
	$.ajax({
		type:"get",//ajax下默认请求格式是get，即该句话可以省略
		dataType:"jsonp",//请求jsonp数据，jQuery自动把数据转换为json数据，供用户使用
		url:" http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		data:{
			classID:page
		},
		success:function(data){
			$("#loading").hide();
			if(data.length){
				
				//for(var i=0,len=data.length;i<len;i++)
				//each有性能损耗
				var $scrollBox = $("#scrollBox");
				$.each(data,function(index){
					//获取实时拍摄图片
					//var json = JSON.parse(data[index].imgsUrl);//是一个字符串，转换为json格式数据
					//console.log(json);
					//console.log(data[index].discount);//打折商品
					//拼接字符串
					var 
					     $probox = $("<div class='prodbox'>"),
					     imgBox = $("<div class='imgBox'>图片加载中.....</div>"),
					     thisImg = $("<img  src='" +data[index].goodsListImg+ "'/>"),
					     prodname = $("<div class='prodname'>"+data[index].goodsName+"</div>"),
					     priceBox= $("<div class='priceBox'>"+data[index].price+"</div>");
					     
					     $probox.append(imgBox);
					     $probox.append(prodname);
					     $probox.append(priceBox);
					     //加载时需要刷新iscroll
					    thisImg.on("load",function(){
					    	myScroll.refresh();
					    	imgBox.html("");
					    	imgBox.append(thisImg);
					    });
					    $scrollBox.append($probox);
					     
					
				});
			}
		}
	});
}

function getIcondata(){
	var navWidth = 0;
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		success:function (data){
			var thisData = JSON.parse(data);
			var $main_nav = $("#main_nav");
			var $group = $("#iconfontGroup");
			$.each(thisData, function(index,element) {
				    navWidth += 50;
	          		var	$icons = $("<i class='iconfont iconbox'> "+ thisData[index].icon+" </i>");
	          		//$("#title").text(thisData[index].className);
	          		$group.append($icons);
	          		$icons.on("click",function (){
	          			$("#scrollBox").html("");
	          			$("#title").text(element.className);
	          			getData(thisData[index].classID);
	          		});
			});
			
			$group.width(navWidth);
			 navscroll.refresh();
		}
	});
}