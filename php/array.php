<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<?php
		//二维数组
		$arr2 = array(
			"书籍"=>array("文学","历史","地理"),
			"体育"=>array("m"=>"足球","n"=>"篮球"),
			"水果"=>array("橙子",8=>"葡萄","苹果"));
		print_r($arr2);
		echo "<br>";
		// 三维数组
		$arr3 = array(
			"1"=>array("1_1" => array("1_1_1"=>"000"),"1_2" => array("1_1_2"=>"000")),
			"2"=>array("2_1" => array("2_1_1"=>"000","2_2_1"=>"000"),"1_2" => array("2_1_2"=>"000")),
			"3"=>array("3_1" => array("3_1_1"=>"000"),"3_1_2" => array("3_1_2"=>"000")));
		print_r($arr3);
		//数组遍历
		echo "<br>";
		$arr = array("1"=>"李","2"=>"小","3"=>"龙");
		foreach ($arr as $key => $value) {
			# code...
			echo $key."=>".$value."<br>";
		}
		//将字符串转换成数组
		$str = "时装，休闲，职业装";
		$arr4 = explode("，", $str);
		print_r($arr4);
		echo "<br>";
		$strnew = implode("，", $arr4);
		echo "$strnew";
		//输出数组元素个数
		echo "<br>";
		echo 'count($arr2, 0)'.count($arr2, 0);echo "<br>";
		echo 'count($arr2, 1)'.count($arr2, 1);echo "<br>";
		//查询数组中制定元素
		// array_search(needle, haystack)
		echo array_search("职业装", $arr4);
		echo "<br>";
		//获取数组中最后一个元素
		// array_pop(array) 返回数组最后一个元素，并将长度减1，数组为空 返回null
		echo array_pop($arr4);
		echo "<br>";
		//向数组中添加一个元素 
		// array_push() 添加到末尾 并使长度+1
		array_push($arr4, "中山装");
		print_r($arr4);
		echo "<br>";
		//删除数组中重复的元素
		//array_unique(array)
		 
	?>
</body>
</html>