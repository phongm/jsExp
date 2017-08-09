<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<form action="" method="post" name="form1">
		<table width="280" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td width="80" height="20" align="center"> <span class="style2">意见主题:</span></td>
				<td width="194">
					<select name="select" id="" size="1">
						<option value="公司发展" selected>公司发展</option>
						<option value="管理制度" >管理制度</option>
						<option value="后勤服务" >后勤服务</option>
						<option value="员工薪资" >员工薪资</option>
					</select>&nbsp;&nbsp;&nbsp;
					<input type="submit" name="submit" value="提交">
				</td>
			</tr>
		</table>

	</form>
	<?php
		if($_POST["select"] != ""){
			echo "你选择的意见主题是：<br>";
			for($i = 0; $i < count($_POST["select"]); $i++){
				echo $_POST["select][$i]."&nbsp;&nbsp;";
			}
		}
	?>
</body>
</html>