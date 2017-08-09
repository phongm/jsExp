<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript">
		/*var arr = []; 
		for(var i = 2; i < 100; i++)
		{
			var bool = false;
			for(var a = 0, len = arr.length; a < len; a++){
				if(i % arr[a] == 0){
					bool = true;
					break;
				}
			}
			if(!bool){
				document.write(i + "  ");
				arr.push(i);
			}
		}*/
	</script>
</head>
<body>
	<?php
		$ss = 2;
		$max = 1000;
		$arr = array();

		echo"1000以内的素数: <br>";
		/*while($ss < $max):
			$boo = false;
			foreach ($arr as $value):
				if($ss % $value == 0):
					$boo = true;
					break;
				endif;
			endforeach;
			if(!$boo):
				echo $ss."  ";
				$arr[count($arr)] = $ss;
			endif;
			$ss++;
		endwhile;*/
		for(; $ss < $max; $ss++){
			$bool = false;
			foreach($arr as $value){
				if($ss % $value == 0){
					$bool = true;
					break;
				}
			}
			if(!$bool){
				echo $ss."  ";
				$arr[count($arr)] = $ss;
			}
		}
		echo "<br>";
		for($i = 1; $i <= 10; $i++){
			for($j = 1; $j <= 10; $j++){
				echo "1";
			}
			echo "<br>";
		}
		echo'\'';
	?>
</body>
</html>