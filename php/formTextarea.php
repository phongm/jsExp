<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<form action="" name="form1" method="post">
		<input type="file" name="file" size="15">
		<input type="submit" name="upload" value="上传">
	</form>
	
	
	<?php
		echo $_POST["file"];
	?>
</body>
</html>