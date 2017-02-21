var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer = 0;//尾巴运动时间
	this.babyTailCount = 0;//对尾巴图标标记计数

	this.babyEyeTimer = 0;//眨眼睛时间
	this.babyEyeCount = 0;//眨眼睛标记计数
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;//眨眼睛时间
	this.babyBodyCount = 0;//眨眼睛标记计数
};

babyObj.prototype.init = function(){
	this.x = canWidth*0.5 - 50;
	this.y = canHeight*0.5 + 50;
	this.angle = 0;

};

babyObj.prototype.draw = function(){

	//lerp x y，lerp使得一个值趋向于目标值
	this.x = lerpDistance(mom.x + 30, this.x, 0.98);
	this.y = lerpDistance(mom.y + 30, this.y, 0.98);

	//delta angle
	//Math.atan2(y, x)正切来判断
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI, PI
	//lerp angle, 函数封装在 commonFunctions.js 里
	this.angle = lerpAngle(beta, this.angle, 0.6);

	// baby tail count
	// 尾巴摆动动画
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	// baby eye count
	// 眼睛眨眼动画，让眨眼时间比较短，睁眼时间比较长，随机眨眼
	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if (this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random()*1500 + 2000;//[,)
		}else{
			this.babyEyeInterval = 200;
		}
	}

	//baby body
	//身体变白动画
	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount >19) {
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
		}
		
	}

	//ctx1
	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	var babyEyeCount = this.babyEyeCount;
	var babyBodyCount = this.babyBodyCount;

	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
	//眼睛代码放在最后执行，不然被身体覆盖了
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
	ctx1.restore();


};
