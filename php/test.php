<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>hello world</title>
</head>
<body>
	<?php 
		/*echo"<table>
			<tr><td>1</td><td>2</td><td>3</td></tr>
			<tr><td>1</td><td>2</td><td>3</td></tr>
			<tr><td>1</td><td>2</td><td>3</td></tr>
			<tr><td>1</td><td>2</td><td>3</td></tr>
		</table>";*/
		/*$res = 1;
		for($i = 1; $i <= 100; $i++){
			$res *= $i;
		}
		echo "100! = ".$res;*/
		$name = array("1" => "智能机器人","2" => "数码相机","3" => "天翼3G手机", "4" => "瑞士手表");
		$price = array("1" => "14998","2" => "2588","3" => "2666", "4" => "66698");
		$counts = array("1" => 1, "2" => 1,"3" => 2, "4" => 1);
		echo'<table width="580" border="1" cellpadding="1" cellspacing="1" bordercolor="#fff" bgcolor="#c17e50">
			<tr>
				<td width="145" align="center" bgcolor="#fff" class="style1">商品名称</td>
				<td width="145" align="center" bgcolor="#fff" class="style1">价 格</td>
				<td width="145" align="center" bgcolor="#fff" class="style1">数 量</td>
				<td width="145" align="center" bgcolor="#fff" class="style1">金 额</td>
			</tr>';
		foreach($name as $key => $value){
			echo '<tr>
				<td height="25" align="center" bgcolor="#fff" class="style2">'.$value.'</td>
				<td align="center" bgcolor="#fff" class="style2">'.$price[$key].'</td>
				<td align="center" bgcolor="#fff" class="style2">'.$counts[$key].'</td>
				<td align="center" bgcolor="#fff" class="style2">'.$counts[$key]*$price[$key].'</td>
			</tr>';
		}
		echo '</table>';
	?> 
</body>
</html>