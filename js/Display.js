function Display(){
	this.gameWindow = document.getElementById("game-window");
	this.height;
	this.width;

	var self = this;

	/**
	* reinitialise the game screen's height and width
	* 
	* @param width [integer] width of game screen
	* @param height [integer] height of game screen
	**/
	this.open = function(width, height){
		self.width = width;
		self.height = height;
		self.gameWindow.style.height = self.height+'px';
		self.gameWindow.style.width = self.width+'px';
	};

	
}