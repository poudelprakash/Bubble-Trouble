function Player(game){
	this.gameWindow=game.gameWindow;
	this.player;
	this.playerPosX=350;
	this.playerHeight=50;
	this.playerWidth=20;
	that=this;
	this.createPlayer=function(){
		that.player=document.createElement("div");
		that.player.id="player";
		that.player.style.height=that.playerHeight+"px";
		that.player.style.width=that.playerWidth+"px";
		that.player.style.top="350px";
		that.player.style.left=that.playerPosX+"px";
		that.gameWindow.appendChild(that.player);
	}
	this.moveLeft=function(){
		if(that.playerPosX>0){
			that.playerPosX-=10;
			that.player.style.left=that.playerPosX+"px";
		}
	this.moveRight=function(){
		if(that.playerPosX<760){
			that.playerPosX+=20;
			that.player.style.left=that.playerPosX+"px";
		}
	}

	}
}