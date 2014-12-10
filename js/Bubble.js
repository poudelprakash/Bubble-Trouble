/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(game){
	this.game=game;
	this.gameWindow=game.gameWindow;
	
	this.element;
	this.properties;
	this.bubbleClass;
	this.positionY;
	this.bubbleWidth;
	this.positionX;
	this.bounce;//animation class for bubble
	this.velocityX=4;//x velocity to determine width of bounce
	this.pop = new Audio("sounds/pop.mp3"); //pop sound for bubble splits
	this.index;
	var that=this;
	this.createBubble=function(properties){
		that.properties=properties;
		that.bubbleClass=that.properties.bubbleClass;
		that.positionY=parseInt(that.properties.top);
		that.bubbleWidth=parseInt(that.properties.width);//diameter of bubble
		if(that.properties.velocityX==-1){
			that.velocityX*=-1;//to send one of the generated bubbles after split into opposite direction			
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
		that.animateBubble();//start animating as soon as ball is created		
	}
	this.animateBubble=function (){
		that.bounce=new BubbleAnimation(that);
		
		if(that.bubbleWidth==60){
			that.bounce.animate(that.element,{velocity:-18,top:that.positionY,left:that.positionX,velocityX:that.velocityX},65);
		}else if(that.bubbleWidth==50){
			that.bounce.animate(that.element,{velocity:-16,top:that.positionY,left:that.positionX,velocityX:that.velocityX},60);
		}else if(that.bubbleWidth==40){
			that.bounce.animate(that.element,{velocity:-14,top:that.positionY,left:that.positionX,velocityX:that.velocityX},50);
		}else if(that.bubbleWidth==30){
			that.bounce.animate(that.element,{velocity:-12,top:that.positionY,left:that.positionX,velocityX:that.velocityX},45);
		}else if(that.bubbleWidth==20){
			that.bounce.animate(that.element,{velocity:-8,top:that.positionY,left:that.positionX,velocityX:that.velocityX},30);
		}
	}
	this.splitBubble=function (){
		
		if(that.bubbleWidth==60){//bubble with diameter 60 is the current largest enemy
			var bubble1 = new Bubble(that.game);
			var bubble2 = new Bubble(that.game);

			game.score+=that.bubbleWidth*2;

			// create new bubbles from the position of split
			bubble1.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"50px",velocityX:-1});
			bubble2.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"50px"});

			return [bubble1, bubble2];
		}else if(that.bubbleWidth==50){
			var bubble1 = new Bubble(that.game);
			var bubble2 = new Bubble(that.game);

			game.score+=that.bubbleWidth*2;

			bubble1.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"40px",velocityX:-1});
			bubble2.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"40px"});

			return [bubble1, bubble2];
		}else if(that.bubbleWidth==40){
			var bubble1 = new Bubble(that.game);
			var bubble2 = new Bubble(that.game);

			game.score+=that.bubbleWidth*2;

			bubble1.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"30px",velocityX:-1});
			bubble2.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"30px"});		

			return [bubble1, bubble2];
		}
		else if(that.bubbleWidth==30){
			var bubble1 = new Bubble(that.game);
			var bubble2 = new Bubble(that.game);

			game.score+=that.bubbleWidth*2;

			bubble1.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"20px",velocityX:-1});
			bubble2.createBubble({bubbleClass:that.bubbleClass,top:that.bounce.positionY,left:that.bounce.positionX,width:"20px"});

			return [bubble1, bubble2];
		}else if(that.bubbleWidth==20){
			
			game.score+=that.bubbleWidth*2;

			return [];
		}		
	}
	this.destroyBubble=function(){
		that.gameWindow.removeChild(that.element);//removes smallest bubble and big bubble after collsion
	}
} 