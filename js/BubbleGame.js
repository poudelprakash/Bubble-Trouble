'use strict';
//code of bubble game starts;
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");

	// elements 
	var startDisplay;//start screen
	var spanStart;//start button on start screen
	var gameOverDisplay;//Game over Screen
	var gameOverText;//Game Over Text on Game over screen
	var spnRestart;//Restart option on Game Over Screen
	//	stats element on game screen
	var levelText;
	var levelDisplay;
	var scoreText;
	var scoreboardDisplay;
	var livesText;
	var livesDisplay;// displays the count of lives
	var high;//scores list table

	//counters and flags
	var rstflag; //reset flag to check when to update evel
	var levelCount=1;
	this.score=0;

	// instances
	this.player;
	this.bullet;

	var bubbleDiameter=30;//default bubble diameter
	
	this.bubbles=[];//bubbles array

	this.collisionInterval;

	var punchSnd = new Audio("sounds/punch.mp3"); // sound when bubble hits player
	var startScreenSnd=new Audio("sounds/castle.mp3");//start screen sound
	var that=this;

	this.startScreen=function(){
		// start screen background
		startDisplay=document.createElement("div");
		startDisplay.id="game-start";
		startDisplay.style.display="block";
		that.gameWindow.appendChild(startDisplay);

		//start button
		spanStart=document.createElement("span");
		spanStart.className="menu-item";
		spanStart.style.width="218px"
		spanStart.style.position = "absolute";
		spanStart.style.lineHeight="56px";
		spanStart.style.bottom="110px";
		spanStart.style.right = '5px';
		spanStart.innerHTML="Start";
		spanStart.onclick=that.start;
		startDisplay.appendChild(spanStart);

		startScreenSnd.play();
	}
	
	this.statsDisplay=function(){

		// display of lives
		livesText=document.createElement("p");
		livesText.innerHTML="Lives : ";
		livesText.style.color="#fff";
		livesText.style.marginLeft="15px"
		livesText.style.fontSize="32px";
		livesText.style.float="left";
		that.gameWindow.appendChild(livesText);

		livesDisplay=document.createElement("span");
		livesDisplay.innerHTML="3";
		livesText.appendChild(livesDisplay);

		// display current level
		levelText=document.createElement("p");
		levelText.innerHTML="Level : "
		levelText.style.color="green";
		levelText.style.marginLeft="215px";
		levelText.style.fontSize="32px";
		levelText.style.float="left";
		that.gameWindow.appendChild(levelText);

		levelDisplay=document.createElement("span");
		levelDisplay.innerHTML="1";//initial level
		levelText.appendChild(levelDisplay);

		// display of score
		scoreText=document.createElement("p");
		scoreText.innerHTML="Score : ";
		scoreText.style.color="#fff";
		scoreText.style.fontSize="32px";
		scoreText.style.float="right";
		that.gameWindow.appendChild(scoreText);

		scoreboardDisplay=document.createElement("span");
		scoreboardDisplay.innerHTML="0";
		scoreboardDisplay.style.marginRight="15px"
		scoreText.appendChild(scoreboardDisplay);

		//highscores from ajax
		high=document.createElement("span");
		high.id="score";
		that.gameWindow.appendChild(high);

	}

	this.start=function(){
		if(high!=null){
			high.style.display="none";
		}
		if(startDisplay.parentNode==that.gameWindow){
			that.gameWindow.removeChild(startDisplay);
			startScreenSnd.pause();
		}
		if(gameOverDisplay!=null){
			gameOverDisplay.style.display="none";
		}
		that.statsDisplay();//diplay health and scores

		that.player=new Player(that);//instance of player
		that.player.createPlayer();//creates new player at the start
		
		that.bullet=new Bullet(that);//instance of bullet

		that.bubbleGenerator();//generates bubble for each level

		that.collisionInterval=setInterval(that.collisionCheck,50);
		document.addEventListener('keydown', that.onkeydown, false);
	}

	//event hendler
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
		rstflag=false;
		levelDisplay.innerHTML=levelCount;
		var bubble = new Bubble(that);//instance of bubble
		bubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:bubbleDiameter+"px"});
	
		that.bubbles.push(bubble);//pushing bubble to array
	}

	//function to check collision with bullet and player
	this.collisionCheck=function (argument){
		scoreboardDisplay.innerHTML=that.score;//updates score

		for (var i = 0; i < that.bubbles.length; i++) {

			var currentBubble = that.bubbles[i];
			var currentBounce = currentBubble.bounce;

			if(that.bullet.fired==true){
				if(currentBounce.positionX>(that.bullet.bulletPosX+that.bullet.bulletWidth-that.bubbles[i].bubbleWidth) && currentBounce.positionX<(that.bullet.bulletPosX+that.bullet.bulletWidth)){
						if((currentBounce.positionY+that.bubbles[i].bubbleWidth)>that.bullet.bulletPosY){

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

						}
					}
			}
			// collision with player
			if(currentBounce.positionX>(that.player.playerPosX-parseInt(currentBubble.bubbleWidth)) && currentBounce.positionX<(that.player.playerPosX+that.player.playerWidth)){
				if(currentBounce.positionY>(400-(that.player.playerHeight+parseInt(currentBubble.bubbleWidth)))){
					punchSnd.play();
					that.reset();
					that.player.lives--;
				}
			}
		};
		//level updater
		if(rstflag==false){
			if(that.bubbles.length==0){
				levelCount++;//game play reaches next level
				bubbleDiameter+=10;// increase bubble diameter for next level
				if(bubbleDiameter<=60){
					that.bubbleGenerator();
				}else{
					that.victory(); //game ends here
				}
			}
			
		}
		
	}
	
	//reset function
	this.reset=function(){
		rstflag=true;
		livesDisplay.innerHTML=that.player.lives-1;//display number of lives
		for (var i = 0; i < that.bubbles.length; i++) {
				//destroy all bubbles in screen
				var currentBubble = that.bubbles[i];
				currentBubble.destroyBubble();
			};
		if(that.player.lives>1){
			that.bubbles=[];
			that.bubbleGenerator();
		}else{
			that.gameOver();
		}
	}

	// game over screen
	this.gameOverScreen=function (argument){
		gameOverDisplay=document.createElement("div");
		gameOverDisplay.id="game-over";
		gameOverDisplay.style.display="block";
		that.gameWindow.appendChild(gameOverDisplay);

		gameOverText=document.createElement("span");
		gameOverText.id="game-over-text";
		gameOverText.innerHTML="Game Over";
		gameOverDisplay.appendChild(gameOverText);

		spnRestart=document.createElement("span");
		spnRestart.style.display="block";
		spnRestart.innerHTML="Play Again";
		spnRestart.id="play-again";
		spnRestart.lineHeight="58px";
		spnRestart.style.fontSize="40px";
		spnRestart.style.width="218px";
		spnRestart.style.left="280px";
		spnRestart.style.top="160px";
		spnRestart.onclick=that.start;
		gameOverDisplay.appendChild(spnRestart);

		
	}

	//game over function
	this.gameOver=function(){
		// using ajax for high score
		var	a=new Ajax();
		a.putScore(that.score);
		setTimeout(a.getHighScore, 400);
		
		that.player.lives=3;
		that.score=0;
		bubbleDiameter=30;
		levelCount=1;
		that.gameWindow.removeChild(scoreText);
		that.gameWindow.removeChild(levelText);
		that.gameWindow.removeChild(livesText);
		clearInterval(that.collisionInterval);
		that.player.removePlayer();
		that.gameOverScreen();
		that.bubbles=[];
	}

	//game ends in this function
	this.victory=function(){
		that.gameWindow.removeChild(scoreText);
		that.gameWindow.removeChild(levelText);
		that.gameWindow.removeChild(livesText);
		clearInterval(that.collisionInterval);
		that.player.removePlayer();
		that.bubbles=[];
		var victoryDisplay=document.createElement("div");
		victoryDisplay.id="victory";
		that.gameWindow.appendChild(victoryDisplay);
	}
}

//start of game
var game=new BubbleGame();
game.startScreen();