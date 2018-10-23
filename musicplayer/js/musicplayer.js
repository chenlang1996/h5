//定义一个数组
var musicModels=[];
//创建player对象
var player = new Player();
getData();
//调用进度条
player.rangeup();
//点击暂停音乐
$(".footer .pause").click(function(){
	player.pause();
});
//点击上一曲
$(".footer .prev").click(function(){
	player.prevMusic();
});
//上一曲
$(".footer .next").click(function(){
	player.nextMusic();
});
function Player(){
	this.audio=document.getElementById("audio");
	this.playIndex=0;
	//监听
	this.audio.loop=false;
	this.audio.addEventListener("ended",function(){
		player.nextMusic();
	},false);
	
	this.playMusic=function(){
		$(this.audio).attr("src",musicModels[this.playIndex].src);
		this.audio.play();
		$(".footer .pic img").attr("src",musicModels[this.playIndex].img);
//		每次在播放音乐将暂停图片替换成播放图片
	$(".footer .pause img").attr("src","img/stop.png");
	}
//	定义播放音乐的按钮
this.pause=function(){
//	判断音乐是否为暂停状态
		if(this.audio.paused)
		{
			this.audio.play();
			$(".footer .pause img").attr("src","img/stop.png");
		}else{
			this.audio.pause();
			$(".footer .pause img").attr("src","img/play.png");
		}
}
this.rangeup=function(){
	this.audio.ontimeupdate=function(){
		$(".footer .range").attr("max",this.duration);
		$(".footer .range").val(this.currentTime);
	}
}
//上一曲
this.prevMusic=function(){
	if(this.playIndex==0){
//		如果是第一首歌,点击上一曲,播放最后一曲
		this.playIndex=musicModels.length-1;
	}else{
//		否则播放上一首
		this.playIndex--;
	}
	$(".musicbox .music").eq(this.playIndex).addClass("playBg").siblings().removeClass("playBg");
	//播放音乐
	this.playMusic();
}
this.nextMusic=function(){
	if(this.playIndex==musicModels.length-1){
//		如果是第一首歌,点击上一曲,播放最后一曲
		this.playIndex=0;
	}else{
//		否则播放上一首
		this.playIndex++;
	}
	$(".musicbox .music").eq(this.playIndex).addClass("playBg").siblings().removeClass("playBg");
	//播放音乐
	this.playMusic();
}
}
function getData(){
	$.getJSON("pbl.json",function(data){
//		当数据请求成功,会调用这个function
//data就是我们解析成功要拿到的数据
for(var i=0;i<data.length;i++){
//	解析字段
var music=new Music(data[i].img,data[i].musicName,data[i].name,data[i].num,data[i].src);
musicModels.push(music);
}
//想页面插入数据
inserData();
//进来就直接播放音乐
player.playMusic();
	});
}
//封装用于描述数据里面具体的字段
function Music(img,musicName,name,num,src){
	this.img =img;
	this.musicName=musicName;
	this.name=name;
	this.num=num;
	this.src=src;
	
}
//封装一个插入数据
function inserData(){
	for(var i=0;i<musicModels.length;i++)
	{
		var $div=$("<div class='music' data-index="+i+"><div/>");
//		插入到music
   				$(".page .musicbox").append($div);
	
				var $img=$("<img src="+musicModels[i].img+"/>");
//					将img标签添加到div
				$div.append($img);
//				创建一个
				var $p=$("<p>"+musicModels[i].musicName+"--"+musicModels[i].name+"</p>");
				$div.append($p);
//				判断是否为第一首歌
				if(i==0)
				{
					$div.addClass("playBg");
				}
			//给div添加点击事件
				$div.click(function(){
				player.playIndex=$(this).data("index");
				player.playMusic();
				$(this).addClass("playBg").siblings().removeClass("playBg");
		});
	}
}
