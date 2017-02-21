// 2-7 大鱼绘制
// 问题一，如果没有函数，大鱼的线条会变得很粗
// 因为每一帧的动画都会重叠所以要一个函数把上一帧的动画清除。
var momObj = function(){
	this.x;
	this.y;
	this.angle;//判断角度用来翻转大鱼方向

	this.momTailTimer = 0;//尾巴运动时间
	this.momTailCount = 0;//对尾巴图标标记计数

	this.momEyeTimer = 0;//眨眼睛单位时间间隔
	this.momEyeCount = 0;//眨眼睛图片标记计数
	this.momEyeInterval = 1000;//单独调节的一个时间量

	this.momBodyCount = 0;
};

momObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
}

//鱼画在画布1上
momObj.prototype.draw = function(){
	
	//lerp x y
	//lerp使得一个值趋向于目标值
	//我们把函数封装在了commonFunctions.js
	//原函数：
	//	function lerpDistance(aim, cur, ratio) {//aim目标值，cur当前值，ratio百分比
	// 		var delta = cur - aim;
	// 		return aim + delta * ratio;
	// }
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//delta angle
	//Math.atan2(y, x)正切来判断
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI, PI
	//lerp angle, 函数封装在 commonFunctions.js 里
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//尾巴动画
	this.momTailTimer += deltaTime;
	if (this.momTailTimer > 45) {
		this.momTailCount = (this.momTailCount+1)%8;
		this.momTailTimer %= 45;
	}
	//眨眼睛动画
	this.momEyeTimer += deltaTime;
	if (this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;

		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random()* 1500+2000;
		}else{
			this.momEyeInterval = 200;
		}
	}

	//方便统一调节这三张图片的调节
	//所以这里用save函数，保证该段之间代码仅仅适用于大鱼，
	//和使用到translate函数指定一个相对的原点值
	ctx1.save();
	ctx1.translate(this.x, this.y);    //大鱼的坐标位置
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	var momEyeCount = this.momEyeCount;
	var momBodyCount = this.momBodyCount;

	if (data.double == 1) {//orange
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width*0.5, -momBodyOra[momBodyCount].height*0.5);

	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width*0.5, -momBodyBlue[momBodyCount].height*0.5);
	}

	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width*0.5, -momEye[momEyeCount].height*0.5);
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width*0.5+30, -momTail[momTailCount].height*0.5);
	
	ctx1.restore();
}