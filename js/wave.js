var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];//半径
}
waveObj.prototype.num = 10;	//物体池，存放一个个圈圈

waveObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

waveObj.prototype.draw = function(){

	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";

	for(var i = 0; i < this.num; i++){
		if (this.alive[i]) {
			//api
			this.r[i] += deltaTime * 0.05;
			if (this.r[i] > 50) {
				this.alive[i] = false;
				break;//因为如果透明度大于１或者是个负数，透明度会认为为1，避免这种bug，这里用到break
			}
			var alpha = 1 - this.r[i]/50;

			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i],　this.r[i], 0, Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255, 255, 255," + alpha +")";
			ctx1.stroke();//绘制的命令，没有是不会画图的
			//draw

		}
	}
	ctx1.restore();
}

waveObj.prototype.born = function(x, y){
	for (var i = 0; i < this.num; i++) {
		if (!this.alive[i]) {
			//born
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;

		}
	}
}