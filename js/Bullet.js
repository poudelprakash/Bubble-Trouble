function Bullet(game){
	this.gameWindow=game.gameWindow;
	this.bulletPosX=180;//initial bullet position on x axis
	this.bulletHeight=400-game.player.playerHeight;//bullet appears from top of player
	this.bulletPosY=this.bulletHeight;//temporary bullet height
	this.bulletUpdateInterval;
	this.bulletWidth=8;
	this.bullet;
	this.fired="false";
	var that=this;
	this.fireBullet=function(x){
		if(that.fired=="false"){
			that.bulletPosX=game.player.playerPosX+game.player.playerWidth/2-4;//this fixes where the bullet should emerge from
			that.bullet=document.createElement("div");
			that.bullet.className="bullet";
			that.bullet.style.height=400+"px";
			that.bullet.style.width=that.bulletWidth+"px";
			that.bullet.style.left=that.bulletPosX+"px";
			that.bullet.style.top=that.bulletPosY+"px";
			that.gameWindow.appendChild(that.bullet);
			that.bulletUpdateInterval=setInterval(that.updateBullet, 5);
			var pop = new Audio("sounds/bullet.mp3"); // buffers automatically when created
			pop.play();
		}	
	}
	this.updateBullet=function(){
			// console.log(that.bulletPosY);
		if(that.bulletPosY!=0){
			that.fired="true";
			that.bulletPosY-=2;
			that.bullet.style.top=that.bulletPosY+"px";
		}else if(that.bulletPosY==0){
			that.destroyBullet();
		}
	}
	this.destroyBullet=function(){
		//clearing bullet resources
		that.fired="false";
		that.bulletPosY=that.bulletHeight;
		clearInterval(that.bulletUpdateInterval);
		that.gameWindow.removeChild(that.bullet);
	}
}