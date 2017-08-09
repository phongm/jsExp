<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
		<!-- <form action="index.php" method="post" name="form1">
			<table width="300" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="30">&nbsp;&nbsp;订单号:<input type="text" name="user" size="20">
					<input type="submit" name="submit" value="提交"></td>
					
				</tr>
			</table>
		
		</form> -->
		<form action="" method="POST" name="user">
			<p><label>用户名称：</label><input type="text" name="username" id="username" size="20"></p>
			<p><label>用户密码：</label><input type="text" name="userpsw" id="userpsw" size="20"></p>
			<p><input type="submit" value="登录" name="submit" id="submit"></p>
		</form>

	<?php
		if ($_POST["submit"] == "登录") {
			echo $_POST["username"]." + ".$_POST["userpsw"];
		}
		// $submit = isset($_POST['submit']) ? $_POST['submit'] : exit('请传submit参数！');
		// if($submit=="登录"){
		// 	echo $_POST[username]." + ".$_POST[userpsw];
		// }
	?>		
</body>
</html>