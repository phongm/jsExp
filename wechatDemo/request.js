var http = require("http"),
	querystring = require("querystring")

var request = {
	send:function(host,path, method, data, callback, error){
		var postData = querystring.stringify(data),
			req = http.request({
				hostname: host,
				path: path,
				method: method,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Cache-Control": "no-cache"
				}
			}, function (res) {  
			console.log("状态码："+res.statusCode);
	        if (res.statusCode == 200) {  
	            var body = ""; 
	            res.setEncoding('utf8');          
	            res.on('data', function (data) { body += data; });
	            res.on('end', function () {	
	            	//console.log("返回结果："+body);
	            	var isJson = body.indexOf("code");
	                if(isJson>=0){
	                	var obj=JSON.parse(body);
	                	callback(obj.data,obj.code);
	                }else{
	                	error&&error("服务器错误！");
	                }
	            });
	        }else{
	        	//res.send(404, 'Sorry, we cannot find that!');
	            //res.send(500, { error: 'something blew up' });
	            error&&error(res.statusCode);
	        }  
	    }); 
	    req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
		req.write(postData);
		req.end();
	}
};

module.exports = request;
