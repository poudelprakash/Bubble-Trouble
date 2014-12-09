'use strict';
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
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
	this.reset=function(){
		//delete all bubbles
		//remove player
		//remove bullet
		//remove all animations
		//remove all intervals
		// for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
		// 	that.initialBubble.bubbles[i]
		// 	that.initialBubble
		// };
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
		// console.log("checking collision");
		// collision with bullet
		for (var i = 0; i < that.initialBubble.bubbles.length; i++) {
			// console.log(i+that.initialBubble.bubbleAnimations[i].positionX);
			if(that.bullet.fired=="true"){
				if(that.initialBubble.bubbleAnimations[i].positionX<that.bullet.bulletPosX && that.initialBubble.bubbleAnimations[i].positionX>(that.bullet.bulletPosX-that.initialBubble.bubbles[i].clientHeight+that.bullet.bulletWidth)){
					if(that.initialBubble.bubbleAnimations[i].positionY>that.bullet.bulletPosY){
					that.initialBubble.splitBubble(i);
					console.log('bubble collided');
					console.log(i);
					clearInterval(that.collisionInterval);
					// that.collisionInterval=setInterval(that.collisionCheck, 120);
					// clearInterval(that.initialBubble.bubbleAnimations[i].intervalId);
					// clearInterval(that.initialBubble.bubbleAnimations[i].intervalIds[i]);
					that.bullet.destroyBullet();
					// break;
					}
				}
			}
			// collision with player
			// if(that.initialBubble.bubbleAnimations[i].positionX>(that.player.playerPosX-parseInt(that.initialBubble.bubbles[i].style.width)) && that.initialBubble.bubbleAnimations[i].positionX<(that.player.playerPosX+that.player.playerWidth)){
			// 	if(that.initialBubble.bubbleAnimations[i].positionY>(400-(that.player.playerHeight+parseInt(that.initialBubble.bubbles[i].style.height)))){
			// 		clearInterval(that.initialBubble.bubbleAnimations[i].intervalId);
			// 		clearInterval(that.collisionInterval);
			// 		that.player.lives--;
			// 		console.log(that.player.lives);
			// 	}
			// }
		};

	}

}
var game=new BubbleGame();
game.init();