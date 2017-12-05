
//获取DOM元素节点
//#id
//.class
//tagName
function $(param, obj){
	var obj = obj || document;
	if(param.indexOf("#") === 0) //id
		return document.getElementById(param.substring(1));
	if(param.indexOf(".") === 0) //class
		return document.getByClass(param.substring(1), obj);
	return obj.getElementsByTagName(param); //tagName
}

//根据类名查找元素
function getByClass(className, obj){
	var obj = obj || document;
	if(obj.getElementsByClassName)
		return obj.getElementsByClassName(className);
	//查找所有的DOM元素
	var aAll = obj.getElementsByTagName("*");
	//保存目标类名的数组
	var aTarget = [];
	for(var i = 0,len = aAll.length; i < len; i++){
		//缓存一个类的  所有类名
		var aClassName = aAll[i].className.split(" ");
		//遍历类名数组中的类名
		for(var j = 0, len = aClassName.length; j < len; j++){
			if(aClassName[j] === className){
				aTarget.push(aAll[i]);
			}
		}
		return aTarget;	
	}
}
//直线运动
function animate(element, target, speed, fn){
	speed  = speed || 500;
	//停止element元素上已有的运动
	clearInterval(element.timer);
	//start: 保存各属性的运动初始值
	//range: 保存各属性运动的区间值
	var start = {}, range = {}, startTime = +new Date();
	//初始化
	for(var attr in target){
		start[attr] = parseInt(getStyle(element, attr));
		range[attr] = target[attr] - start[attr];
	}
	//运动
	element.timer = setInterval(function(){
		//计算时间只差（运动了多少时间）
		var elapse = Math.min(+new Date() - startTime, 3000);
		//计算速度 (range / 总时间 * 运动了的时间 + 初始值)
		//遍历 target 所有属性
		for (var attr in target) {
			var result = range[attr] / speed * elapse + start[attr]; // 计算运动值
			element.style[attr] = attr === "opacity" ? result : result + "px";
			if (attr === "opacity")
				element.style.filter = "alpha(opacity="+parseInt(result * 100)+")";
		}
		// 运动结束则停止计时
		if (elapse === speed){
			clearInterval(element.timer);
			fn && fn();
		}
	}, 10);
}
// cookie 相关操作
/**
	* 添加/修改COOKIE函数
	* key name
	* value 值
	* iDay 设置过期时间(以天为单位)
	* path 设置路径
*/
function setCookie(key, value, iDay, path) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + oDate + ';path=' + path;
}
/**
	* 封装查询COOKIE函数
	* key 要查询的name
*/
function getCookie(key) {
	var aCookie = document.cookie.split('; '); // 对cookie进行分组
	var oCookie = {};  // 存储切割完以后的cookie数据
	for(var i =0; i < aCookie.length; i++) {
		var aTemp = aCookie[i].split('=');
		oCookie[aTemp[0]] = aTemp[1];
	}
	return decodeURIComponent(oCookie[key]);
}

/**
	* 删除COOKIE
	* key 要删除的name
	* path 指定删除的路径
*/
function removeCookie(key, path) {
	document.cookie = key + '=;expires=-1;path=' + path;
}
// 拖拽
/**
	* 拖拽效果
	* oDragObj 拖拽目标
	* oDragBox 移动目标
*/
function drag(oDragObj, oDragBox, fn) {
	oDragObj.onmousedown = function (ev) {
		var ev = ev || window.event;

		// 存储鼠标落点时的位置
		var iInitClientX = ev.clientX;
		var iInitClientY = ev.clientY;

		// 存储鼠标落点时到box左和上的距离。
		var iL = iInitClientX - oDragBox.offsetLeft;
		var iT = iInitClientY - oDragBox.offsetTop;

		// 元素捕获 (ie)
		var oThis = this;
		if(oThis.setCapture) {
			oThis.setCapture();
		}

		document.onmousemove = function (ev) {
			var ev = ev || window.event;

			var iMoveClientX = ev.clientX - iL;
			var iMoveClientY = ev.clientY - iT;

			// 往右做限制
			if(iMoveClientX > document.documentElement.clientWidth - oDragBox.offsetWidth) {
				iMoveClientX = document.documentElement.clientWidth - oDragBox.offsetWidth;
			}
			oDragBox.style.left = iMoveClientX + 'px';
			oDragBox.style.top  = iMoveClientY + 'px';
		}
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup  = null;

			// 兼容IE
			if(oThis.releaseCapture) {
				oThis.releaseCapture();
			}

			// 执行回调函数
			if(fn) {
				fn();
			}
		}
		return false;
	}
}
// 缓冲运动
function bufferMove(obj,oAttr,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//定义全部结束标志，默认全部结束
		var bBtn = true;
		//遍历目标对象属性
		for(var sAttr in oAttr)
		{
			//如果是透明度opacity
			if(sAttr === "opacity")
			{
				
				var iCur = parseFloat(getStyle(obj,sAttr)*100);
			}
			else
			{
				//获取当前目标对象属性的值
				var iCur = parseInt(getStyle(obj,sAttr));
			}
			//获取当前平分的速度
			var iSpeed = (oAttr[sAttr] - iCur) / 10;
			
			//判断是否到达边界						
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) :  Math.floor(iSpeed);
			
			//执行一次之后的位置
			var iNow = iCur + iSpeed;
			
			//如果是透明度，计算方式不一样
			if(sAttr === "opacity")
			{
				obj.style.filter = "alpha(opacity=" + iNow + ")";
				obj.style.opacity = iNow / 100;
			}
			else
			{
				//对象执行一次位移
				obj.style[sAttr] = iNow + "px";
			}
			
			//临界判断
			if(iNow !== oAttr[sAttr])
			{
				bBtn = false;
			}
		}
		if(bBtn)
		{
			clearInterval(obj.timer);
			fn && fn();
		}
	
	},30);
}


//AJAX
/*
	options{
		url : "http://xxxx.com / xxx.php",//请求资源
		type : "get/post", //请求方式
		async : true/false,  //是否异步
		data : {username:"",password:""} //请求参数
		headers:{},  //请求表头
		datatype : "json", //预期返回值的数据类型 json/text
		success : function(){}, //成功是执行的回调函数， data表示返回的数据
		complete : function(xhr){}, // 无论成功或者失败都会执行的回调函数
		error:function(){}   //错误时执行的回调函数
	}
*/
function ajax(options){
	//创建xhr核心对象
	var xhr;
	if(window.XMLHttpRequest)
			xhr = new XMLHttpRequest();
	else
			xhr = new ActiveXObject("Microsoft.XMLHttp");
	var 
		method = options.type || "get",  //获取请求方式
		async = options.async || true,   //获取是否异步
		param = null;   				 //连接的请求参数
		
	//处理连接的请求参数
	if(options.data){
		param = "";
		for(var name in options.data){
			param += name + "=" + options.data[name] + "&"
		}
		param = param.substring(0, param.length-1);
	}
	//判断请求类型 如果为get 则处理url
	if(method === "get" && param){
		options.url += "?" + param;
		param = null;
	}
	
	//建立连接
	xhr.open(method, options.url, async);
	
	//设置请求头信息
	if(method === "post"){
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  //百分号编码格式			
	}
	if(options.headers){
		for(var name in options.headers){
			xhr.setRequestHeader(name, options.headers[name]);
		}
	}
	
	//发起请求
	xhr.send(param);
	
	//处理回调
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){  //OK
				var data = xhr.responseText;
				if(options.datatype === "json")  //预期返回JSON对象
						data = JSON.parse(data);
				//执行传入的success回调函数
				options.success && options.success(data);
			}else{
				options.error && options.error(xhr);
			}
			options.complete && options.complete(xhr);
		}
	}
}

function get(url, data, fn, type){
	ajax({
		"url"      : url,
		"type"     : "get",
		"data"     : data,
		"success"  : fn,
		"datatype" : type
	});
}

function post(url, data, fn, type){
	ajax({
		"url"      : url,
		"type"     : "post",
		"data"     : data,
		"success"  : fn,
		"datatype" : type
	});
}













