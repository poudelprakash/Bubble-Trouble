'use strict';
/*--------------------------------------level-1----------------------------------------*/
// var green=new Bubble();
// green.createBubble({bubbleId:"bubble-green"});
// window.addEventListener("mousedown", green.splitBubble, false);
/*--------------------------------------level-2----------------------------------------*/

// var yellow=new Bubble();
// yellow.createBubble({bubbleId:"bubble-yellow"});
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");
	this.player;
	this.initialBall;
	this.bullet;
	var that=this;
	this.init=function(){
		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		that.bullet=new Bullet(that);//instance of bullet
		that.initialBall=new Bubble(that);//instance of bubble
		that.initialBall.createBubble({bubbleId:"bubble-red",top:"60px",left:"60px",width:"30px"});
		// setInterval(that.collisionCheck,100);
		document.addEventListener('keydown', that.onkeydown, false);
		// document.addEventListener("mousedown", that.bullet.fireBullet, false);
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
		for (var i = 0; i < that.red.bubbles.length; i++) {
			// console.log(that.red.bubbles[i]);
			if(that.red.bubbles[i].style.left=="300px"){
				if(that.red.bubbles[i].style.top=="20px"){
					that.red.splitBubble();
				}
				// console.log(that.red.bubbles[i].style.left);	
			}
		};
		
	}

}
var game=new BubbleGame();
game.init();