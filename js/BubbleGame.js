'use strict';
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller
	// fixes from Paul Irish and Tino Zijdel
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
//code of bubble game starts;
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");
	var scoreboardDisplay = document.getElementById("score");
	var livesDisplay = document.getElementById("lives");
	this.player;
	this.initialBubble;
	this.bullet;
	this.score=0;
	this.collisionInterval;
	this.punch = new Audio("sounds/punch.mp3"); // sound when bubble hits player
	var that=this;
	this.init=function(){
		//initial function of game loop
		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		that.bullet=new Bullet(that);//instance of bullet
		that.initialBubble=new Bubble(that);//instance of bubble
		that.initialBubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:"40px"});
		that.collisionInterval=setInterval(that.collisionCheck,20);
		document.addEventListener('keydown', that.onkeydown, false);
	}
	that.onkeydown=function(event){
		// keyboard keys handler
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
		scoreboardDisplay.innerHTML=that.score;
		//function to check collision with bullet and player
		// console.log("checking collision");
		// collision with bullet
		// console.log(that.initialBubble.bubbles.length);
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			// console.log(that.initialBubble.bubbles[i].bubbleWidth);
			// console.log('bubble'+i+"position"+that.initialBubble.bubbleAnimations[i].positionX);	
			// console.log(that.initialBubble.bubbles[i].bubbleWidth);
			// console.log(i+that.initialBubble.bubbleAnimations[i].positionX);
			// console.log('bullet'+that.bullet.bulletPosX);
			// console.log('bulletWidth'+that.bullet.bulletWidth);
			// console.log('bubble width'+that.initialBubble.bubbles[i].bubbleWidth);
			if(that.bullet.fired=="true"){
				if(that.initialBubble.bubbleAnimations[i].positionX>(that.bullet.bulletPosX+that.bullet.bulletWidth-that.initialBubble.bubbles[i].bubbleWidth) && that.initialBubble.bubbleAnimations[i].positionX<(that.bullet.bulletPosX+that.bullet.bulletWidth)){
						if((that.initialBubble.bubbleAnimations[i].positionY+that.initialBubble.bubbles[i].bubbleWidth)>that.bullet.bulletPosY){
							console.log('bubble collided')
							clearInterval(that.initialBubble.bubbleAnimations[i].intervalId);//clear bubble update interval
							that.initialBubble.splitBubble(i);//split bubble till end
							that.initialBubble.bubbleAnimations.splice(i, 1);
							console.log(that.initialBubble.bubbleAnimations);
							console.log(that.initialBubble.bubbles);
							that.initialBubble.bubbles.splice(i, 1);//remove bubble from array
							that.bullet.destroyBullet();//clears bullet update interval and removes bullet
							clearInterval(that.collisionInterval);
							that.collisionInterval=setInterval(that.collisionCheck, 20);
						}
					}
			}
			// collision with player
			// if(that.initialBubble.bubbleAnimations[i].positionX>(that.player.playerPosX-parseInt(that.initialBubble.bubbles[i].bubbleWidth)) && that.initialBubble.bubbleAnimations[i].positionX<(that.player.playerPosX+that.player.playerWidth)){
			// 	if(that.initialBubble.bubbleAnimations[i].positionY>(400-(that.player.playerHeight+parseInt(that.initialBubble.bubbles[i].bubbleWidth)))){
			// 		that.punch.play();
			// 		clearInterval(that.initialBubble.bubbleAnimations[i].intervalId);
			// 		clearInterval(that.collisionInterval);
			// 		that.reset();
			// 		break;
			// 	}
			// }
		};
	}
	//reset function
	this.reset=function(){	
		if(that.player.lives>1){
			that.player.lives--;
			livesDisplay.innerHTML=that.player.lives;
			console.log(that.player.lives);
			// for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			// 	//destroy all bubbles in screen
			// 	that.initialBubble.destroyBubble(that.initialBubble.bubbles[i]);
			// };
			that.initialBubble.bubbles=[];
			that.initialBubble=new Bubble(that);//instance of bubble
			that.initialBubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:"30px"});
			that.collisionInterval=setInterval(that.collisionCheck,120);	
		}else{
			that.player.lives--;
			livesDisplay.innerHTML=that.player.lives;
			that.gameOver();
		}
	}
	//game over function
	this.gameOver=function(){
		console.log('game over');
		that.player.removePlayer();
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
				//destroy all bubbles in screen
				that.initialBubble.destroyBubble(that.initialBubble.bubbles[i]);
			};
	}

}
//start of game
var game=new BubbleGame();
game.init();