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
	this.velocityX;//x velocity to determine width of bounce
	this.velocityY=-6;//y velocity that makes ball bounce some distance on creation
	this.gravity=0.5;//gravity to pull bouncing ball down
	var that=this;
	this.animate=function (element,properties,frequency){
		that.bubble=element;
		that.properties=properties;
		that.bubbleVelocity=that.properties.velocity;
		that.positionY=that.properties.top;
		that.positionX=that.properties.left;
		that.velocityX=that.properties.velocityX;//altering direction for splits
		// that.velocityY=that.properties.velocityY;//get velocity Y for higher jump in splits
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
