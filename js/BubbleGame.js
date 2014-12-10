'use strict';
//code of bubble game starts;
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");
	var scoreboardDisplay = document.getElementById("score");
	var livesDisplay = document.getElementById("lives");
	this.player;
	this.bullet;
	var bubbleDiameter=30;
	
	this.bubbles=[];

	this.score=0;
	this.collisionInterval;
	var punchSnd = new Audio("sounds/punch.mp3"); // sound when bubble hits player
	var that=this;
	this.startScreen=function(){
		document.getElementById("game-start").style.display="block";
	}
	this.start=function(){
		document.getElementById("game-start").style.display="none";
		document.getElementById("game-over").style.display="none";
		//game start function
		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		
		that.bullet=new Bullet(that);//instance of bullet

		that.bubbleGenerator();//generates bubble for each level

		that.collisionInterval=setInterval(that.collisionCheck,50);
		document.addEventListener('keydown', that.onkeydown, false);
	}
	this.onkeydown=function(event){
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
	this.bubbleGenerator=function(){
		var bubble = new Bubble(that);//instance of bubble
		bubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:bubbleDiameter+"px"});
	
		that.bubbles.push(bubble);//pushing bubble to array
	}
	this.collisionCheck=function (argument){
		//function to check collision with bullet and player

		scoreboardDisplay.innerHTML=that.score;//updates score

		for (var i = 0; i < that.bubbles.length; i++) {
			console.log('checking collsion');
			var currentBubble = that.bubbles[i];
			var currentBounce = currentBubble.bounce;

			if(that.bullet.fired==true){
				if(currentBounce.positionX>(that.bullet.bulletPosX+that.bullet.bulletWidth-that.bubbles[i].bubbleWidth) && currentBounce.positionX<(that.bullet.bulletPosX+that.bullet.bulletWidth)){
						if((currentBounce.positionY+that.bubbles[i].bubbleWidth)>that.bullet.bulletPosY){
							console.log('bubble collided')

							clearInterval(currentBounce.intervalId);//clear bubble update interval
							var newBubbles = currentBubble.splitBubble(i);//split bubble till end

							currentBubble.destroyBubble();

							that.bubbles.splice(i, 1);//remove bubble from array
							that.bullet.destroyBullet();//clears bullet update interval and removes bullet
							
							if (newBubbles.length == 0) {
								
							} else {
								that.bubbles.push(newBubbles[0]);
								that.bubbles.push(newBubbles[1]);
							}

							console.log(that.bubbles);
						}
					}
			}
			// collision with player
			if(currentBounce.positionX>(that.player.playerPosX-parseInt(currentBubble.bubbleWidth)) && currentBounce.positionX<(that.player.playerPosX+that.player.playerWidth)){
				if(currentBounce.positionY>(400-(that.player.playerHeight+parseInt(currentBubble.bubbleWidth)))){
					punchSnd.play();
					
					that.reset();
					that.player.lives--;
					// break;
				}
			}
		};
		//level updater
		if(that.bubbles.length==0){
			bubbleDiameter+=10;
			that.bubbleGenerator();
		}
	}
	//reset function
	this.reset=function(){
		livesDisplay.innerHTML=that.player.lives-1;//display number of lives

		for (var i = 0; i < that.bubbles.length; i++) {
				//destroy all bubbles in screen
				var currentBubble = that.bubbles[i];
				currentBubble.destroyBubble();
			};	

		if(that.player.lives>1){
		that.bubbles=[];
		
		that.bubbleGenerator;

		}else{
			that.gameOver();
		}
	}
	//game over function
	this.gameOver=function(){
		that.player.lives=3;
		clearInterval(that.collisionInterval);
		document.getElementById("game-over").style.display="block";
		console.log('game over');
		that.player.removePlayer();
	}

}
//start of game
var game=new BubbleGame();
game.startScreen();