
animates();
//封装显示函数
function animates(){
	//创建一个画布
	var canvas=document.createElement("canvas");
//	在body加入canvas
	document.body.appendChild(canvas);
	canvas.style.background="black";
	//宽高与屏幕相同
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	var context=canvas.getContext("2d");
//	创建一个数组用于存储粒子坐标
	var particles=[];
	loop();
//	定义一个随机产生粒子的方法
    function loop(){
    	
    	setInterval(function(){
    		//清空画布
    		context.clearRect(0,0,canvas.width,canvas.height);
//  		寻找出粒子的中心点
            var part = new particle(canvas.width*0.5,canvas.height*0.5);
//          将坐标存入数组
            particles.push(part);
            //循环遍历数组
            for(var i=0;i<particles.length;i++)
            {
            	//更新粒子位置
            	particles[i].upData();
            }
    	},30);
//  	封装一个函数来随机产生粒子的坐标
    };
    function particle(xPos,yPos){
//  	定义particle的属性
        this.xPos=xPos;
        this.yPos=yPos;
        this.yVal=-7;
        //残生随机数
        var temp=Math.random()*1;
        this.xVal=Math.random()*8;
        if(temp<=0.5)
        {
        	this.xVal=this.xVal*(-1);
        }
        this.draw=function(){
        	context.beginPath();
        	context.arc(this.xPos,this.yPos,5,0,2*Math.PI,false);
        	context.closePath();
        	context.fill();
        };
        this.upData=function(){
        	if(this.yPos>0)
        	{
        	this.yPos=this.yPos+this.yVal;
        	}else{
        		this.yVal=7;
        		this.yPos=this.yPos+this.yVal;
//      		alert("妈的法克儿");
        	}
        	this.xPos=this.xPos+this.xVal;
        	context.fillStyle=getColor();
            this.draw();
        };
        function getColor(){
//      	封装颜色 #DB7093         16777215为固定值 10进制取数然后转换成16进制
            return "#"+Math.floor(Math.random()*16777215).toString(16);
        };
    };
}
