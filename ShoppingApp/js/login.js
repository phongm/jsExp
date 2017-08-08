$(function(){
	var data = localStorage.getItem("user");
	if(data && data != ""){
		$("#login_name").val(JSON.parse(data).userID);
		$("#login_psw").val(JSON.parse(data).password);
	}
});


function login(){
	var dateLogin = new Date().getTime();
	var name = $("#login_name").val();
	var psw  = $("#login_psw").val();
	if(name == ""){
		alert("请输入用户名称");
	}else{
		if(psw == ""){
			alert("请输入密码");
		}else{
			var user = getUser(name, psw);
			toLogin(user, dateLogin);
		}
	}

}
function getUser(name, psw){
	var user = {
		userId : name,
		password : psw
	}
	return user;
}
function toLogin(user, time){
	var checked = $("#remember").attr("checked");
	if(checked){
		var str = '{"userID" : "' + user.userId + '", "password" : "' + user.password + '", "dateLogin" : "' + dateLogin + '"}';
		localStorage.setItem("user", str);
	}
	$.get(
		"http://datainfo.duapp.com/shopdata/userinfo.php",
		{status: "login", userID : user.userId, password : user.password},
		function(data){
			if(data.charAt(0) === ("{")){
				alert("登录成功");
			}
			if(data == 0){
				alert("用户名不存在");
			}
			if(data == 2){
				alert("用户名与密码不匹配");
			}
		}
	);
}



