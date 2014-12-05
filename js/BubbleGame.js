'use strict';
/*--------------------------------------level-1----------------------------------------*/
// var green=new Bubble();
// green.createBubble({bubbleId:"bubble-green"});
// window.addEventListener("mousedown", green.splitBubble, false);
/*--------------------------------------level-2----------------------------------------*/

// var yellow=new Bubble();
// yellow.createBubble({bubbleId:"bubble-yellow"});
function BubbleGame(){
	this.gameWindow=document.getElementById("game-window");

	var that=this;

	this.init=function(){
		var red=new Bubble(that);
		red.createBubble({bubbleId:"bubble-red",top:"60px",left:"60px"});
		window.addEventListener("mousedown", red.splitBubble, false);
	}

}
var game=new BubbleGame();
game.init();