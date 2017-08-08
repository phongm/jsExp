/*var options={
	method:'get',//不传默认为get
	url:
	isAsync: 	//不传默认为true
	data:{},
	header:{},
	success:
	error:
}*/

function ajax(options){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	var method = options.method.toLowerCase() || 'get';
/*	if(!options.method){
		options.method = 'get';
	}*/
	//var isAsync = options.isAsync || true;	//如果options.isAsync=false就会出错，会选择true
	var isAsync = (typeof options.isAsync) == "boolean"?options.method:true;
	/*if(!(typeof options.isAsync=='boolean')){
		options.isAsync = true;
	}*/
	//处理URL(首先要判断请求方式为get还是post,并且要处理传送过来的data对象---将其转化为a=b&c=d这种格式)
	if(method=='get' && options.data){
		options.url += '?t='+ new Date().getTime() +　'&'+ urlParamHanddle(options.data);
	}else{
		options.url += '?t=' + new Date().getTime();
	}
	//打开与服务器的连接
	xhr.open(method,options.url,isAsync);
	//发送数据
	if(method=='get'){
		if(options.header){
			xhr.setRequestHeader("apikey",options.header.apikey);
			xhr.send();
		}else{
			xhr.send();	
		}
	}else{
		//设置请求头
		xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded');
		xhr.send(urlParamHanddle(options.data));
	}
	//接收返回的数据
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				options.success && options.success(xhr.responseText);
			}else{
				options.error && options.error(xhr);
			}
		}
	}
}

//封装处理从外面传进来的data数据的函数
function urlParamHanddle(obj){
	var arr = [];
	var param = "";
	for(var key in obj){
		arr.push(encodeURIComponent(key)+'='+encodeURIComponent(obj[key]));
	}
	return param = arr.join('&');
}
