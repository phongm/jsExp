window.onload = function(){
				var oShade = $("shade");
				var oAdd = $("add");
				var oNew = $("new");
				var oClose = $("close");
				var oDrag = $("vice_title");
				var oOk = $("ok");
				var oCancle = $("cancle");
				var oTxt = $("txt");
				var iNowClientW = document.documentElement.clientWidth;
				var iNowClientH = document.documentElement.clientHeight;
				var iScrollTop = document.documentElement.scrollTop;
				var iNowLeft = 0;
				var iNowTop = 0;
				//设置遮罩层高度
				oShade.offsetHeight = iNowClientH;
				//点击显示 发布框
				oAdd.onclick = function(){
					oShade.style.display = "block";
					oNew.style.display = "block";
					var iLeft = (document.documentElement.clientWidth - oNew.offsetWidth) / 2;
					var iTop  = (document.documentElement.clientHeight - oNew.offsetHeight) / 2;
					
					if(document.cookie==""){
						oNew.style.left = iLeft + "px";
						oNew.style.top = iTop + "px";
					}
					else{
						oNew.style.left = getCookie("left") + "px";
						oNew.style.top = getCookie("top") + "px";
					}
					oTxt.value = "";
				}
				oClose.onclick = function(){
					oNew.style.display = "none";
					oShade.style.display = "none";				
				}
				//拖拽
				oDrag.onmousedown = function(ev){				
					oDrag.style.cursor = "pointer";
					var ev = ev || window.event;
					var iRelLeft = ev.clientX - oNew.offsetLeft;
					var iRelTop  = ev.clientY - oNew.offsetTop;
					document.onmousemove = function(ev){
						iNowLeft = ev.clientX - iRelLeft;
						iNowTop = iScrollTop + ev.clientY - iRelTop;
						if(iNowLeft < 0)
							iNowLeft = 0;
						else if(iNowLeft > iNowClientW - oNew.offsetWidth)
							iNowLeft = iNowClientW - oNew.offsetWidth;
						if(iNowTop < 0)
							iNowTop = 0;
						else if(iNowTop > iNowClientH - oNew.offsetHeight)
							iNowTop = iNowClientH - oNew.offsetHeight;
						oNew.style.left = iNowLeft + "px";
						oNew.style.top = iNowTop + "px";
						return false;
					}
					document.onmouseup = function(){
						document.onmousemove = null;
						oDrag.style.cursor = "auto";
						setCookie("left",iNowLeft,7,"/");
						setCookie("top",iNowTop,7,"/");						
					}
					return false;
				}
				
				//点击确定按钮
				oOk.onclick = function(){
					if(oTxt.value !=="")
					{
						console.log(oTxt.value.length);
						if(oTxt.value.length <= 150)
						{
							oTxt.value = oTxt.value.replace("共产党", "***");
							oTxt.value = oTxt.value.replace("共匪", "**");
							oTxt.value = oTxt.value.replace("反共", "**");
							var oContent = $("content");
							var oNewDiv = byTagName("div");
							oNewDiv.className = "contentList";
							
							var oNewContainer = byTagName("div");
							oNewContainer.className = "containner";
							
							var oPicDiv = byTagName("div");
							oPicDiv.className = "pic";
							
							var oImg = byTagName("img");
							oImg.src = "img/Tulips.jpg";
							oPicDiv.appendChild(oImg);
							
							var oTitle = byTagName("h1");
							oTitle.className = "user";
							oTitle.innerHTML = "蒲公英";
							oNewContainer.appendChild(oPicDiv);
							oNewContainer.appendChild(oTitle);
							oNewDiv.appendChild(oNewContainer);
							
							var oInfo = byTagName("p");
							oInfo.className="info";
							oInfo.innerHTML = oTxt.value;
							oNewDiv.appendChild(oInfo);
							
							var oOther = byTagName("div");
							oOther.className="other";
							oOther.innerHTML = "<a href='#'>收藏</a>"+"<a href='#'>转发</a>" + "<a href='#'>评论</a>"+"<a href='#'>点赞</a>"
							oNewDiv.appendChild(oOther);
							oContent.appendChild(oNewDiv);	
							
							oNew.style.display = "none";
							oShade.style.display = "none";
						}
						else{
							alert("您输入的东西太多啦");
						}
					}
					else{
						alert("多少说点什么吧？");
					}
				}
				
				//取消按钮
				oCancle.onclick = oClose.onclick;
				
				/**
					* 添加/修改COOKIE函数
					* key name
					* value 值
					* iDay 设置过期时间(以天为单位)
					* path 设置路径
				*/
				function setCookie(key, value, iDay, path) {
					var oDate = new Date();
					oDate.setDate(oDate.getDate() + iDay);
					document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + oDate + ';path=' + path;
				}
				/**
					* 封装查询COOKIE函数
					* key 要查询的name
				*/
				function getCookie(key) {
					var aCookie = document.cookie.split('; '); // 对cookie进行分组
					var oCookie = {};  // 存储切割完以后的cookie数据
					for(var i =0; i < aCookie.length; i++) {
						var aTemp = aCookie[i].split('=');
						oCookie[aTemp[0]] = aTemp[1];
					}
					return decodeURIComponent(oCookie[key]);
				}		
				/**
					* 删除COOKIE
					* key 要删除的name
					* path 指定删除的路径
				*/
				function removeCookie(key, path) {
					document.cookie = key + '=;expires=-1;path=' + path;
				}
			}
			
			function getStyle(obj,sAttr){
				if(obj.currentStyle){
					return obj.currentStyle[sAttr];
				}else{
					return getComputedStyle(obj,null)[sAttr];
				}			
			}
			function byTagName(tagName){
				return document.createElement(tagName);
			}
			function $(id){
				return document.getElementById(id);				
			}