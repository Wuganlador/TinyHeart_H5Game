//设计说明：
//	果实动画有两种状态：长大和结果
//	游戏画面保持，果实数量15个
//	
//	果实出现位置偏移，离目标位置偏右下偏移？
//	怎么避免果实重叠？
//	
//	遇到的bug，浏览器切换到别的页面后一段时间切换回来，果实图片变得很大、
//	原因：jq浏览器的特性，当不再当前页的时候会有一段不执行的状态。（视频2-6‘06:5）
//	


		// this.born(i);

var fruitObj = function(){
	this.alive = [];//bool
	this.orange = new Image();
	this.blue = new Image();

	this.x = [];
	this.y = [];

	this.aneNO = [];//海葵该标记
	this.fruitType = []; //该果实的样式，橙色或蓝色

	this.l = [];//表示该果实图片变化的长度
	this.spd = [];//该果实成长和果实上浮的速度
};

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){

	for(var i = 0; i<this.num; i++){

		this.alive[i] = false;

		this.x[i] = 0;
		this.y[i] = 0;

		this.aneNO[i] = 0;
		this.fruitType[i] = "";//这里让果实是个空
		this.l[i] = 0;
		this.spd[i] = Math.random()*0.017 + 0.003;//[0.003, 0.02)

	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
};
fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		//draw
		//find an ane , grow, fly up 
		if(this.alive[i]){

			//判断是出现蓝色果实还是橙色果实
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			}
			else{
				var pic = this.orange;
			}


			//如果果实长大，果实大小小于14，则每帧长大
			//否则，果实y轴坐标减少开始向上运动
			if(this.l[i] <= 14){

				var NO = this.aneNO[i];
				//果实当前帧的(x, y)坐标
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];

				this.l[i] += this.spd[i]*deltaTime;

				//让果实生长在海葵顶部位置,随着海葵摇摆
				ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
			}
			else{
				this.y[i] -= this.spd[i]*7*deltaTime;

				//让果实生长在海葵顶部位置,果实上升，不随着海葵摇摆
				ctx2.drawImage(pic, this.x[i]-this.l[i] / 2, this.y[i]-this.l[i] / 2, this.l[i], this.l[i]);
			}

			//当该果实上浮到接近上边框时，标记为死去
			if (this.y[i] < 10) {
				this.alive[i] = false;
			}

		 }//console.log(fruitObj.prototype.num);

	}
};

fruitObj.prototype.born = function(i){

	//根据海葵数量给每个海葵标记第几个
	this.aneNO[i] = Math.floor(Math.random()*ane.num);//floor整数值

	this.l[i] = 0;
	this.alive[i] = true;

	var ran = Math.random();
	if (ran < 0.2) {
		this.fruitType[i] = "blue";
	}
	else{
		this.fruitType[i] = "orange";
	}
};

// fruitObj.prototype.update = function(){
// 	var num = 0;
// 	for(var i= 0; i<this.num;i++){
// 		if(this.alive[i]) num++;
// 	}
// };

// 判断当前屏幕上有多少个果实
function fruitMonitor(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++){
		if (fruit.alive[i]) num++;
	}
	if (num < 15){
		//send fruit
		sendFruit();
		return;
	}
}

function sendFruit(){
	for (var i = 0; i < fruit.num; i++){
		if (!fruit.alive[i]){
			fruit.born(i);
			return;//当该果实出生后，本次循环已结束
		}
	}

}

//果实被鱼妈妈吃掉
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;

};