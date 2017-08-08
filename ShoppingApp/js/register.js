$(function(){

});

function register(){
		var name = $("#register_name").val();
		var psw = $("#register_psw").val();
		var repsw = $("#register_repsw").val();

		if (name === "") {
			alert("请输入用户名");
		}else{
			if (psw === "") {
				alert("请输入密码");
			}else {
				if ( repsw !== psw){
					alert("两次输入密码不一致,请重新输入");
				}else{
					var user = getUser(name, psw);
					toRegister(user);
				}
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

function toRegister(user){
	// console.log(user.userId, user.password);
	$.ajax({
		type : "post",
		url  : "http://datainfo.duapp.com/shopdata/userinfo.php",
		data : {
			status: "register", 
			userID: user.userId,
			password : user.password
		},
		success : function(data){
			console.log(data);
			/*if(data == 1){
				alert("注册成功");
			}
			if(data == 0){
				alert("用户名重名");
			}
			if(data == 2){
				alert("数据库出错");
			}*/
			switch(data){
				case "1":
					alert("注册成功");
					break;
				case "2":
					alert("数据库出错");
					break;
				case "0":
					alert("用户名重名");
					break;
				default:
					alert("Error");
					break;
			}
		},
		error:function(){
			alert("系统故障");
		}
	});
}