<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
	<!-- <form action="index.php" method="post" name="form1">
		<table width="445" cellpadding="0" cellspacing="0">
			<tr>
				<td width="443" height="41" align="center" valign="top">你喜欢的图书类型：
					<input type="checkbox" name="likes[]" value="入门类">入门类
					<input type="checkbox" name="likes[]" value="案例类">案例类
					<input type="checkbox" name="likes[]" value="讲解类">讲解类
					<input type="checkbox" name="likes[]" value="实例类">实例类
					<input type="checkbox" name="likes[]" value="高级类">高级类
					<input type="submit" name="submit" value="提交">
				</td>
			</tr>
		</table>

	</form> -->

	<form action="index.php" method="post" name="form1">
		<input type="text" name="username" id="username">
		<input type="text" name="password" id="password">
		<input type="submit" value="提交">
	</form>
	<?php
		/*if($_POST["likes"] != null){
			echo "你选择的结果是：";
			for($i = 0; $i < count($_POST["likes"]); $i++){
				echo $_POST["likes"][$i]."&nbsp;&nbsp;";
			}
		}*/
	?>
</body>
</html>