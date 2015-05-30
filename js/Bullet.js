function Bullet(game){
	this.gameWindow = game.monitor.gameWindow;
	this.bulletPosX;//bullet position on x axis
	this.initialPosY = game.monitor.height - game.player.playerHeight;//bullet appears from top of player
	this.bulletPosY = this.initialPosY;//temporary bullet height
	this.bulletWidth = 8;
	this.bullet;
	this.fired = false;
	this.collided = false;
	var self = this;

	this.create = function(){
		self.$bullet = document.createElement('div');
		self.$bullet.className = 'bullet';
		self.$bullet.style.height = game.monitor.height+'px';//bullet that covers the height of game-screen
		self.$bullet.style.width = self.bulletWidth+'px';
		self.$bullet.style.left = self.bulletPosX+'px';
		self.$bullet.style.top = game.monitor.height+'px';
		self.gameWindow.appendChild(self.$bullet);
	}

	this.fire = function(){
		if(!self.fired){
			game.sound.bullet.play();
			self.bulletPosX = game.player.playerPosX + game.player.playerWidth/2- self.bulletWidth/2;//this fixes where the bullet should emerge from
			self.$bullet.style.left=self.bulletPosX + 'px';
			self.ascend();
		}
	}

	this.ascend = function(){
		if (self.bulletPosY == 0 || self.collided){
			self.reset();
			return;
		}
		self.fired = true;
		self.bulletPosY -= 5;
		self.$bullet.style.top= self.bulletPosY + 'px';
		window.requestAnimationFrame(self.ascend);
	}

	this.reset = function(){
		self.fired = false;
		self.collided = false;
		self.bulletPosY = game.monitor.height;
		self.$bullet.style.top= self.bulletPosY + 'px';
	}

	this.destroyBullet=function(){
		self.gameWindow.removeChild(self.bullet);
	}
}