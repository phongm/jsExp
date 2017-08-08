// #id
// .class
// tagName
// 根据 id、类名、标签名查找元素
function $(param, obj){ // "#box"   ".style"    "div"
	obj = obj || document;
	if (param.indexOf("#") === 0) // id
		return document.getElementById(param.substring(1));
	if (param.indexOf(".") === 0) // class
		return getByClass(param.substring(1), obj);
	return obj.getElementsByTagName(param); // tag
}

// 根据类名查找元素
function getByClass(className, obj) {
	obj = obj || document;
	if (obj.getElementsByClassName)
		return obj.getElementsByClassName(className);

	// 保存根据类名查找到的 DOM 元素的数组
	var result = [];
	// 查找出所有的DOM元素
	var objs = obj.getElementsByTagName("*");
	// 遍历所有的 DOM 元素
	for (var i = 0, len = objs.length; i < len; i++) {
		// 获取到当前遍历的 DOM 元素所使用的所有类名
		var classNames = objs[i].className.split(" ");
		// 遍历所有的类名
		for (var j = 0, length = classNames.length; j < length; j++) {
			if (classNames[j] === className) { // 说明当前遍历的 DOM 元素使用过 className 的类样式
				result.push(objs[i]);
				break;
			} 
		}
	}
	// 返回查找到的 DOM 元素数组
	return result;
}

// 获取指定的 element 元素 CSS 中的 attr 属性值
function getStyle(element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}

// 缓冲运动
/*
	{
		width : 100,
		height: 300,
		opacity : 80,
	}
*/
function ease(element, target, fn) {
	// 首先将在 element 元素上已有的计时器停止
	clearInterval(element.timer);
	// 重新启动计时器，实现动画
	element.timer = setInterval(function(){
		// 标记是否应该停止计时器
		var clear = true;
		// 循环遍历 target 对象中各目标属性
		for (var attr in target) {
			// 获取 attr 属性的当前值
			var curr = getStyle(element, attr); 
			curr = parseInt(attr === "opacity" ? curr * 100 : curr) || 0;
			// 判断是否到达目标值
			if (curr === target[attr]) { // 说明当前的属性运动到达目标值
				continue;
			}
			clear = false; // 说明至少还有一个属性未到达目标值，标记计时器不能取消
			// 计算运动速度
			var speed = (target[attr] - curr) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			// 当前运动一次后的 CSS 属性值
			curr += speed;
			// 设置 element 元素的 CSS 属性
			element.style[attr] = attr === "opacity" ? curr / 100 : curr + "px";
			if (attr === "opacity")
				element.style.filter = "alpha(opacity="+curr+")";
		}

		if (clear) { // 停止计时器
			clearInterval(element.timer);
			fn && fn(); // 在运动结束后要执行的函数
		}
	}, 10);
}

// 线性运动：能够控制运动时间
function animate(element, target, speed, fn) {
	speed = speed || 400;
	// 停止 element 元素上已有的运动
	clearInterval(element.timer);
	// start : 保存各属性的运动初始值; range : 各属性运动的区间值; startTime : 开始时间
	var start = {}, range = {}, startTime = +new Date();
	// 初始化start 与 range
	for (var attr in target) {
		start[attr] = parseInt(getStyle(element, attr)) || 0;
		range[attr] = target[attr] - start[attr];
	}

	// 运动
	element.timer = setInterval(function(){
		// 计算时间差（运动了多少时间了）
		var elapse = Math.min(+new Date() - startTime, speed);
		// 遍历 target 所有属性
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

// 淡入
function fadeIn(element, speed, fn) {
	animate(element, {"opacity":1}, speed, fn);
}

// 淡出
function fadeOut(element, speed, fn) {
	animate(element, {"opacity":0}, speed, fn);
}

/*
	options = {
		url : "http://xxxx.com/xxx.php", // 请求资源路径
		type : "get", // 请求方式
		async : true, // 是否异步
		data : {username:"", password:""}, // 请求参数
		headers : {}, // 请求头信息
		dataType : "json", // 预期返回值的数据类型 json text
		success : function(data){}, // 成功时执行的回调函数，data表示返回的数据
		complete : function(xhr) {}, // 无论成功/失败都会执行的回调函数
		error : function(xhr) {} // 错误时执行的回调函数
	}
*/
function ajax(options) {
	// 创建核心对象
	var xhr;
	if (window.XMLHttpRequest)
		xhr = new XMLHttpRequest();
	else
		xhr = new ActiveXObject("Microsoft.XMLHTTP");

	var method = options.type || "get", // 请求方式
		async = options.async || true, // 是否异步
		param = null; // 连接的请求参数

	// 处理连接的请求参数
	if (options.data) {
		param = "";
		for (var name in options.data) {
			param += name + "=" + options.data[name] + "&";
		}
		param = param.substring(0, param.length - 1);
	}

	// 判断请求类型如果为 get 则处理 url
	if (method === "get" && param) {
		options.url += "?" + param;
		param = null;
	}

	// 建立连接
	xhr.open(method, options.url, async);

	// 设置请求头信息
	if (method === "post") {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	} 
	if (options.headers) {
		for (var name in options.headers) {
			xhr.setRequestHeader(name, options.headers[name]);
		}
	}
	// 发起请求
	xhr.send(param);
	// 处理回调
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) { 
			if (xhr.status === 200) { // OK
				var data = xhr.responseText;
				if (options.dataType === "json") // 预期返回 json 对象
					data = JSON.parse(data);
				options.success && options.success(data); // 成功
			} else {
				options.error && options.error(xhr); // 失败
			}
			options.complete && options.complete(xhr); // 不管成功/失败都会执行的函数
		}
	}
}

// GET请求
function get(url, data, fn, type) {
	ajax({
		"url" : url,
		"type" : "get",
		"data" : data,
		"success" : fn,
		"dataType" : type
	});
}

// POST 请求
function post(url, data, fn, type) {
	ajax({
		"url" : url,
		"type" : "post",
		"data" : data,
		"success" : fn,
		"dataType" : type
	});
}

// 保存 cookie
// {expires:7,path:"/",domain:"",secure:true}
// key=value;expires=xxxxx;path=/;domain=xxxx;secure
function setCookie (key, value, options) {
	// 最基本的键值对
	var str = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 失效时间
	if (options.expires) {
		var expires = options.expires;
		if (typeof expires === "number") { // 失效时间传递的是一个数字
			expires = new Date(); // 当前本地日期时间对象
			expires.setDate(expires.getDate() + options.expires); // 计算失效时间
		}
		str += ";expires=" + expires.toUTCString();
	}
	// 路径
	if (options.path)
		str += ";path=" + options.path;
	// 域名
	if (options.domain)
		str += ";domain=" + options.domain;
	// 安全
	if (options.secure)
		str += ";secure";
	// 保存 cookie 
	document.cookie = str;
}

// 根据 key 获取 cookie 值
function getCookie(key) {
	// 获取所有的 cookie
	var cookies = document.cookie.split("; ");
	// 遍历
	for (var i = 0, len = cookies.length; i < len; i++) {
		// 用 = 将 key=value 分隔， = 号前的为 key ，= 号后的为 value
		var cookie = cookies[i].split("=");
		if (decodeURIComponent(cookie[0]) === key) 
			return decodeURIComponent(cookie[1]);
	}
	return null;
}

// 移除 cookie
function removeCookie(key, options) {
	options.expires = -1;
	setCookie(key, "", options);
}