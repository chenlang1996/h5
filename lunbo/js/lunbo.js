var timer=null;
//当前显示图片
var index=0;
//即将显示的图片
var next=0;
//调用开始滑动函数
autoplay();
//封装一个滑动函数
function scrollPlay(){
//	向左滑动，即将显示的大于当前显示
//小方框滑动
$("#list li").eq(next).addClass("fill").siblings().removeClass("fill");
if(index<next)
{
//	eq()选取带有指定index下标值得元素
//关掉所有的附带的动画效果stop(true,true)
//当前图片划出去
	$("#imgbox img").eq(index).stop(true,true).animate({"left":"-720px"});
//	图片划入
	$("#imgbox img").eq(next).css("left","720px").stop(true,true).animate({"left":"0px"});
}
else if(index>next)
{
	//当前图片划出去
	$("#imgbox img").eq(index).stop(true,true).animate({"left":"720px"});
//	图片划入
	$("#imgbox img").eq(next).css("left","-720px").stop(true,true).animate({"left":"0px"});
}
}
//开始滑动
function autoplay(){
	timer=setInterval(function(){
		next++;		
		if(next > 7)
		{
			next = 0;
		}
		scrollPlay();
		index=next;
	},1500);
}
//鼠标经过小方格
//mouseover()当鼠标指针位于元素上方,发生事件
$("#list li").mouseover(function(){
//		清除计时器
    clearInterval(timer);
    next=$(this).index();
    scrollPlay();
    index=next;
}).mouseout(function(){
	autoplay();
});
$(".btnleft").click(function(){
	clearInterval(timer);
	next++;
    if(next>7)
    {
    	next=0;
    }
    scrollPlay();
    index=next;
    autoplay();
});
$(".btnright").click(function(){
	clearInterval(timer);
	next--;
    if(next<0)
    {
    	next=7;
    }
    scrollPlay();
    index=next;
    autoplay();
});