/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(game){
	this.game = game;
	this.gameWindow = game.monitor.gameWindow;
	
	this.element;
	this.properties;
	this.bubbleClass;
	this.positionY;
	this.bubbleWidth;
	this.positionX;
	this.bounce;//animation class for bubble
	this.velocityX = 4;//x velocity to determine width of bounce
	this.index;
	var self = this;
	this.createBubble = function(properties){
		self.properties = properties;
		self.bubbleClass = self.properties.bubbleClass;
		self.positionY = parseInt(self.properties.top);
		self.bubbleWidth = parseInt(self.properties.width);//diameter of bubble
		if(self.properties.velocityX == -1){
			self.velocityX *= -1;//to send one of the generated bubbles after split into opposite direction			
		}else{
			self.velocityX = 4;
		}
		self.positionX = parseInt(self.properties.left);
		self.element = document.createElement("div");
		self.element.className = self.bubbleClass;
		self.element.style.width = self.bubbleWidth+"px";
		self.element.style.height = self.bubbleWidth+"px";
		self.element.style.borderRadius = (self.bubbleWidth/2)+"px";
		self.element.style.top = self.positionY+"px";
		self.element.style.left = self.positionX+"px";
		self.gameWindow.appendChild(self.element);//creates bubble
		self.animateBubble();//start animating as soon as ball is created		
	}

	this.animateBubble=function (){
		self.bounce=new BubbleAnimation(self);
		
		if(self.bubbleWidth==60){
			self.bounce.animate(self.element,{velocity:-14,top:self.positionY,left:self.positionX,velocityX:self.velocityX},65);
		}else if(self.bubbleWidth==50){
			self.bounce.animate(self.element,{velocity:-16,top:self.positionY,left:self.positionX,velocityX:self.velocityX},60);
		}else if(self.bubbleWidth==40){
			self.bounce.animate(self.element,{velocity:-14,top:self.positionY,left:self.positionX,velocityX:self.velocityX},50);
		}else if(self.bubbleWidth==30){
			self.bounce.animate(self.element,{velocity:-12,top:self.positionY,left:self.positionX,velocityX:self.velocityX},45);
		}else if(self.bubbleWidth==20){
			self.bounce.animate(self.element,{velocity:-8,top:self.positionY,left:self.positionX,velocityX:self.velocityX},30);
		}
	}

	this.splitBubble=function (){
		
		self.game.sound.bullet.pause();
		self.game.sound.pop.play();

		if(self.bubbleWidth==60){//bubble with diameter 60 is the current largest enemy
			var bubble1 = new Bubble(self.game);
			var bubble2 = new Bubble(self.game);

			game.score+=self.bubbleWidth*2;

			// create new bubbles from the position of split
			bubble1.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"50px",velocityX:-1});
			bubble2.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"50px"});

			return [bubble1, bubble2];
		}else if(self.bubbleWidth==50){
			var bubble1 = new Bubble(self.game);
			var bubble2 = new Bubble(self.game);

			game.score+=self.bubbleWidth*2;

			bubble1.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"40px",velocityX:-1});
			bubble2.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"40px"});

			return [bubble1, bubble2];
		}else if(self.bubbleWidth==40){
			var bubble1 = new Bubble(self.game);
			var bubble2 = new Bubble(self.game);

			game.score+=self.bubbleWidth*2;

			bubble1.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"30px",velocityX:-1});
			bubble2.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"30px"});		

			return [bubble1, bubble2];
		}
		else if(self.bubbleWidth==30){
			var bubble1 = new Bubble(self.game);
			var bubble2 = new Bubble(self.game);

			game.score+=self.bubbleWidth*2;

			bubble1.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"20px",velocityX:-1});
			bubble2.createBubble({bubbleClass:self.bubbleClass,top:self.bounce.positionY,left:self.bounce.positionX,width:"20px"});

			return [bubble1, bubble2];
		}else if(self.bubbleWidth==20){
			
			game.score+=self.bubbleWidth*2;

			return [];
		}		
	}

	this.splitAnimation=function(){
		
	}
	
	this.destroyBubble=function(){
		self.gameWindow.removeChild(self.element);//removes smallest bubble and big bubble after collsion
	}
} 