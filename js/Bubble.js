/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(game){
	this.game=game;
	this.gameWindow=game.gameWindow;
	this.bubbles=[];
	this.bubbleAnimations=[];
	this.element;
	this.properties;
	this.bubbleClass;
	this.topPos;
	this.bubbleWidth;
	this.positionX;
	this.bounce;//animation class for bubble
	this.velocityX=4;//x velocity to determine width of bounce
	this.index;
	var that=this;
	this.createBubble=function(properties){
		that.properties=properties;
		that.bubbleClass=that.properties.bubbleClass;
		that.topPos=parseInt(that.properties.top);
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
		that.element.style.top=that.topPos+"px";
		that.element.style.left=that.positionX+"px";
		that.gameWindow.appendChild(that.element);//creates bubble
		that.bubbles.push(that.element);
		// console.log(that.bubbles);
		that.animateBubble();//start animating as soon as ball is created
	}
	this.animateBubble=function (){
		that.bounce=new BubbleAnimation(that);
		that.bubbleAnimations.push(that.bounce);
		if(that.bubbleWidth==30){
			that.bounce.animate(that.element,{velocity:-18,top:that.topPos,left:that.positionX,velocityX:that.velocityX},42);
		}else if(that.bubbleWidth==20){
			that.bounce.animate(that.element,{velocity:-10,top:that.topPos,left:that.positionX,velocityX:that.velocityX},34);
		}else if(that.bubbleWidth==10){
			that.bounce.animate(that.element,{velocity:-6,top:that.topPos,left:that.positionX,velocityX:that.velocityX},38);
		}
	}
	this.splitBubble=function (index){
		that.index=index;
		var pop = new Audio("sounds/pop.mp3"); // buffers automatically when created
		console.log(that.bubbles[index].clientHeight);
		if(that.bubbles[index].clientHeight==30){
			pop.play();
			that.destroyBubble(that.bubbles[index]);
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[index].positionX,left:that.bubbleAnimations[index].positionX,width:"20px",velocityX:-1});
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[index].positionX,left:that.bubbleAnimations[index].positionX,width:"20px",velocityX:1});
		}
		else if(that.bubbles[index].clientHeight==20){
			that.destroyBubble(that.bubbles[index]);
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[0].positionX,left:that.bubbleAnimations[0].positionX,width:"10px",velocityX:-1});
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[0].positionX,left:that.bubbleAnimations[0].positionX,width:"10px",velocityX:1});
			
		}else if(that.bubbles[index].clientHeight==10){
			that.destroyBubble(that.bubbles[index]);
		}		
	}
	this.destroyBubble=function(element){
		//clearing the resource
		clearInterval(that.bounce.intervalId[that.index]);
		that.bounce.intervalIds.splice(that.index,1);
		that.bubbles.splice(that.index,1)
		that.gameWindow.removeChild(element);//removes whichever element is passed for destruction
		that.collisionInterval=setInterval(that.collisionCheck,120);
		// that.bounce.intervalId=setInterval(that.bounce.update, that.bounce.frequency);
	}
}