/*-------------------------------------Animation Class---------------------------------------------*/
function BubbleAnimation(){
	this.bubble;
	this.properties;
	this.duration;
	this.topPos;//initial top position of bubble
	this.rightEnd;//right most position to go for bubble
	this.bubbleVelocity;//bubble specific velocity to fix how high it will bounce
	this.positionX;
	this.positionY;
	this.velocityX=4;//x velocity to determine width of bounce
	this.velocityY=0;
	this.gravity=0.5;//gravity to pull bouncing ball down
	var that=this;
	this.animate=function (element,properties,frequency){
		that.bubble=element;
		that.properties=properties;
		that.bubbleVelocity=that.properties.velocity;
		that.positionY=that.properties.top;
		that.positionX=that.properties.top;
		// that.positionX=that.properties.left;
		that.frequency=frequency;
		that.topPos = 400-that.bubble.clientHeight;//generating top position by substracting diameter
		that.rightEnd = 780-that.bubble.clientWidth;//generating Rightmost position by substracting diameter
		that.intervalId=setInterval(that.update, that.frequency);
	}
	this.update=function(){
		if(that.positionY==that.topPos){
			//checks when bubble reaches bottom and then bubble bounces(automates bounce)
			that.velocityY = that.bubbleVelocity;
		}
		that.velocityY += that.gravity;//implementing gravity to bring bubble down
	    that.positionY += that.velocityY;
	    that.positionX += that.velocityX;
	    if(that.positionY > that.topPos)
	    {	
	    	//limiting the ball from going below game-window
	        that.positionY = that.topPos;
	        that.velocityY = 0;
	    }
	    if(that.positionX <= 0 || that.positionX > that.rightEnd){
	    	//limits ball bouncing within width of game-window
	        that.velocityX *= -1;
	    }
	    that.bubble.style.top =that.positionY+"px";
	    that.bubble.style.left=that.positionX+"px";
		}
}
/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(){
	gameWindow=document.getElementById("game-window");//making gameWindow accessible from anywhere
	this.element;
	this.properties;
	this.topPos;
	this.positionY;
	var that=this;
	this.createBubble=function(properties){
		that.properties=properties;
		that.topPos=parseInt(that.properties.top);
		that.positionY=parseInt(that.properties.left);
		that.element=document.createElement("div");
		that.element.id=that.properties.bubbleId;
		that.element.style.top = that.topPos+"px";
		that.element.style.left=that.positionY+"px";
		gameWindow.appendChild(that.element);
		that.animateBubble();
	}
	this.animateBubble=function (){
		var bounce=new BubbleAnimation();
		if(that.properties.bubbleId=="bubble-red"){
			bounce.animate(that.element,{velocity:-12,top:that.topPos,left:that.positionY},30);
		}else if(that.properties.bubbleId=="bubble-green"){
			bounce.animate(that.element,{velocity:-10,top:that.topPos,left:that.positionY},34);
		}else if(that.properties.bubbleId=="bubble-yellow"){
			bounce.animate(that.element,{velocity:-6,top:that.topPos,left:that.positionY},38);
		}
	}
	this.splitBubble=function (){
		if(that.properties.bubbleId=="bubble-green"){
			gameWindow.removeChild(document.getElementById("bubble-green"));
			that.createBubble({bubbleId:"bubble-yellow",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left)});
			that.createBubble({bubbleId:"bubble-yellow",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left)});
		}else if(that.properties.bubbleId=="bubble-red"){
			gameWindow.removeChild(document.getElementById("bubble-red"));
			that.createBubble({bubbleId:"bubble-green",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left)});
			that.createBubble({bubbleId:"bubble-green",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left)});
		}else if(that.properties.bubbleId=="bubble-yellow"){
			gameWindow.removeChild(document.getElementById("bubble-yellow"));
		}
		
	}
}

/*--------------------------------------level-1----------------------------------------*/
// var green=new Bubble();
// green.createBubble({bubbleId:"bubble-green"});
// window.addEventListener("mousedown", green.splitBubble, false);
/*--------------------------------------level-2----------------------------------------*/
var red=new Bubble();
red.createBubble({bubbleId:"bubble-red",top:'60px',left:"60px"});
window.addEventListener("mousedown", red.splitBubble, false);
// var yellow=new Bubble();
// yellow.createBubble({bubbleId:"bubble-yellow"});