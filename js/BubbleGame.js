'use strict';
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");
	this.player;
	this.initialBubble;
	this.bullet;
	var that=this;
	this.init=function(){
		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		that.bullet=new Bullet(that);//instance of bullet
		that.initialBubble=new Bubble(that);//instance of bubble
		that.initialBubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:"30px"});
		setInterval(that.collisionCheck,40);
		document.addEventListener('keydown', that.onkeydown, false);
	}
	that.onkeydown=function(event){
		if(event.keyCode == 32){//for space key
			that.bullet.fireBullet();
		}
		if(event.keyCode == 37){//for left Arrow
			that.player.moveLeft();
		}
		if(event.keyCode == 39){//for Right Arrow
			that.player.moveRight();
		}
	}
	this.collisionCheck=function (argument){
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			//collision with bullet
			// && that.initialBubble.bubbleAnimations[i].positionY>that.bullet.bulletPosY
			if(that.bullet.fired=="true"){
				if(that.initialBubble.bubbleAnimations[i].positionX==that.bullet.bulletPosX){
					that.initialBubble.splitBubble(i);
				}	
			}
			//collision with player
			if(that.initialBubble.bubbleAnimations[i].positionX==that.player.posX){
				console.log('player maryo');
			}
		};
		
	}

}
var game=new BubbleGame();
game.init();