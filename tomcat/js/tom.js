
var cymbal=document.getElementById("cymbal");
cymbal.onclick=function(){
	start("cymbal",13);
}
var drink=document.getElementById("drink");
drink.onclick=function(){
	start("drink",80);
}
var eat=document.getElementById("eat");
eat.onclick=function(){
	start("eat",39);
}


var fart=document.getElementById("fart");
fart.onclick=function(){
	start("fart",27);
}
var pie=document.getElementById("pie");
pie.onclick=function(){
	start("pie",23);
}
var scratch=document.getElementById("scratch");
scratch.onclick=function(){
	start("scratch",55);
}
//做我的计时器
var timer=null;
//播放动画（动画名称，图片总数）
function start(name,count){
	clearInterval(timer);
	var index=0;
	//获取元素
	var cat=document.getElementById("cat");
	//设置计时器，依次切换图片
	timer=setInterval(function(){
		if(++index<count)
		{
			cat.src=getImage(name,index);
		}
		else{
			clearInterval(timer);
		}
	},80);
}




//图片的路径拼接(动画名称，当前显示)
function getImage(name,index){
//	img/Animations/angry/angry_00.jpg" id="cat
    return "img/Animations/"+name+"/"+name+"_"+getIndex(index)+".jpg";
}


//处理是否带0的问题
function getIndex(index){
//	如果小于10,字符串拼接10
	if(index<10)
	{
		return "0"+index;
	}
	else{
		return index;
	}
}
