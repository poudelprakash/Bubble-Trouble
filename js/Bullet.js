function Bullet(game){
	this.gameWindow=game.gameWindow;
	this.bulletPosX=304;
	this.bulletPosY=400-game.player.playerHeight;
	this.bulletUpdateInterval;
	this.bullet;
	this.fired="false";
	var that=this;
	this.fireBullet=function(x){
		if(that.fired=="false"){
			that.bulletPosX=game.player.playerPosX+game.player.playerWidth/2;//this fixes where the bullet should emerge from
			that.bullet=document.createElement("div");
			that.bullet.className="bullet";
			that.bullet.style.height=400+"px";
			that.bullet.style.width=3+"px";
			that.bullet.style.left=that.bulletPosX+"px";
			that.bullet.style.top=that.bulletPosY+"px";
			that.gameWindow.appendChild(that.bullet);
			that.bulletUpdateInterval=setInterval(that.updateBullet, 10);
		}	
	}
	this.updateBullet=function(){
		if(that.bulletPosY!=0){
			that.fired="true";
			that.bulletPosY-=1;
			that.bullet.style.top=that.bulletPosY+"px";
		}else if(that.bulletPosY==0){
			that.destroyBullet();
		}
	}
	this.destroyBullet=function(){
		//clearing bullet resources
		that.fired="false";
		that.bulletPosY=400;
		clearInterval(that.bulletUpdateInterval);
		setTimeout(that.removeBullet, 200);//pauses bullet for small instance after bullet reaches top
	}
	this.removeBullet=function(){
		that.gameWindow.removeChild(that.bullet);
	}
	this.detectCollision=function(argument){
		/* body... */
	}
}