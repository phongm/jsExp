// 通过ID获取DOM对象
function $(id) {
	return document.getElementById(id);
}
// 声明回调函数
function callback(res) {
	var sHtml = '';
	for(var i =0; i < res.s.length; i++) {
		sHtml += '<li>' + res.s[i] + '</li>';
	}
	$('search_list').innerHTML = sHtml;
}
window.onload = function () {
	var
		oSearchContent = $('search_content');
	// 输入框内容发生变化实时获取百度数据
	oSearchContent.oninput = oSearchContent.onpropertychange = function () {
		if(this.value !== '') {
			// 跨域
			var oScript = document.createElement('script');
			oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + this.value + '&json=1&p=3&req=2&cb=callback&_=' + new Date().getTime();
			document.body.appendChild(oScript);
		} else {
			$('search_list').innerHTML = '';
		}
	}
}