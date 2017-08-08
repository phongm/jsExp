// 根据 #id 或 .class 或 tagName(元素名)查找元素
// param : #id|.class|tagName
// obj : 指定查找元素的祖先元素
function $(param, obj) {
	obj = obj || document;
	if (param.indexOf("#") === 0) // id
		return document.getElementById(param.slice(1));
	if (param.indexOf(".") === 0) // class
		return getByClass(param.substring(1), obj);
	return obj.getElementsByTagName(param);
}

// 根据指定类名查找元素
function getByClass(className, obj) {
	obj = obj || document;
	if (obj.getElementsByClassName) // 浏览器支持使用 getElementsByClassName
		return obj.getElementsByClassName(className);

	/* 浏览器不支持使用 getElementsByClassName */
	var result = []; // 查找到的元素集
	var tags = obj.getElementsByTagName("*"); // 获取指定节点下的所有后代元素
	for (var i = 0, len = tags.length; i < len; i++) { // 循环遍历每个 DOM 元素
		var classNames = tags[i].className.split(" "); // 获取当前遍历元素的类名
		for (var j = 0, l = classNames.length; j < l; j++) {
			if (className === classNames[j]) { // 当前元素的某个类名与要查找的类名一致，说明当前的元素是我们要找的元素，则添加到数组中保存
				result.push(tags[i]);
				break;
			}
		}
	}

	return result; // 返回查找到的所有元素
}

// 获取CSS样式属性值
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

// 保存 cookie
/* 
	key : cookie 名
	value : cookie 值
	option = { // 参数
		expires : 7, // 失效时间
		path : "/", // 路径
		domain : "127.0.0.1", // 域名
		secure : true // 安全
	}
*/
function setCookie(key, value, option) {
	option = option || {};
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value); // 基本的 key=value
	if (option.expires){ // 失效时间
		if (typeof option.expires === "number"){ // 失效时间为数字，表示失效天数
			var day = option.expires,
				exp = option.expires = new Date();
			exp.setDate(exp.getDate() + day);
		}
		cookie += ";expires=" + option.expires.toUTCString();
	}
	if (option.path) // 路径
		cookie += ";path=" + option.path;
	if (option.domain) // 域名
		cookie += ";domain=" + option.domain;
	if (option.secure) // 安全
		cookie += ";secure";
	document.cookie = cookie; // 保存 cookie
}

// 根据 cookie 名读取 cookie 值
// key : cookie 名
function getCookie(key) {
	var cookies = document.cookie.split("; "); // key=value; key=value; key=value
	for (var i = 0, len = cookies.length; i < len; i++) {
		var cookie = cookies[i].split("=");
		if (decodeURIComponent(cookie[0]) === key)
			return decodeURIComponent(cookie[1]);
	}

	return null;
}

// 根据 cookie 名删除 cookie
function removeCookie(key, option) {
	option = option || {};
	option.expires = -1;
	setCookie(key, "", option);
}

// 找出指定的元素(element)在数组(array)中的索引
// 返回查找到的索引值，查找不到，则返回 -1
function inArray(element, array){
	for (var i = 0, len = array.length; i < len; i++) {
		if (element === array[i]) // {}
			return i;
	}

	return -1;
}

// ajax 操作
/* 
	option = {
		type : "get|post", // 请求提交方式
		url : "url", // 访问资源URL
		async : true, // 是否异步
		data : {}, // 向服务器提交的数据
		headers : {}, // 设置的请求头数据
		dataType : "json|text", // 预期从服务器返回的数据类型
		success : function(data){}, // 成功时执行的函数
		error : function(xhr){}, // 失败时执行的函数
		complete : function(xhr){} // 不管成功失败都会执行的函数
	}
*/
function ajax(option) {
	option.type = option.type || "get";
	option.async = option.async || true;
	option.dataType = option.dataType || "text";
	/* 步骤 */
	var xhr;
	if (window.XMLHttpRequest)
		xhr = new XMLHttpRequest();
	else
		xhr = new ActiveXObject("Microsoft.XMLHTTP");

	var param = null;
	if (option.data) {
		param = "";
		for (var attr in option.data) {
			param += attr + "=" + option.data[attr] + "&";
		}
		if (param.length > 0)
			param = param.slice(0, param.length - 1);
	}

	if (param && option.type === "get"){
		option.url += "?" + param;
		param = null;
	}

	xhr.open(option.type, option.url, option.async);
	if (option.type === "post"){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	if (option.headers) {
		for (var attr in option.headers) {
			xhr.setRequestHeader(attr, option.headers[attr]);
		}
	}
	xhr.send(param);
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4){
			option.complete && option.complete(xhr);
			if (xhr.status === 200) {
				var retData = xhr.responseText;
				if (option.dataType === "json"){
					retData = JSON.parse(retData);
				}
				option.success && option.success(retData);
			} else {
				option.error && option.error(xhr);
			}
		}
	};
}

function get(url, data, success, dataType){
	// ....
	ajax({
		url : url,
		data : data,
		success : success,
		dataType : dataType
	});
}

function post(url, data, success, dataType){
	// ....
	ajax({
		type : "post",
		url : url,
		data : data,
		success : success,
		dataType : dataType
	});
}

// 线性运动的函数
function animate(element, target, speed, fn) {
	speed = speed || 400;
	clearInterval(element.timer);
	// 初始值，可运动范围
	var start = {}, range = {};
	for (var attr in target) {
		start[attr] = parseFloat(getStyle(element, attr)) || 0;
		range[attr] = target[attr] - start[attr];
	}
	var startTime = +new Date(); // new Date().getTime() 运动的起始时间
	// 启动计时器
	element.timer = setInterval(function(){
		var elapse = Math.min(+new Date() - startTime, speed); // 运动经过的时间
		for (var attr in target) {
			element.style[attr] = elapse * range[attr] / speed + start[attr] + (attr === "opacity" ? "" : "px");
			if (attr === "opacity"){
				element.style.filter = "alpha(opacity="+ (elapse * range[attr] / speed + start[attr]) * 100 +")";
			}
		}
		// 如果运动经过的时间和指定的 speed 一致，则说明运动结束
		if (elapse === speed){
			clearInterval(element.timer);
			fn&&fn();
		}
	}, 30);
}

// 淡入
function fadeIn(element, speed, fn) {
	element.style.display = "block"; // 暂定 block，实际还需要判断是等级还是块级元素决定
	element.style.opacity = 0;
	animate(element, {"opacity":1}, speed, fn);
}

// 淡出
function fadeOut(element, speed, fn) {
	animate(element, {"opacity":0}, speed, function(){
		element.style.display = "none";
		fn && fn();
	});
}