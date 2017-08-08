//匀速运动
function uniformMotion(obj,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 0;
		iSpeed = obj.offsetLeft<iTarget?iSpeed = 10:iSpeed = -10;
		if(Math.abs(iTarget - obj.offsetLeft) <Math.abs(iSpeed) ){
			clearInterval(obj.timer);
			obj.style.left = iTarget + "px";
		}else{
			obj.style.left = obj.offsetLeft +　iSpeed + "px";
		}
	},30);
}

//缓冲运动
function bufferMotion(obj,iTarget){
	clearInterval(obj.timer1);
	obj.timer1 = setInterval(function(){
		var iSpeed = (iTarget - obj.offsetLeft)/10;
		iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(obj.offsetLeft == Math.floor(iTarget) ){
			clearInterval(obj.timer1);
		}else{
			obj.style.left = obj.offsetLeft +　iSpeed + "px";
			console.log(obj.offsetLeft+" "+iSpeed);
		}
	},30);
}
//任意运动框架1
function arbitraryMotion(obj,sAttr,iTarget,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCur = 0;
		if(sAttr=="opacity"){
			iCur = parseInt(parseFloat(getStyle(obj,sAttr))*100);
		}else{
			iCur = parseInt(getStyle(obj,sAttr))
		}
		var iSpeed = (iTarget - iCur ) /10;
		iSpeed = iSpeed>0?Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(iCur == iTarget){
			clearInterval(obj.timer);
			fn && fn();
		}else{
			if(sAttr=="opacity"){
				iCur += iSpeed;
				obj.style[sAttr] = "alpha(opacity="+iCur+")";
				obj.style[sAttr] = iCur/100;
			}else{
				obj.style[sAttr] = iCur +iSpeed+ "px";
			}
		}
	},30);
}

//封装获取样式的函数
function getStyle(obj,sAttr){
	//该方法获取的属性会有单位
	if(obj.currentStyle){
		return obj.currentStyle[sAttr];
	}else{
		return getComputedStyle(obj,null)[sAttr];
	}
}

//任意运动框架2
function arbitraryMotion1(obj,oAttr,oTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCur = 0;
		for(var i in oAttr){
			if(oAttr[i] =="opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,oAttr[i]))*100);
			}else{
				iCur = parseInt(getStyle(obj,oAttr[i]))
			}
		

			var iSpeed = (oTarget[i] - iCur ) /10;
			iSpeed = iSpeed>0?Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur == oTarget[i]){
				clearInterval(obj.timer);
			}else{
				if(oAttr[i] =="opacity"){
					iCur += iSpeed;
					obj.style[oAttr[i]] = "alpha(opacity="+iCur+")";
					obj.style[oAttr[i]] = iCur/100;
				}else{
					obj.style[oAttr[i]] = iCur +iSpeed+ "px";
				}
			}
		}
	},30);
}
//任意运动框架3
function arbitraryMotion2(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCur = 0;
		var bStop = true;
		for(var sAttr in json){
			if(sAttr=="opacity"){
			iCur = parseInt(parseFloat(getStyle(obj,sAttr))*100);
			}else{
				iCur = parseInt(getStyle(obj,sAttr))
			}
			var iSpeed = (json[sAttr] - iCur ) /10;
			iSpeed = iSpeed>0?Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur != json[sAttr]){
				bStop = false;
			}
			if(sAttr=="opacity"){
				iCur += iSpeed;
				obj.style[sAttr] = "alpha(opacity="+iCur+")";
				obj.style[sAttr] = iCur/100;
			}else if(sAttr=="z-index"){
				obj.style[sAttr] = iCur +iSpeed;
			}else{
				obj.style[sAttr] = iCur +iSpeed+ "px";
			}

			
			
		}
		if(bStop){
			clearInterval(obj.timer);
			fn && fn();
		}
		
	},30);
}