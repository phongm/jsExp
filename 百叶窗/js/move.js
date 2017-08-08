function move(obj,oAttr,fn){
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					//定义全部结束标志，默认全部结束
					var bBtn = true;
					//遍历目标对象属性
					for(var sAttr in oAttr)
					{
						//如果是透明度opacity
						if(sAttr === "opacity")
						{
							
							var iCur = parseFloat(getStyle(obj,sAttr)*100);
						}
						else
						{
							//获取当前目标对象属性的值
							var iCur = parseInt(getStyle(obj,sAttr));
						}
						//获取当前平分的速度
						var iSpeed = (oAttr[sAttr] - iCur) / 10;
						
						//判断是否到达边界						
						iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) :  Math.floor(iSpeed);
						
						//执行一次之后的位置
						var iNow = iCur + iSpeed;
						
						//如果是透明度，计算方式不一样
						if(sAttr === "opacity")
						{
							obj.style.filter = "alpha(opacity=" + iNow + ")";
							obj.style.opacity = iNow / 100;
						}
						else
						{
							//对象执行一次位移
							obj.style[sAttr] = iNow + "px";
						}
						
						//临界判断
						if(iNow !== oAttr[sAttr])
						{
							bBtn = false;
						}
					}
					if(bBtn)
					{
						clearInterval(obj.timer);
						fn && fn();
					}
				
				},50);
			}
			
			// 获取对象属性值
			
			function getStyle(obj,sAttr){
				if(obj.currentStyle)
				{
					return obj.currentStyle[sAttr];
				}
				else
				{
					return getComputedStyle(obj,null)[sAttr];
				}			
			}
			//根据id获取对象
			function $(id){
				return document.getElementById(id);
			}
			
			
			
			
			
			
			
			
			
			