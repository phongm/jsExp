/**
	* 通过classname获取DOM列表
	* sClass 需要获取的className
*/
function getClass(sClass) {
	// 兼容非IE
	if(document.getElementsByClassName) {
		return document.getElementsByClassName(sClass);
	} else {
		// 兼容IE
		var
			aAllTag = document.getElementsByTagName('*'),
			aNewClass = [];
		for(var i =0; i < aAllTag.length; i++) {
			if(aAllTag[i].className === sClass) {
				aNewClass.push(aAllTag[i]);
			}
		}
		return aNewClass;
	}
}