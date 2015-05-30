function GameLoop(){

	this.monitor;
	this.sound;
	this.player;
	this.bubbles = [];
	this.bullet;

	this.score = 0;

	var bubbleDiameter = 30;


	var self = this;
	this.init = function(){

		self.monitor = new Display(self);
		self.monitor.open(900,350);

		self.sound = new Sound();

		self.player =  new Player(self);
		self.player.createPlayer();

		self.bullet = new Bullet(self);
		self.bullet.create();

		self.bubbleGenerator();

		self.collisionInterval=setInterval(self.checkCollision,50);

		document.addEventListener('keydown', self.onkeydown, false);
	}

	this.bubbleGenerator = function(){
		var bubble = new Bubble(self);//instance of bubble
		bubble.createBubble({bubbleClass:"bubble-red",top:"60px",left:"60px",width:bubbleDiameter+"px"});
	
		self.bubbles.push(bubble);//pushing bubble to array
	}

	//event handler
	this.onkeydown = function(event){
		// keyboard keys handler
		if(event.keyCode == 32){//for space key
			self.bullet.fire();
		}
		if(event.keyCode == 37 ){//for left Arrow
			self.player.moveLeft();
		}
		if(event.keyCode == 39){//for Right Arrow
			self.player.moveRight();
		}
	}

	this.checkCollision = function(){

			for (var i = 0; i < self.bubbles.length; i++) {

				var currentBubble = self.bubbles[i];
				var currentBounce = currentBubble.bounce;

				if(self.bullet.fired==true){
					if(currentBounce.positionX>(self.bullet.bulletPosX+self.bullet.bulletWidth-self.bubbles[i].bubbleWidth) && currentBounce.positionX<(self.bullet.bulletPosX+self.bullet.bulletWidth)){
							if((currentBounce.positionY+self.bubbles[i].bubbleWidth)>self.bullet.bulletPosY){

								clearInterval(currentBounce.intervalId);//clear bubble update interval
								var newBubbles = currentBubble.splitBubble(i);//split bubble till end

								currentBubble.destroyBubble();

								self.bubbles.splice(i, 1);//remove bubble from array
								self.bullet.collided = true;
								
								if (newBubbles.length == 0) {
									
								} else {
									self.bubbles.push(newBubbles[0]);
									self.bubbles.push(newBubbles[1]);
								}

							}
						}
				}
				// collision with player
				if(currentBounce.positionX>(self.player.playerPosX-currentBubble.bubbleWidth) && currentBounce.positionX<(self.player.playerPosX+self.player.playerWidth)){
					if(currentBounce.positionY>(self.monitor.height-(self.player.playerHeight+currentBubble.bubbleWidth))){
						self.player.lives--;
					}
				}
			};
	}

}

var game = new GameLoop();
game.init();

