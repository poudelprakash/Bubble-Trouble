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
		console.log("checking collision");
		// collision with bullet
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			if(that.bullet.fired=="true"){
				if(that.initialBubble.bubbleAnimations[i].positionX<that.bullet.bulletPosX && that.initialBubble.bubbleAnimations[0].positionX>(that.bullet.bulletPosX-30)){
					if(that.initialBubble.bubbleAnimations[i].positionY>that.bullet.bulletPosY){
					console.log('thokki ta halyo');
					clearInterval(that.collisionInterval);
					setInterval(that.collisionCheck, 120)
					clearInterval(that.initialBubble.bubbleAnimations[i].intervalIds[i]);
					that.initialBubble.bubbleAnimations[i].intervalIds.splice(i, 1);
					that.initialBubble.splitBubble(i);
					break;
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