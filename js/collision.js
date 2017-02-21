//果实被鱼妈妈吃掉

//大鱼吃果实
function momFruitsCollision(){
	if (!data.gameOver) {
		for (var i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				//calculate length 
				//calLength函数封装在 commonFunctions.js 里
				//function calLength2(x1, y1, x2, y2) {
				// 	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
				// }
				// x1-x2的二次方 + y1-y2的二次方
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if(l < 900){
					//fruit eaten
					fruit.dead(i);
					
					data.fruitNum++;
					if (fruit.fruitType[i] == "blue") {
						data.double = 2;
					}else{
						data.double = 1;
					}

					mom.momBodyCount++;

					if (mom.momBodyCount > 7) {
						mom.momBodyCount =7;
					}
					//大鱼吃果实，涟漪特效
					wave.born(fruit.x[i], fruit.y[i]);
				}
			}
		}
	}
}

//大鱼和小鱼碰撞
function momBabyCollision(){
	if(data.fruitNum > 0 && !data.gameOver){
		var l = calLength2( mom.x, mom.y, baby.x, baby.y);
		if(l < 900){
			//baby recover
			baby.babyBodyCount = 0;
			//data 分数归零
			// data.reset();
			mom.momBodyCount = 0;
			data.addScore();

			//大鱼喂小鱼动画
			halo.born(baby.x, baby.y);
		}
	}
}
