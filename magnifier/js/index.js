window.onload = function () {
	var
		oBox 		  = $('box'),
		oBigImgBox 	  = $('big-img-box'),
		oBigImg 	  = $('big-img'),
		oMiddleImgBox = $('middle-img-box'),
		oMiddleImg    = $('middle-img'),
		oImageZoom 	  = $('image-zoom'),
		oSmallImgBox  = $('small-img-box'),
		aSmallImg     = byTagName(oSmallImgBox, 'img'),
		oMiddleBoxPos = position(oMiddleImgBox);

	// 给图片循环添加over事件
	for(var i=0; i < aSmallImg.length; i++) {
		aSmallImg[i].onmouseover = function () {
			// 先去掉所有图片的className
			for(var j=0; j < aSmallImg.length; j++) {
				aSmallImg[j].className = '';
			}
			// 给当前的图片添加className
			this.className = 'active';

			// 改变中图片的src
			oMiddleImg.src = this.src;

			// 改变大图片的src
			oBigImg.src = this.src;
		}
	}

	// 给middle-img-box添加over事件
	oMiddleImgBox.onmouseover = function () {
		setStyle(oBigImgBox, {display: 'block'});
		setStyle(oImageZoom, {display: 'block'});
	}

	// 给middle-img-box添加out事件
	oMiddleImgBox.onmouseout = function () {
		setStyle(oBigImgBox, {display: 'none'});
		setStyle(oImageZoom, {display: 'none'});
	}

	// 给middle-img-box添加move事件
	oMiddleImgBox.onmousemove = function (ev) {
		var
			ev = ev || window.event,
			iScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		var
			iLeft = iScrollLeft + ev.clientX - oMiddleBoxPos.left - oImageZoom.offsetWidth/2,
			iTop  = iScrollTop + ev.clientY - oMiddleBoxPos.top  - oImageZoom.offsetHeight/2,
			iMaxHorizontal = oMiddleImgBox.offsetWidth - oImageZoom.offsetWidth,
			iMaxVertical   = oMiddleImgBox.offsetHeight - oImageZoom.offsetHeight;

		// 判断左右方向
		if(iLeft < 0) {
			iLeft = 0;
		} else if(iLeft > iMaxHorizontal) {
			iLeft = iMaxHorizontal;
		}

		// 判断上下方向
		if(iTop < 0) {
			iTop = 0;
		} else if(iTop > iMaxVertical) {
			iTop = iMaxVertical;
		}
		// 设置遮罩层的left和top值
		setStyle(oImageZoom, {left: iLeft + 'px', top: iTop + 'px'});

		// 设置大图的left和top值
		setStyle(oBigImg, {
			left: - iLeft / iMaxHorizontal * (oBigImg.offsetWidth - oBigImgBox.offsetWidth) + 'px',
			top:  - iTop / iMaxVertical * (oBigImg.offsetHeight - oBigImgBox.offsetHeight) + 'px',
		});
	}
	function $(id){
		return document.getElementById(id);
	}
	function byTagName(obj, tagName) {
		return obj.getElementsByTagName(tagName);
	}
	// 给obj同时设置若干个style属性
	function setStyle(obj, oTarget) {
		for(var sAttr in oTarget) {
			obj.style[sAttr] = oTarget[sAttr];
		}
	}
	// 循环获取元素相对于文档左上角的距离
	// 第一步 left 0 top 0
	// 第二步 oMidBox offsetLeft 10 offsetTop 10 left 10 top 10  obj oBox
	// 第三步 oBox offsetLeft 10 offsetTop 10 left 20 top 20 obj body
	// 第四步 body offsetLeft 0 offsetTop 0 left 20 top 20 obj null
	// return oPos  {left: 20, top: 20}
	function position (obj) {
		// 初始化为0
		var oPos = {left:0, top: 0};

		do{
			oPos.left += obj.offsetLeft;
			oPos.top  += obj.offsetTop;

			obj = obj.offsetParent;
		}while(obj);
		return oPos;
	}
}