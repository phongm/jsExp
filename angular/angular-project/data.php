<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
	header("Content-type:text/html;charset=utf-8");
	if($_GET){
	    $d = $_GET['data'];//这里获取的直接就是数组了，不需要用到json_decode
	    echo $d;
	    //print_r($d);
	    exit;
	}
	?>
</body>
</html>