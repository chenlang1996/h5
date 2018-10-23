$("#piclist img").click(function(){
//	获得当前的下标
	var index=$(this).index();
	//传值
	for(var i=0;i<5;i++)
	{
//		img/show/0/1.jpg 凭借图片
		var url="img/show/"+index+"/"+(i+1)+".jpg";
		//替换路径
		$("#showImage img").eq(i).attr("src",url);
	}
//	显示图层,遮光板
    $("#pan").fadeIn(600);
    $("#show").fadeIn(600);
});
$("#pan").click(function(){
	$(this).fadeOut(600);
    $("#show").fadeOut(600);
});
var nowpage=0;
$("#prev").click(function(){
	//移动第一张
	$("#showImage img:first").animate({"left":"-650px"},500,function(){
		$(this).animate({"left":"0px"},500);
		//将图片插入
		$("#showImage").append($(this));           
	});
	//		其他图片向右移动
	$("#showImage").animate({"left":"60%"},500);
	$("#showImage").animate({"left":"50%"},500);
});
$("#next").click(function(){
	//移动第一张
	$("#showImage img:last").animate({"left":"-650px"},500,function(){
		$(this).animate({"left":"0px"},500);
		//将图片插入
		$("#showImage").prepend($(this));           
	});
	//		其他图片向右移动
	$("#showImage").animate({"left":"60%"},500);
	$("#showImage").animate({"left":"50%"},500);
});



