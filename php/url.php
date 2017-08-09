<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<table width="600" bgcolor="#ccc" border="1">
		<tr>
			<td align="right">姓名：</td>
			<td><input type="text" name="user"></td>
		</tr>
		<tr>
			<td align="right">性别：</td>
			<td>
				<input type="radio" name="sex">男 &nbsp;&nbsp;
				<input type="radio" name="sex">女
			</td>
		</tr>
		<tr>
			<td align="right">密码：</td>
			<td><input type="password" name="pwd"></td>
		</tr>
		<tr>
			<td align="right">学历：</td>
			<td>
				<select name="select" id="">
					<option value="博士生">博士生</option>
					<option value="研究生">研究生</option>
					<option value="本科生">本科生</option>
					<option value="专科生">专科生</option>
				</select>
			</td>
		</tr>
		<tr>
			<td align="right">爱好：</td>
			<td>
				<input type="checkbox" name="fond">电脑&nbsp;
				<input type="checkbox" name="fond">音乐&nbsp;
				<input type="checkbox" name="fond">旅游&nbsp;
				<input type="checkbox" name="fond">其他&nbsp;
			</td>
		</tr>
		<tr>
			<td align="right">个人写真：</td>
			<td><input type="file" name="photo"></td>
		</tr>
		<tr>
			<td align="right">个人简介：</td>
			<td><input type="textarea" name="intro"></td>
		</tr>
		<tr>
			<td align="center" colspan="2">
				<input type="submit" name="submit" id="submit" value="提交">&nbsp;&nbsp;
				<input type="reset" value="重置">
			</td>
			
		</tr>
	</table>

	<?php
		if($_POST["submit"]!=null){
			echo "您的简历内容是：<br>";
			echo "姓名：".$_POST["user"];
			echo " 性别：".$_POST["sex"];
			echo " 密码：".$_POST["pwd"];
			echo " 学历：".$_POST["select"];
			echo " 爱好：";
			//遍历爱好复选框内容
			for($i = 0; $i < count($_POST["fond"]); $i++)
				echo $_POST["fond"][$i]."&nbsp;&nbnsp;";
			//实现文件上传功能
			$path="./upfiles".$_POST['photo']['name'];
			move_uploaded_file($FILES['photo']['tep_name'], $path);

			echo " 个人写真：".$path;
			echo "个人简介：".$_POST["intro"];
		}
	?>
</body>
</html>