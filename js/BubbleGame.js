'use strict';
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");
	this.player;
	this.initialBubble;
	this.bullet;
	this.collisionInterval;
	var that=this;
	this.init=function(){
		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		that.bullet=new Bullet(that);//instance of bullet
		that.initialBubble=new Bubble(that);//instance of bubble
		that.initialBubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:"30px"});
		that.collisionInterval=setInterval(that.collisionCheck,120);

		document.addEventListener('keydown', that.onkeydown, false);
	}
	that.onkeydown=function(event){
		if(event.keyCode == 32){//for space key
			that.bullet.fireBullet();
		}
		if(event.keyCode == 37 ){//for left Arrow
			that.player.moveLeft();
		}
		if(event.keyCode == 39){//for Right Arrow
			that.player.moveRight();
		}
	}
	this.collisionCheck=function (argument){
		console.log(that.collisionInterval);
		// console.log("bubble"+that.initialBubble.bubbleAnimations[0].positionX);
		// console.log("bullet"+that.bullet.bulletPosX);

		// if(that.initialBubble.bubbleAnimations[0].positionX<that.bullet.bulletPosX && that.initialBubble.bubbleAnimations[0].positionX>(that.bullet.bulletPosX-30)){
		// 	that.initialBubble.splitBubble(0);
		// }else if(that.initialBubble.bubbleAnimations[1].positionX<200 && that.initialBubble.bubbleAnimations[1].positionX>160){
		// 	that.initialBubble.splitBubble(1);
		// 	console.log("hello"+that.initialBubble.bubbleAnimations[1]);
			
		// }else if(that.initialBubble.bubbleAnimations[2].positionX<200 && that.initialBubble.bubbleAnimations[2].positionX>160){
		// 	that.initialBubble.splitBubble(2);
			
		// }

		// if(that.bullet.fired=="true"){
		// 	if(that.initialBubble.bubbleAnimations[0].positionX<that.bullet.bulletPosX && that.initialBubble.bubbleAnimations[0].positionX>(that.bullet.bulletPosX-30)){
		// 		if(that.initialBubble.bubbleAnimations[0].positionY>that.bullet.bulletPosY){
		// 		console.log('thokki ta halyo');
		// 		clearInterval(that.collisionInterval);
		// 		clearInterval(that.initialBubble.bubbleAnimations[0].intervalIds[0]);
		// 		that.initialBubble.splitBubble(0);
		// 		that.initialBubble.splitBubble(1);
		// 		that.initialBubble.splitBubble(2);
		// 		}
		// 	}
			// } else if(that.initialBubble.bubbleAnimations[1].positionX<that.bullet.bulletPosX && that.initialBubble.bubbleAnimations[1].positionX>(that.bullet.bulletPosX-20)){
			// 	clearInterval(that.collisionInterval);
			// 	that.initialBubble.splitBubble(1);
			// 	that.initialBubble.splitBubble(2);
				
			// }
		// }
		// for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
		// 	//collision with bullet
		// 	// && that.initialBubble.bubbleAnimations[i].positionY>that.bullet.bulletPosY
		// 	if(that.bullet.fired=="true"){
		// 		if(that.initialBubble.bubbleAnimations[i].positionX==that.bullet.bulletPosX){
		// 			console.log('collided');
		// 			that.initialBubble.splitBubble(i);
		// 		}	
		// 	}
		// collision with bullet
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			if(that.bullet.fired=="true"){
				if(that.initialBubble.bubbleAnimations[i].positionX<that.bullet.bulletPosX && that.initialBubble.bubbleAnimations[0].positionX>(that.bullet.bulletPosX-30)){
					if(that.initialBubble.bubbleAnimations[i].positionY>that.bullet.bulletPosY){
					console.log('thokki ta halyo');
					clearInterval(that.collisionInterval);
					clearInterval(that.initialBubble.bubbleAnimations[i].intervalIds[i]);
					that.initialBubble.splitBubble(i);
					break;
					// that.initialBubble.splitBubble(i);
					}
				}
			}
			//collision with player
			if(that.initialBubble.bubbleAnimations[i].positionX>(that.player.playerPosX-parseInt(that.initialBubble.bubbles[i].style.width)) && that.initialBubble.bubbleAnimations[i].positionX<(that.player.playerPosX+that.player.playerWidth)){
				if(that.initialBubble.bubbleAnimations[i].positionY>(400-(that.player.playerHeight+parseInt(that.initialBubble.bubbles[i].style.height)))){
					clearInterval(that.initialBubble.bubbleAnimations[i].intervalIds[i]);
					clearInterval(that.collisionInterval);
					that.player.lives--;
					console.log(that.player.lives);
				}
			}
		};

	}

}
var game=new BubbleGame();
game.init();