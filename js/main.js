var can1;//画布
var can2;

var ctx1;//场景
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一帧
var deltaTime;//每两帧之间的时间间隔，用来保证动画流程


var bgPic = new Image();

var ane;
var fruit;

var mom;
var mx;
var my;
var momTail = [];
var momEye = [];
//大鱼身体两种颜色颜色动画效果
var momBodyOra = [];
var momBodyBlue = [];

var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];

var data;//得分
var wave;//大鱼吃果实特效
var halo;//大鱼吃果实后和小鱼分享特效

var dust;  //漂浮物
var dustPic = [];

document.body.onload = game;
function game(){
	init();
	
	lastTime = Date.now();
	deltaTime = 0;

	gameloop();
	
}
function init(){
	can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
	ctx1 = can1.getContext("2d");//API获取场景
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext("2d");

	bgPic.src = "./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();


//大鱼
	mom = new momObj();
	mom.init();

	// 初始化鼠标坐标位置
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	//监测鼠标移动坐标
	can1.addEventListener('mousemove', onMouseMove, false);

	//大鱼尾巴摆动动画，由依次显示八张图片来实现
	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail"+i+".png";
	}
	//大鱼眨眼睛
	for (var i = 0; i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye"+i+".png";
	}
	//大鱼身体动画
	for (var i = 0; i < 8; i++){
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "./src/bigSwim"+i+".png";
		momBodyBlue[i].src = "./src/bigSwimBlue"+i+".png";
	}


// 小鱼
	baby = new babyObj();
	baby.init();

	//小鱼尾巴摆动动画，由依次显示八张图片来实现
	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail"+i+".png";
	}

	//小鱼眨眼睛
	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye"+i+".png";
	}

	//小鱼眨眼睛
	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade"+i+".png";
	}

//得分分数
	data = new dataObj();

	//优化分数样式不必每一帧都执行，只要定义依次就可以了
	ctx1.font = "30px Verdena";
	ctx1.textAlign = "center";//left center right

//圆圈特效
	//大鱼吃果实特效
	wave = new waveObj();
	wave.init();

	//小鱼圆圈特效
	halo = new haloObj();
	halo.init();

	//漂浮物
	dust = new dustObj();
	for(var di = 0; di < 7; di++) {
		dustPic[di] = new Image();
		dustPic[di].src = "src/dust" + di + ".png";
	}
	dust.init();

}

//动画刷新频率
function gameloop(){
	window.requestAnimFrame(gameloop);
	//requestAniFrame相对更加智能，是另外专门写的一个外部js里的函数，能等待加载完。
	//setInterval,setTimeout缺点是，如果内容很大定时一毫秒加载不完也执行。
	
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	// 遇到的bug，浏览器切换到别的页面后一段时间切换回来，果实图片变得很大、
	if (deltaTime > 40) deltaTime = 40;

	// console.log(deltaTime);
	drawBackground();
	ane.draw();
	
	fruitMonitor();
	fruit.draw();

	// 因为每一帧的动画都会重叠所以要一个自带函数clearRect把上一帧的动画清除。
	// 这里清除范围是从画布场景的（0,0）点到画布的对角线(canWidth, canHeight)
	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();

	momFruitsCollision();

	baby.draw();
	momBabyCollision();

	data.draw();

//圆圈特效
	wave.draw();
	halo.draw();

	dust.draw();  // 漂浮物
}

//鱼妈妈，监测鼠标坐标
function onMouseMove(e){
	if (!data.gameOver) {
		if (e.offsetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
			// console.log(mx, my);
		}
	}
}
