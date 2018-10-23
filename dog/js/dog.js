
//设置动画画布
//1、2参数：画布的宽高
//3渲染
var x=2;
var choose=0;
var game=new Phaser.Game(900,420,Phaser.AUTO,"game_div");
//用户信息存储类
	var game_state={};
	game_state.dog=function(){};

	//原型
	game_state.dog.prototype={
	//首先调用的函数，加载所有的函数
	preload:function(){
		this.game.load.image('bg','img/bkg.png');
		this.game.load.image('dogRight','img/dog.png');
		this.game.load.image('line','img/line.PNG');
		this.game.load.image('dogLeft','img/dogleft.png');
		this.game.load.image('pipe','img/master.png');
		this.game.load.image('ms2','img/wood.png');
		this.game.load.audio('gameAudio',"mp3/game.mp3");
		this.game.load.audio('gameOver',"mp3/failed.mp3");
		this.game.load.audio('gamejump',"mp3/jumpp.mp3");
	},
	//设置游戏
	create:function(){
		this.game.add.sprite(0,0,'bg');
		
		this.dog=this.game.add.sprite(100,256,'dogRight');
		this.line=this.game.add.sprite(0,313,'line');
//		添加重力,改变Y轴
		this.dog.body.gravity.y=1000;
		//调用向右
		var right_key=this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		right_key.onDown.add(this.right,this);
		//调用向左
		var left_key=this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		left_key.onDown.add(this.left,this);
		//调用控空格
		var space_key=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump,this);
		//调用障碍物，包含20个障碍物
		this.pipes=game.add.group();
		this.pipes.createMultiple(20,'pipe');
		this.pipes1=game.add.group();
		this.pipes1.createMultiple(20,'ms2');
		//定时器,每隔1.5s出来一次障碍物
		this.timer=this.game.time.events.loop(1500,this.add_row_of_pipes,this);
	    var style={font:"30px Arial",fill:"#ffffff"};
	    this.label_score=this.game.add.text(20,20,"0",style);
	    //加载音乐
	    this.gameAudio=this.game.add.audio('gameAudio');
	      this.gameOver=this.game.add.audio('gameOver');
	        this.gamejump=this.game.add.audio('gamejump');
		this.gameAudio.play();
	},
	//狗和障碍物碰撞后，游戏结束
	restart_game:function(){
			this.game.time.events.remove(this.timer);
			alert("游戏结束");
			//点击确定，从新加载一次js文件
			this.gameOver.play();
			this.gameAudio.stop();
			this.game.state.start('dog');
		},
	//将障碍物添加在游戏界面
	add_one_pipe:function(x,y){
		if(choose==0){
//			获取障碍物到画布上
      		var pipe=this.pipes.getFirstDead();
      		pipe.reset(x,y);
      		pipe.body.velocity.x=-200;
//    		划出屏幕障碍物自动消失
			pipe.outOfBoundsKill=true;
			choose=1;
		}
		else{
			choose=0;
//			获取障碍物到画布上
      		var pipe=this.pipes1.getFirstDead();
      		pipe.reset(x,y);
      		pipe.body.velocity.x=-200;
//    		划出屏幕障碍物自动消失
			pipe.outOfBoundsKill=true;
		}
	},
//	1111111111111111111111111111111111111111
	add_row_of_pipes:function(){
		var hole = Math.floor(Math.random()*3);
		for(var i=0;i<3;i++){
			if(i!=hole&&i!=hole+1){
				this.add_one_pipe((i+1)*800,280);
			}
		}
		this.label_score+=1;
			this.label_score.content=this.score;
	},
land:function(){
	this.dog.body.velocity.y=-150;
	x=2;
},
update:function(){
	//小狗走出界面游戏结束
	if(this.dog.inWorld==false)
	{
		this.restart_game();
	}
//	检测狗和木板的碰撞
this.game.physics.overlap(this.dog,this.line,this.land,null,this);
//狗和障碍物的检测
this.game.physics.overlap(this.dog,this.pipes,this.restart_game,null,this);
//狗和障碍物的检测
this.game.physics.overlap(this.dog,this.pipes1,this.restart_game,null,this);
},
//向左移动
	left:function(){
		this.dog.body.velocity.x=-150;
		this.dog.loadTexture('dogLeft',0);
	},
	//向右移动
	right:function(){
		this.dog.body.velocity.x=150;
		this.dog.loadTexture('dogRight',0);
	},
	//跳跃
	jump:function(){
		if(x>0)
		{
		this.dog.body.velocity.y=-320;
		x--;
		this.gamejump.play();
		}
	},
};
//调用的方法
game.state.add('dog',game_state.dog);
game.state.start('dog');
