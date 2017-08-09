<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
		/*if($_POST["likes"] != null){
			echo "你选择的结果是：";
			for($i = 0; $i < count($_POST["likes"]); $i++){
				echo $_POST["likes"][$i]."&nbsp;&nbsp;";
			}
		}*/
		if ($_POST["submit"] == "登录") {
			echo $_POST["username"]." + ".$_POST["userpsw"];
		}
	?>
</body>
</html>