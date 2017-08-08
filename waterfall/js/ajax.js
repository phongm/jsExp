function ajax(type, url, async, data, fn) {
	// 第一步创建xhr对象
	if(window.ActiveXObject) {
		var xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
	} else {
		var xhr = new XMLHttpRequest();
	}

	// 处理对象格式的数据 a=b&c=d&e=f
	if(typeof data === 'object') {
		var aData = [];
		for(var sAttr in data) {
			aData.push(encodeURIComponent(sAttr) + '=' + encodeURIComponent(data[sAttr]));
		}
		data = aData.join('&');
	}

	switch(type.toUpperCase()) {
		case 'GET':
			url += '?' + data;
			break;
		case 'POST':
			break;
		default:
			console.error('您传入的传送方式不对！');
	}

	// 第二步 打开
	xhr.open(type, url, async);

	if(type.toUpperCase() === 'POST') {
		// 为POST设置请求头
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}

	// 第三步 发送数据
	xhr.send(data);

	// 第四步 接收数据

	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var oData = JSON.parse(xhr.responseText);

			// 传递给回调函数
			if(fn) {
				fn(oData);
			}
		} 
	}
}