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
	this.pop = new Audio("sounds/pop.mp3"); // buffers automatically when created
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
		console.log(that.bounce);
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
		// console.log(that.bubbles[index].clientHeight);
		// console.log(index);
		// console.log(that.bubbleAnimations);
		if(that.bubbles[index].clientHeight==30){
			// that.pop.play();
			
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[index].positionY,left:that.bubbleAnimations[index].positionX,width:"20px",velocityX:-1});
			that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[index].positionY,left:that.bubbleAnimations[index].positionX,width:"20px"});	
			that.destroyBubble(that.bubbles[index]);
		}
		else if(that.bubbles[index].clientHeight==20){
			that.pop.play();
			
			// that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[index].positionY,left:that.bubbleAnimations[index].positionX,width:"10px",velocityX:-1});
			// that.createBubble({bubbleClass:that.bubbleClass,top:that.bubbleAnimations[index].positionY,left:that.bubbleAnimations[index].positionX,width:"10px"});
			that.destroyBubble(that.bubbles[index]);
		}else if(that.bubbles[index].clientHeight==10){
			that.destroyBubble(that.bubbles[index]);
		}		
	}
	this.destroyBubble=function(element){
		console.log(that.bubbleAnimations);
		//clearing the resource
		// for (var i = 0; i <= that.index; i++) {
		// 	clearInterval(that.bubbleAnimations[i].intervalId);
		// 	console.log(that.index);
		// };
		// clearInterval(that.bubbleAnimations[that.index].intervalId);
		// console.log(that.bubbleAnimations[that.index].intervalId);
		clearInterval(that.bubbleAnimations[that.index].intervalId);
		// console.log(that.bubbles);
		

		// console.log(that.bubbles);
		// console.log(that.bubbles.indexOf(element));
		that.bubbles.splice(that.index,1);

		that.gameWindow.removeChild(element);//removes whichever element is passed for destruction
		game.collisionInterval=setInterval(that.collisionCheck,120);
		that.bubbleAnimations[that.index].intervalId=setInterval(that.bounce.update, that.bubbleAnimations[that.index].frequency);
		that.bubbleAnimations.splice(that.index,1);
	}
}