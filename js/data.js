var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;//字体透明度，这里我们想要有个渐进的效果
}

// dataObj.prototype.reset = function(){
// 	this.fruitNum = 0;
// 	this.double = 1;
// }

dataObj.prototype.draw = function(){
	var w = can1.width;
	var h = can1.height;

	ctx1.save();

	ctx1.shadowBlur = 10;//字体外边框阴影
	ctx1.shadowColor = "white";//字体外边框阴影颜色
	ctx1.fillStyle = "white";

	// ctx1.fillText("Double "+ this.double, w*0.5, h-80);
	// ctx1.fillText("Num "+ this.fruitNum, w*0.5, h-50);
	ctx1.fillText("Score "+ this.score, w*0.5, h-50);
	ctx1.restore();

	ctx1.save();
	
	//字体样式
	ctx1.font = "50px Verdana";
	ctx1.shadowColor = "white";
	ctx1.shadowBlur = 10;

	if (this.gameOver) {
		this.alpha += deltaTime * 0.0005;
		if (this.alpha > 1) {
			this.alpha = 1;
		}
		// ctx1.fontSize = "60px";
		ctx1.fillStyle = "rgba(255, 255, 255," + this.alpha + ")";
		ctx1.fillText("Game Over", w*0.5, h*0.5);
	}

	ctx1.restore();
}

dataObj.prototype.addScore = function(){
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}