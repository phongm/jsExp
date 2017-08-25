
//播放器
var player = new Player();

//音乐类
function Music(){
	this.src; //歌曲路径
	this.img; //图片资源
	this.num; //歌曲编号
	this.musicName; //歌曲名字
	this.name; //歌手名字
}
// 数组用来存放每一首歌曲
var musicModels = [];

getJsonData();
//获取数据
function getJsonData () {
	$.getJSON("./pbl.json",function(data){
		for(var i = 0; i < data.length; i++){
			var music = new Music();
			music.src = data[i].src;
			music.img = data[i].img;
			music.num = data[i].num;
			music.musicName = data[i].musicName;
			music.name = data[i].name;
			//把歌曲放入数组中
			musicModels.push(music);
		}
		insertData();
		console.log(musicModels.length);
	})
}
//插入数据
function insertData () {
	for(var i = 0; i < musicModels.length; i++){
		var $div = $("<div class='music' data-index = "+i+"></div>");
		
		$(".content").append($div);
		
		var $img = $("<img src="+musicModels[i].img+" />");
		
		$div.append($img);
		
		var $p = $("<p>"+musicModels[i].musicName+"-"+musicModels[i].name+"</p>");
		$div.append($p);
		
		if(i == 0){
			player.playerPlay();
			$div.addClass("playing");
		}
		//每个div的点击事件
		$div.click(function(){
			//siblings:其余的div 去除 playing 的样式
			$(this).addClass("playing").siblings().removeClass("playing");
			player.playindex = $(this).data("index");
			player.playerPlay();
			
		})
	}
	
}
//更新进度条
player.updateRange();
//下一曲
$(".footer .next").click(function(){
	player.nextMusic();
})
//上一曲
$(".footer .prev").click(function(){
	player.prevMusic();
})
//暂停
$(".footer .pause").click(function(){
	player.playOrPause();
})
//更新进度
$(".range").on("change",function(){
	console.log("in");
	player.changeRange();
})


//播放方法
function Player () {
	// 播放方法中的音乐标签
	this.audio = document.getElementById("player");
	//当前播放音乐的编号
	this.playindex = 0;
	// 播放方法
	this.playerPlay = function(){
		$(this.audio).attr("src",musicModels[this.playindex].src);
		this.audio.play();
		$(".footer .picture img").attr("src",musicModels[this.playindex].img);
	}
	//更新进度条
	this.updateRange = function(){
		//替换引用
		_this = this;
		this.audio.ontimeupdate = function(){
			//更新进度条的最大值
			$(".range").attr("max", this.duration);
			//更新当前歌曲播放的时间位置
			$(".range").val(this.currentTime);
			// 歌曲播放完成时
			if(this.currentTime == this.duration){
				if(_this.playindex < musicModels.length-1){
					_this.playindex++;
				}
				else{
					_this.playindex = 0;
				}
				$(".content .music").eq(_this.playindex).addClass("playing").siblings().removeClass("playing");
				_this.playerPlay();
			}
		}
		
	}
	// 拉取进度条时
	this.changeRange = function(){
		console.log($(".range").val());
		_this = this;
		this.audio.ontimeupdate = function(){
			this.currentTime = $(".range").val();
			_this.playerPlay();
		}
	}
	// 下一首歌曲
	this.nextMusic = function(){
		if(this.playindex < musicModels.length-1){
			this.playindex++;
			this.playerPlay();
			// eq():选中某一行
			$(".content .music").eq(this.playindex).addClass("playing").siblings().removeClass("playing");
		}else{
			this.playindex = 0;
			this.playerPlay();
			// eq():选中某一行
			$(".content .music").eq(this.playindex).addClass("playing").siblings().removeClass("playing");
		}
	}
	//上一首
	this.prevMusic = function(){ 
		if(this.playindex > 0){
			this.playindex--;
			this.playerPlay();
			// eq():选中某一行
			$(".content .music").eq(this.playindex).addClass("playing").siblings().removeClass("playing");
		}else{
			this.playindex = musicModels.length - 1;
			this.playerPlay();
			// eq():选中某一行
			$(".content .music").eq(this.playindex).addClass("playing").siblings().removeClass("playing");
		}
	}
	// 暂停
	this.playOrPause = function(){
		if(this.audio.paused){
			this.audio.play();			
			$(".footer .pause img").attr("src", "img/stop.jpg");
			$(".footer .picture img").attr("style","-webkit-Animation-play-state:running");
		}else{
			this.audio.pause();
			$(".footer .pause img").attr("src", "img/play.png");
			$(".footer .picture img").attr("style","-webkit-Animation-play-state:paused")
		}
		
	}
		
	
}

















