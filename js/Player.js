function Player(game){
	this.gameWindow = game.monitor.gameWindow;
	this.player;
	this.playerPosX=180;
	this.playerHeight=50;
	this.playerWidth=20;
	this.steps = 10;
	this.rightEnd = game.monitor.width - this.playerWidth;
	this.lives=3;
	var self=this;
	this.createPlayer=function(){
		// creates new player
		self.player = document.createElement("div");
		self.player.id = "player";
		self.player.style.height = self.playerHeight+"px";
		self.player.style.width = self.playerWidth+"px";
		self.player.style.bottom = "0px";
		self.player.style.left = self.playerPosX+"px";
		self.gameWindow.appendChild(self.player);
	}

	this.moveRight=function(){
		// moves player right
		if(self.playerPosX < self.rightEnd){
			self.playerPosX += self.steps;
			self.player.style.left=self.playerPosX+"px";
		}
	}

	this.moveLeft=function(){
		// moves player left
		if(self.playerPosX > 0){
			self.playerPosX -= self.steps;
			self.player.style.left=self.playerPosX+"px";
		}
	}

	this.removePlayer=function(){
		self.gameWindow.removeChild(self.player);
	}
}