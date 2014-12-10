function Player(game){
	this.gameWindow=game.gameWindow;
	this.player;
	this.playerPosX=180;
	this.playerHeight=50;
	this.playerWidth=20;
	this.lives=3;
	var that=this;
	this.createPlayer=function(){
		// creates new player
		that.player=document.createElement("div");
		that.player.id="player";
		that.player.style.height=that.playerHeight+"px";
		that.player.style.width=that.playerWidth+"px";
		that.player.style.top="350px";
		that.player.style.left=that.playerPosX+"px";
		that.gameWindow.appendChild(that.player);
	}
	this.moveRight=function(){
		// moves player right
		if(that.playerPosX<760){
			that.playerPosX+=10;
			that.player.style.left=that.playerPosX+"px";
			// console.log(that.playerPosX);
		}
	}
	this.moveLeft=function(){
		// moves player left
		// console.log(that.playerPosX);
		if(that.playerPosX>0){
			that.playerPosX-=10;
			that.player.style.left=that.playerPosX+"px";
		}
	}
	this.removePlayer=function(){
		that.gameWindow.removeChild(that.player);
	}
}