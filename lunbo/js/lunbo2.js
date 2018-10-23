var timer=null;
var nowpage=8;
function lunbo(){
	timer=setInterval(function(){
		nowpage--;
		$("#imgbox img").eq(nowpage).fadeIn();
		
		if(nowpage<1)
		{
			nowpage=8;
		}
		$("#imgbox img").eq(nowpage).fadeOut();
	},1000);
}
lunbo();