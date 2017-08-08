// .-----------------------------------------
// | 瀑布流分析
// | 第一步，分析第一行：第一张 left 0*240 top 0，第二张 left 1*240(第一张图片的宽度), top 0 第三张 2*240 top 0， 第四张 top 0 left : 3*240 第五张 left 4*240 top 0。
// | 第二步 ，分析第一行之外的panel
// '-----------------------------------------

window.onload = function () {
	var
		oBox = $('box'),
		aPanel = getClass(oBox, 'panel'),
		iPanelWidth = aPanel[0].offsetWidth,
		iPanelImgWidth = byTagName(aPanel[0], 'img')[0].offsetWidth,
		iClientWidth = document.documentElement.clientWidth,
		iClientHeight = document.documentElement.clientHeight,
		iColNum = Math.floor(iClientWidth / iPanelWidth),  // 最大列数
		aColHeight = [], // 装载每一列的高度
		bBtn = true; // 控制请求新数据

	// 设置box宽度
	setStyle(oBox, {width: iColNum * iPanelWidth + 'px'});

	for(var i =0; i < aPanel.length; i++) {
		// 设置第一行panel的位置
		if(i < iColNum) {
			setStyle(aPanel[i], {left: i * iPanelWidth + 'px', top: 0});
			aColHeight.push(aPanel[i].offsetHeight);
		} else {
			// 获取最小高度对象
			var oMinH = getMinHeight(aColHeight);
			setStyle(aPanel[i], {left: oMinH.key * iPanelWidth + 'px', top: oMinH.minH + 'px'});

			// 更新最矮列高度
			aColHeight[oMinH.key] += aPanel[i].offsetHeight;
		}
	}

	// 滚动加载新的数据
	window.onscroll = function () {
		var
			iScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			oLastPanel = aPanel[aPanel.length - 1],
			iLastHalfH = oLastPanel.offsetHeight / 2;
		if(bBtn && iScrollTop + iClientHeight > iLastHalfH + oLastPanel.offsetTop) {
			bBtn = false; // 关闭按钮
			ajax('GET', 'waterfall.php', true, {}, function (res) {
				for(var i =0; i < res.length; i++) {

					
					var oNewPanel = document.createElement('div');
					oNewPanel.className = 'panel';
					// 计算图片高度比例  iOldW/iNewW = iOldH/iNewH
					var iNewPanelH = iPanelImgWidth * res[i].height / res[i].width;
					oNewPanel.innerHTML = '<a href="javascript:;"><img src="' + res[i].url + '" width="' + iPanelImgWidth + '" height="' + iNewPanelH + '" alt=""></a>';

					// 添加页面中
					oBox.appendChild(oNewPanel);

					// 设置新panel的位置
					// 获取最小高度对象
					var oMinH = getMinHeight(aColHeight);
					//setStyle(oNewPanel, {left: oMinH.key * iPanelWidth + 'px', top: oMinH.minH + 'px'});
					setStyle(oNewPanel, {left: (iClientWidth - iPanelWidth) / 2 + 'px', top: iScrollTop + iClientHeight + 'px'});

					// 更新最矮列高度
					aColHeight[oMinH.key] += oNewPanel.offsetHeight;

					// 开始让新添加的panel运动
					startMove(oNewPanel, {left: oMinH.key * iPanelWidth, top: oMinH.minH});
				}
				// 重新获取所有的panel
				aPanel = getClass(oBox, 'panel');

				bBtn = true;  // 接收到数据以后，再把按钮打开
			});
		}
	}

	// 获取所有列的最小高度值和对应的索引
	function getMinHeight(arr) {
		var obj ={
			minH: arr[0],
			key : 0,
		};
		for(var i = 1; i < arr.length; i++) {
			// 判断是否为最小值
			if(arr[i] < obj.minH) {
				obj = {
					minH: arr[i],
					key : i,
				};
			}
		}
		return obj;
	}

	// 通过ID获取DOM对象
	function $(id) {
		return document.getElementById(id);
	}

	// 通过标签名称获取DOM对象列表
	function byTagName(obj, tagName) {
		return obj.getElementsByTagName(tagName);
	}

	// 通过className获取DOM对象列表
	function getClass(obj, sClassName) {
		if(obj.getElementsByClassName) {
			return obj.getElementsByClassName(sClassName);
		} else {
			var aAllTag = byTagName(obj, '*');

			var aClassName = [];
			for(var i =0; i < aAllTag.length; i++) {
				if(aAllTag[i].className === sClassName) {
					aClassName.push(aAllTag[i]);
				}
			}
			return aClassName;
		}
	}

	// 设置DOM对象的style
	function setStyle(obj, oTarget) {
		for(var sAttr in oTarget) {
			obj.style[sAttr] = oTarget[sAttr];
		}
	}
}