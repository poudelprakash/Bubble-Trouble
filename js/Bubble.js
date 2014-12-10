/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(game){
	this.game=game;
	this.gameWindow=game.gameWindow;
	this.bubbles=[];
	this.bubbleAnimations=[];
	this.element;
	this.properties;
	this.bubbleClass;
	this.positionY;
	this.bubbleWidth;
	this.positionX;
	this.bounce;//animation class for bubble
	this.velocityX=4;//x velocity to determine width of bounce
	this.pop = new Audio("sounds/pop.mp3"); // buffers automatically when created
	this.index;
	var that=this;
	this.createBubble=function(properties){
		that.properties=properties;
		that.bubbleClass=that.properties.bubbleClass;
		that.positionY=parseInt(that.properties.top);
		that.bubbleWidth=parseInt(that.properties.width);
		if(that.properties.velocityX==-1){
			that.velocityX*=-1;			
		}else{
			that.velocityX=4;
		}
		that.positionX=parseInt(that.properties.left);
		that.element=document.createElement("div");
		that.element.className=that.bubbleClass;
		that.element.style.width=that.bubbleWidth+"px";
		that.element.style.height=that.bubbleWidth+"px";
		that.element.style.borderRadius=(that.bubbleWidth/2)+"px";
		that.element.style.top=that.positionY+"px";
		that.element.style.left=that.positionX+"px";
		that.gameWindow.appendChild(that.element);//creates bubble
		that.bubbles.push(that);//pushing bubble to array
		// console.log(that.bubbles);
		that.animateBubble();//start animating as soon as ball is created
	}
	this.animateBubble=function (){
		that.bounce=new BubbleAnimation(that);
		that.bubbleAnimations.push(that.bounce);
		// console.log(that.bounce);
		if(that.bubbleWidth==40){
			that.bounce.animate(that.element,{velocity:-14,top:that.positionY,left:that.positionX,velocityX:that.velocityX},60);
		}else if(that.bubbleWidth==30){
			that.bounce.animate(that.element,{velocity:-12,top:that.positionY,left:that.positionX,velocityX:that.velocityX},55);
		}else if(that.bubbleWidth==20){
			that.bounce.animate(that.element,{velocity:-8,top:that.positionY,left:that.positionX,velocityX:that.velocityX},50);
		}
	}
	this.splitBubble=function (index){
		that.index=index;
		if(that.bubbles[that.index].bubbleWidth==40){
			game.score+=that.bubbles[that.index].bubbleWidth*2;
			that.destroyBubble(that.bubbles[that.index]);		
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[that.index].positionY,left:that.bubbleAnimations[that.index].positionX,width:"30px",velocityX:-1});
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[that.index].positionY,left:that.bubbleAnimations[that.index].positionX,width:"30px"});		
		}
		else if(that.bubbles[that.index].bubbleWidth==30){
			game.score+=that.bubbles[that.index].bubbleWidth*2;
			that.destroyBubble(that.bubbles[that.index]);
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[that.index].positionY,left:that.bubbleAnimations[that.index].positionX,width:"20px",velocityX:-1});
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[that.index].positionY,left:that.bubbleAnimations[that.index].positionX,width:"20px"});
		}else if(that.bubbles[that.index].bubbleWidth==20){
			game.score+=that.bubbles[that.index].bubbleWidth*2;
			console.log(that.bubbles);
			that.destroyBubble(that.bubbles[that.index]);
		}		
	}
	this.destroyBubble=function(ballObject){
		that.gameWindow.removeChild(ballObject.element);//removes whichever element is passed for destruction
	}
}