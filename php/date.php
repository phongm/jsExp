<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
		echo "当前时间戳是：".time()."<br>";
		echo "当前日期是：".date("Y-m-d",time())."<br>";
		echo "当前时间是：".date("H:i:s", time())."<br>";
		$arr = getdate(); //获取日期数组

		echo $arr["year"]."-".$arr["mon"]."-".$arr["mday"]."&nbsp;";
		echo $arr["hours"]."-".$arr["minutes"]."-".$arr["weekday"]."";
		echo "<p>";
		echo "今天是一年中的第".$arr["yday"]."天";

		strtotime();

	?>
</body>
</html>