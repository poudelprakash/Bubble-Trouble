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
	this.red;
	var that=this;
	this.init=function(){
		that.red=new Bubble(that);
		that.red.createBubble({bubbleId:"bubble-red",top:"60px",left:"60px",width:"30px"});
		setInterval(that.collisionCheck,10);
		var bullet=new Bullet(that);
		bullet.fireBullet();
		window.addEventListener("mousedown", bullet.fireBullet, false);
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