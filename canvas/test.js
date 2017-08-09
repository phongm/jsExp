function getValue(a, b){
	var res = a;
	var arr = [a];
	for(var i = 1; i < b-1; i++){
		arr.push(Math.sqrt(arr[i-1]));
		res += arr[i];
	}
	return res.toFixed(2);
}

console.log(getValue(81, 4));