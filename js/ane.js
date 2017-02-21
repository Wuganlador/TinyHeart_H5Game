// function drawAne(){

// }
var aneObj = function(){
	//海葵摆动，利用二次贝塞尔曲线，起始点，控制点，结束点
	//需要在结束点用正弦函数控制，形成摆动
	this.rootx = [];   //开始值，即海葵根部
	this.headx = [];   //结束点x坐标，即海葵头部
	this.heady = [];  //结束点y坐标，

	this.alpha = 0;  //正弦角度，用于控制headx的摆动
	this.amp = [];   //控制振幅，控制摆动幅度

	// this.x = [];
	// this.len = [];
};

//设定海葵数量为50
aneObj.prototype.num = 70;

//初始化确定每个海葵的位置
aneObj.prototype.init = function(){
		for (var i = 0; i < this.num; i++) {
			//海葵的位置及高度
			this.rootx[i] = i * 15 + Math.random() * 20; 
			this.headx[i] = this.rootx[i];   
			this.heady[i] = canHeight - 260 + Math.random() * 60;  

			// this.len[i] = 170 + Math.random() * 40;
			this.amp[i] = Math.random() * 50 + 30;  //摆动幅度

		}
};

//画图，画海葵
aneObj.prototype.draw = function(){

	this.alpha += deltaTime * 0.002;   //this.alpha随着时间不断的增加(x轴)
	var l = Math.sin(this.alpha);  //y轴正弦函数，控制头部的摆动[-1, 1];

	//save()和restore()表示二者所在之间的代码，只在二者间有效
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";//strokeStyle一定要写在stroke前面，刷子应该先有刷头
	
	for (var i = 0; i < this.num; i++) {
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();//告诉要画图了
		
		//起始点，海葵根部
		ctx2.moveTo(this.rootx[i], canHeight);
		
		//当前海葵头部的具体位置
		this.headx[i] = this.rootx[i] + l * this.amp[i] * 0.5;  

		//quadraticCurveTo( 控制点x, y, 结束点x, y)
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i], this.heady[i]);  
		
		ctx2.stroke();
	}

	ctx2.restore();
};
