function startMove(obj, oTarget, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var bBtn = true; // 默认运动完毕
		for(var sAttr in oTarget) {
			// 获取当前值
			if(sAttr === 'opacity') {
				var iCur = parseFloat(getStyle(obj, sAttr)*100);
			} else {
				var iCur = parseInt(getStyle(obj, sAttr));
			}
			var iSpeed = (oTarget[sAttr] - iCur)/6;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			// 每执行一次的目标值
			var iTarget = iCur+iSpeed;

			// 做浏览器的兼容性
			if(sAttr === 'opacity') {
				obj.style.filter = 'alpha(opacity=' + iTarget + ')';
				obj.style.opacity = iTarget/100;
			} else {
				obj.style[sAttr] = iCur+iSpeed + 'px';
			}

			if(iCur+iSpeed !== oTarget[sAttr]) {
				bBtn = false;
			}
		}
		// 判断所有属性是否执行完毕，清除计时器
		if(bBtn) {
			clearInterval(obj.timer);
			// 执行回调函数
			if(fn) {
				fn();
			}
		}
	},50);
}

// 获取对象属性值
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, null)[sAttr];
	}
}