var express = require('express');//node的一个框架 就是相当于jquery
var path = require('path');
var request = require('./request.js');
var ejs = require('ejs');// 后台模板库
var wechat = require('wechat');//第三方处理微信推送的库
var https = require('https');// node 端 请求别的服务的模块
var sign = require('./sign');//微信提供的签名工具
var app = express();
 
app.set('views', './views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

/*------------新增方法--------------*/



app.use(express.static(path.join(__dirname, 'assets')));
//发送请求
app.get('/index', function (req, res) {
   res.render('index');
});
//处理URL 验证的 微信服务器要通过get请求来测试的
app.get('/weixin', wechat('wechat',function (req, res, next) { 
    console.log('true');
}))
//处理后台获取签名的请求
app.post('/getSignature', function (req, res) {
	var token = 'wechat',
	appsecret = '5e7dbfd43fce0af4671f0a0e61fe665a', //你申请的密匙
	APPID ='wx42b6b1e2e9bc0ea4',//你申请的id
	url = 'http://9b780b03.ngrok.io/index'//JS接口安全域名 参与签名用的
	Res = res;
//发送https get请求 获取 access_token;
https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx42b6b1e2e9bc0ea4&secret=5e7dbfd43fce0af4671f0a0e61fe665a", function(res) {  
        var datas = [];  
        var size = 0;
        res.on('data', function (data) {  
            datas.push(data);  
            size += data.length;
        });  
        res.on("end", function () {  
            var buff = Buffer.concat(datas, size);  
            var result = buff.toString();
            //console.log(JSON.parse(result).access_token);
      // 获取 jsapi_ticket //异步嵌套是不合理的 不推荐这样 使用promise
      https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+JSON.parse(result).access_token+'&type=jsapi',function(res){
			    var datas = [];  
		        var size = 0;
		        res.on('data', function (data) {  
		            datas.push(data);  
		            size += data.length;
		        });  
			    res.on('end',function(){
					var buff = Buffer.concat(datas, size);  
					var rlt = buff.toString();
          var config = sign(JSON.parse(rlt).ticket,url);
					console.log(config);
					Res.json(config);
			   });

            }).on('error',function(e){
            	console.log("Got error: " + e.message); 
            })
            
            
        });  
    
}).on('error', function(e) { 
    console.log("Got error: " + e.message); 
});

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});