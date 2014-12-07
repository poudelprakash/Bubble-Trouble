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
	this.initialBubble;
	this.bullet;
	var that=this;
	this.init=function(){
		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		that.bullet=new Bullet(that);//instance of bullet
		that.initialBubble=new Bubble(that);//instance of bubble
		that.initialBubble.createBubble({bubbleId:"bubble-red",top:"60px",left:"60px",width:"30px"});
		// setInterval(that.collisionCheck,100);
		document.addEventListener('keydown', that.onkeydown, false);
		document.addEventListener("mousedown", that.initialBubble.splitBubble, false);
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
		if(event.keyCode == 38){//for left Arrow
			that.collisionCheck();
		}
	}
	this.collisionCheck=function (argument){
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			console.log('he');
		};
		
	}

}
var game=new BubbleGame();
game.init();