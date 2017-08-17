/*-------------plane-------------*/

// 获得开始界面
var startDiv = document.getElementById("startDiv");
// 获得主界面
var mainDiv = document.getElementById("mainDiv");
// 获得得分板
var scoreDiv = document.getElementById("scoreDiv");
// 获得得分板的分数
var label = document.getElementById("num");
// 获得暂停板
var suspendDiv = document.getElementById("suspendDiv");
// 获得结束板
var endDiv = document.getElementById("endDiv");
// 获取结束板的分数
var endScore = document.getElementById("planScore");
//获取分数扮

// 初始化
var scores = 0;
var timer = null;
//点击开始 函数
function startGame(){
	//界面的显隐
	startDiv.style.display = "none";
	mainDiv.style.display = "block";
	scoreDiv.style.display = "block";
	timer = setInterval(function(){
		start();
	}, 20);
}

function Plan(hp, x, y, sizeX, sizeY, score, dieTime, sudu, boomImg, imgSrc){
	this.hp = hp;
	this.x = x;
	this.y = y;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.score = score;
	this.dieTime = dieTime;
	this.dieTimes = 0;
	this.sudu = sudu;
	this.boomImg = boomImg;
	this.imgSrc = imgSrc;
	this.imgNode = null;
	this.planisdie = false;
	this.init = function(){
		this.imgNode = document.createElement("img");
		this.imgNode.style.left = this.x + "px";
		this.imgNode.style.top = this.y + "px";
		this.imgNode.src = this.imgSrc;
		mainDiv.appendChild(this.imgNode);
	}
	this.EenemyMove = function(){
		if(scores < 50000){
			this.imgNode.style.top = this.imgNode.offsetTop + this.sudu + "px";
		}else if(scores > 50000 && scores <= 150000){
			this.imgNode.style.top = this.imgNode.offsetTop + this.sudu +1+ "px";
		}else if(scores > 150000 && scores <= 300000){
			this.imgNode.style.top = this.imgNode.offsetTop + this.sudu +2+ "px";
		}else if(scores > 300000 && scores <= 500000){
			this.imgNode.style.top = this.imgNode.offsetTop + this.sudu +3+ "px";
		}else{
			this.imgNode.style.top = this.imgNode.offsetTop + this.sudu +4+ "px";
		}
	}
	this.init();
}

//声明一个子弹类
function Bullet(x, y, sizeX, sizeY, speed, imgSrc){
	this.x = x;
	this.y = y;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.speed = speed;
	this.power = 1;
	this.imgSrc = imgSrc;
	this.imgNode = null;
	this.bulletMove = function(){
		this.imgNode.style.top = this.imgNode.offsetTop-this.speed+"px";
	}
	this.init = function(){
		this.imgNode = document.createElement("img");
		this.imgNode.style.top = this.y + "px";
		this.imgNode.style.left = this.x + "px";
		this.imgNode.src = this.imgSrc;
		mainDiv.appendChild(this.imgNode);
	}
	this.init();
}

// 一个类型的子弹
function Oddbullet(x, y){
	Bullet.call(this, x, y, 6, 14, 10, "img/bullet1.png");
}


// 我方飞机，继承自飞机 Plan 
function Myplane(x, y){
	Plan.call(this, 1, x, y, 66, 80, 0, 600, 0, "img/本方飞机爆炸.gif", "img/我的飞机.gif");
	this.imgNode.setAttribute("id", "ourplane");
}

//创建一个对象
var selfplan = new Myplane(120,460);
//获取到创建的飞机
var ourplan = document.getElementById("ourplane");

this.move = function(){
	var e = window.event || arguments[0];
	var chufa = e.srcElement || e. target;
	var selfPlanX = e.clientX;
	var selfPlanY = e.clientY;
	//更新我的飞机的位置
	ourplan.style.top = selfPlanY - selfplan.sizeY/2+"px";
	ourplan.style.left = selfPlanX - selfplan.sizeX/2+"px";
}

this.border = function(){
	var e = window.event || arguments[0];
	var bodyObjX = e.clientX;
	var bodyObjY = e.clientY;
	//超出边界 ，取消移动世界，反之 加上
	if(bodyObjX < 0 || bodyObjX > 320 || bodyObjY < 0 || bodyObjY > 568){
		if(document.removeEventListener){
			mainDiv.removeEventListener("mousemove", move, true);
		}else if(document.detachEvent){
			mainDiv.detachEvent("onmousemove", move);
		}
	}else{
		if(document.addEventListener){
			mainDiv.addEventListener("mousemove", move, true);
		}else if(document.attachEvent){
			mainDiv.attachEvent("onmousemove", move);
		}
	}
}



// 创建敌方飞机
function Enemy(hp, x, y, sizeX, sizeY, score, dieTime, sudu, boomImg, imgSrc){
	Plan.call(this, hp, random(x, y), 0, sizeX, sizeY, score, dieTime, sudu, boomImg, imgSrc);
}
// var enemyPlan = new Enemy("100", 100, 100, 110,164,5000,300,1, "img/大飞机爆炸.gif", "img/enemy2_fly_1.png");

var enemys = [];    // 创建敌军数组
var bullets = [];   // 子弹数组
var i = 0;		// 计数器
var j = 0;		//计数器
var backgroundPositionY = 0;
function start(){
	mainDiv.style.backgroundPositionY = backgroundPositionY + "px";
	backgroundPositionY += 0.5;
	if(backgroundPositionY > 568){
		backgroundPositionY = 0;
	}
	i++;
	if(i === 20){
		j ++;
		if(j === 20){
			//添加大飞机
			enemys.push(new Enemy(60, 80, 240, 110,164,5000,500,1, "img/大飞机爆炸.gif", "img/enemy2_fly_1.png"));
			j = 0;
		}else{
			//添加小飞机
			enemys.push(new Enemy(5, 20, 300, 34,24,500,300,random(1, 5), "img/小飞机爆炸.gif", "img/enemy1_fly_1.png"));			
		}
		if( j % 5 === 0){
			//添加一个中飞机
			enemys.push(new Enemy(30, 40, 280, 46,60,2000,400,random(1, 3), "img/中飞机爆炸.gif", "img/enemy3_fly_1.png"));			
		}
		i = 0;
	}
	//遍历敌机数组 进行移动敌机
	var enemysLen = enemys.length;
	for(var k = 0; k < enemysLen; k++){
		if(!enemys[k].planisdie){
			enemys[k].EenemyMove();
		}
		//超出边界 删除飞机
		if(enemys[k].imgNode.offsetTop > 568){
			mainDiv.removeChild(enemys[k].imgNode);
			enemys.splice(k, 1);
			enemysLen--;
		}
		//敌机 死亡
		if(enemys[k].planisdie){
			enemys[k].dieTimes += 20;  //所以dieTime 必须是20的倍数
			if(enemys[k].dieTimes === enemys[k].dieTime){
				mainDiv.removeChild(enemys[k].imgNode);
				enemys.splice(k, 1);
				enemysLen--;
			}
		}
	}
	if(i % 5 === 0){
		bullets.push(new Oddbullet(parseInt(selfplan.imgNode.style.left)-4, parseInt(selfplan.imgNode.style.top) + 22));
		bullets.push(new Oddbullet(parseInt(selfplan.imgNode.style.left) + 12, parseInt(selfplan.imgNode.style.top) + 18));
		bullets.push(new Oddbullet(parseInt(selfplan.imgNode.style.left) + 31, parseInt(selfplan.imgNode.style.top) + 14));
		bullets.push(new Oddbullet(parseInt(selfplan.imgNode.style.left) + 50, parseInt(selfplan.imgNode.style.top) + 18));
		bullets.push(new Oddbullet(parseInt(selfplan.imgNode.style.left) + 66, parseInt(selfplan.imgNode.style.top) + 22));
	}
	var bulletslen = bullets.length;
	//移动子弹,遍历数组先
	for(var k = 0; k < bulletslen; k++){
		bullets[k].bulletMove();
		if(bullets[k].imgNode.offsetTop < 0){
			mainDiv.removeChild(bullets[k].imgNode);
			bullets.splice(k, 1);
			bulletslen--;
		}
	}

	//碰撞事件
	//先遍历子弹数组
	for(var k = 0; k < bulletslen; k++)
	{
		//遍历敌机数组
		for(var l = 0; l < enemysLen; l++){
			if(!enemys[l].planisdie){ //如果没有死亡
				//水平碰撞(敌机和我机碰撞)
				if(enemys[l].imgNode.offsetLeft+enemys[l].sizeX > selfplan.imgNode.offsetLeft 
					&& enemys[l].imgNode.offsetLeft < selfplan.imgNode.offsetLeft + selfplan.sizeX){
					//垂直碰撞
					if(enemys[l].imgNode.offsetTop+enemys[l].sizeY>selfplan.imgNode.offsetTop 
						&& enemys[l].imgNode.offsetTop<selfplan.imgNode.offsetTop + selfplan.sizeY){
						selfplan.imgNode.src = selfplan.boomImg;
						endDiv.style.display = "block";
						endScore.innerHTML = scores;
						//让一切静止
						if(document.removeEventListener){ //其他主流浏览器
							mainDiv.removeEventListener("mousemove", move, "true");
							mainDiv.removeEventListener("mousemove", border, "true");
						}else if(document.detachEvent){  // IE8及以下浏览器
							mainDiv.detachEvent("onmousemove", move);
							mainDiv.detachEvent("onmousemove", border);
						}
						clearInterval(timer);
					}
				}
				//子弹和敌机碰撞

				if(bullets[k].imgNode.offsetLeft+bullets[k].sizeX>enemys[l].imgNode.offsetLeft 
					&&bullets[k].imgNode.offsetLeft<enemys[l].imgNode.offsetLeft+enemys[l].sizeX){//水平判断
					if(bullets[k].imgNode.offsetTop+bullets[k].sizeY > enemys[l].imgNode.offsetTop 
						&&bullets[k].imgNode.offsetTop<enemys[l].imgNode.offsetTop+enemys[l].sizeY){
						//判断成功
						enemys[l].hp -= bullets[k].power;
						if(enemys[l].hp === 0){  //血量为零
							//计算分数
							scores += enemys[l].score;
							//更新分数
							label.innerHTML = scores;
							enemys[l].imgNode.src = enemys[l].boomImg;
							enemys[l].planisdie = true;
						}
						//子弹移除
						mainDiv.removeChild(bullets[k].imgNode);
						bullets.splice(k, 1);
						bulletslen--;
					}
				}
			}
		}
	}
}

function goOn(){
	location.reload(true);
}

function random(min, max){
	return Math.floor(min+Math.random()*(max-min));
}

// 暂停
var isStop = true;
this.stop = function(){
	console.log("in");
	if(isStop){
		suspendDiv.style.display = "block";
		//暂停
		//注意兼容
		if(document.removeEventListener){
			mainDiv.removeEventListener("mousemove", move, true);
			mainDiv.removeEventListener("mousemove", border, true);
		}else if(document.detachEvent){
			mainDiv.detachEvent("onmousemove", move);
			mainDiv.detachEvent("onmousemove", border);
		}
		clearInterval(timer);
		isStop = false;
	}else{
		//继续
		suspendDiv.style.display = "none";
		if(document.removeEventListener){
			mainDiv.addEventListener("mousemove", move, true);
			mainDiv.addEventListener("mousemove", border, true);
		}else if(document.detachEvent){
			mainDiv.attachEvent("onmousemove", move);
			mainDiv.attachEvent("onmousemove", border);
		}
		timer = setInterval(start, 20);
		isStop = true;
	}
}



if(document.addEventListener){
	mainDiv.addEventListener("mousemove", move, true);
	// mainDiv.addEventListener("mousemove", border, true);
	selfplan.imgNode.addEventListener("click", stop, true);
	suspendDiv.getElementsByTagName("button")[0].addEventListener("click", stop, true);
	suspendDiv.getElementsByTagName("button")[1].addEventListener("click", stop, true);
	suspendDiv.getElementsByTagName("button")[2].addEventListener("click", goOn, true);
}
else if(document.attachEvent){

}










































