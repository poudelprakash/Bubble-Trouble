function BubbleAnimation(){
	this.bubble;
	this.properties;
	this.duration;
	this.topPos;//initial top position of bubble
	this.bubbleVelocity;//bubble specific velocity to fix how high it will bounce
	this.positionX=0;
	this.positionY;
	this.velocityX=4;//x velocity to determine width of bounce
	this.velocityY=0;
	this.gravity=0.5;//gravity to pull bouncing ball down
	that=this;
	this.animate=function (element,properties,frequency){
		that.bubble=element;
		that.properties=properties;
		that.bubbleVelocity=that.properties.velocity;
		that.frequency=frequency;
		that.topPos = 400-that.bubble.clientHeight;//generating top position by substracting diameter
		that.positionY=that.topPos;
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
	    if(that.positionX <= 0 || that.positionX > 740){
	    	//limits ball bouncing within width of game-window
	        that.velocityX *= -1;
	    }
	    that.bubble.style.top =that.positionY+"px";
	    that.bubble.style.left=that.positionX+"px";
		}
}
var apple=new BubbleAnimation();
apple.animate(document.getElementById("bubble-1"),{velocity:-12},30);

// var b=new BubbleAnimation();
// b.animate(document.getElementById("bubble-small"),{velocity:-6},38);


