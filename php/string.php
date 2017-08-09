<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	
</head>
<body>
	<?php
		$s = "she is a good girl.她是个好女孩 girl";
		echo 'strlen($s) ==> '.strlen($s)."<br>";   //获取字符串长度
		echo 'substr($s, 4) ==> '.substr($s, 0)."<br>";   //子串 4-end
		echo 'substr($s, 0, 10) ==> '.substr($s, 0, 10)."<br>"; 
		echo 'substr($s, -4, 4) ==> '.substr($s, -23, 4)."<br>";
		$str = "I am a boy";
		/*echo $str."<br>";
		$a = addslashes($str);
		echo addslashes($str)."<br>";
		$b = stripslashes($a);
		echo $b."<br>";*/
		$str2 = "I am a BOY";
		echo 'strcmp($str, $str2) ==> '.strcmp($str, $str2)."<br>";  //按字节比较
		echo 'strnatcmp($str2, $str) ==> '.strnatcmp($str2, $str)."<br>";  //按自然顺序比较
		echo 'strcmp($str, $str2, 8) ==> '.strncmp($str, $str2, 8)."<br>";  //按长度比较（8个字节参与比较）
		echo 'strstr($s, ".") ==> '.strstr($s, '.')."<br>";  //获取.后面的字符串（包括.）
		echo 'strchr($s, "girl") ==> '.strchr($s, 'girl')."<br>";  //获取.后面的字符串（包括.）
		echo 'substr_count($s, "girl") ==> '.substr_count($s, 'girl')."<br>";  //子串出现的次数

		$s2 ="**";
		$s1 = "腾讯";
		$ss = "  **公司是一家以计算机软件技术为核心的高科技企业，多年来致力于**行业管理软件开发";
		echo '$s2'.$s2;
		echo '$s1'.$s1;
		echo '$ss'.$ss."<br>";
		//注意该函数不区分大小写，如要区分大小写 可用 str_replace()
		echo 'str_ireplace($s2, $s1, $ss)'.str_ireplace($s2, $s1, $ss)."<br>"; 

		//数据的格式化
		$number = 1868.96;
		echo '$number == '.$number."<br >";
		echo 'number_format($number) ==>'.number_format($number)."<br>";
		echo "number_format($number, 2) ==>".number_format($number, 2)."<br >";
		$number2 = 774466.774466;
		echo 'number_format($number2, 2, ".", "千") == >'.number_format($number2, 2, ".", "千")."<br>";

		//字符串分割 与 合成函数 implode() 函数相对应 
		$str = "PHP 编程词典@.NET 编程词典@.ASP编程词典@JSP编程词典"; 
		$str_arr = explode("@", $str);
		print_r($str_arr);
		echo "<br>";
		$array = implode("@", $str_arr);
		echo $array;
	?>
	
</body>
</html>