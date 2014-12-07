/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(game){
	this.game=game;
	this.gameWindow=game.gameWindow;
	this.bubbles=[];
	this.bubbleAnimations=[];
	this.element;
	this.properties;
	this.topPos;
	this.bubbleWidth;
	this.positionY;
	this.bounce;//animation class for bubble
	this.velocityX=4;//x velocity to determine width of bounce
	var that=this;
	this.createBubble=function(properties){
		that.properties=properties;
		that.topPos=parseInt(that.properties.top);
		that.bubbleWidth=parseInt(that.properties.width);
		if(that.properties.velocityX==-1){
			that.velocityX*=-1;			
		}else{
			that.velocityX=4;
		}
		that.positionY=parseInt(that.properties.left);
		that.element=document.createElement("div");
		that.element.id=that.properties.bubbleId;
		that.element.style.width=that.bubbleWidth+"px";
		that.element.style.height=that.bubbleWidth+"px";
		that.element.style.borderRadius=(that.bubbleWidth/2)+"px";
		that.element.style.top=that.topPos+"px";
		that.element.style.left=that.positionY+"px";
		that.gameWindow.appendChild(that.element);//creates bubble
		that.bubbles.push(that.element);
		that.animateBubble();//start animating as soon as ball is created
	}
	this.animateBubble=function (){
		that.bounce=new BubbleAnimation(that);
		that.bubbleAnimations.push(that.bounce);
		console.log(that.bubbleAnimations);
		// bounce.animate(that.bubbles[0],{velocity:-12,top:that.topPos,left:that.positionY,velocityX:that.velocityX},30);
		if(that.properties.bubbleId=="bubble-red"){
			that.bounce.animate(that.element,{velocity:-12,top:that.topPos,left:that.positionY,velocityX:that.velocityX},30);
		}else if(that.properties.bubbleId=="bubble-green"){
			that.bounce.animate(that.element,{velocity:-10,top:that.topPos,left:that.positionY,velocityX:that.velocityX},34);
		}else if(that.properties.bubbleId=="bubble-yellow"){
			that.bounce.animate(that.element,{velocity:-6,top:that.topPos,left:that.positionY,velocityX:that.velocityX},38);
		}
	}
	this.splitBubble=function (elementId){
		if(that.properties.bubbleId=="bubble-red"){
			that.destroyBubble(that.bubbles[0]);
			console.log(that.bubbleAnimations[0].positionY);
			that.createBubble({bubbleId:"bubble-green",top:that.bubbleAnimations[0].positionY,left:that.bubbleAnimations[0].positionX,width:"20px",velocityX:-1});
			that.createBubble({bubbleId:"bubble-green",top:that.bubbleAnimations[0].positionY,left:that.bubbleAnimations[0].positionX,width:"20px"});
		}else if(that.properties.bubbleId=="bubble-yellow"){
			that.destroyBubble(that.bubbles[3]);
			that.destroyBubble(that.bubbles[4]);

		}
		
	}
	this.destroyBubble=function(element){
		//clearing the resource
		clearInterval(that.bounce.intervalId);
		that.gameWindow.removeChild(element);//removes whichever element is passed for destruction
		// that.bounce.intervalId=setInterval(that.bounce.update, that.bounce.frequency);
	}
}