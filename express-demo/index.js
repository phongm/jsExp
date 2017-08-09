var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
var multer = require("multer");
app.set('port', 8080);

//制定渲染模板文件的后缀名为ejs
/* app.set("view engine", "ejs"); */

//修改模板文件的后缀名为html
app.set("view engine", "html");
//运行ejs模块
app.engine(".html", require("ejs").__express );

//设定views变量，意为视图存放的目录
app.set("views", __dirname);
//查找静态文件路径
app.use(express.static(require("path").join(__dirname, "public"))); //"public/template/"+__dirname

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer());

app.get('/', function(req, res) {
	res.render("login");
});

app.post("/login", function(req, res){
	console.log("用户名称为：" + req.body.username);
});
/*
app.get("/login", function(req, res){
	res.render("login");
});
app.get("/home", function(req, res){
	res.render("home");
});
*/


app.listen(app.get('port'), function() {
	console.log('The server is running at 8080');
});