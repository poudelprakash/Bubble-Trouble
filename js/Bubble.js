/*-------------------------------------Bubble Class---------------------------------------------*/
function Bubble(game){
	this.game=game;
	this.gameWindow=game.gameWindow;
	this.element;
	this.properties;
	this.topPos;
	this.positionY;
	this.velocityX=4;
	var that=this;
	this.createBubble=function(properties){
		that.properties=properties;
		that.topPos=parseInt(that.properties.top);
		if(that.properties.velocityX==-1){
			that.velocityX*=-1;			
		}else{
			that.velocityX=4;
		}
		that.positionY=parseInt(that.properties.left);
		that.element=document.createElement("div");
		that.element.id=that.properties.bubbleId;
		that.element.style.top=that.topPos+"px";
		that.element.style.left=that.positionY+"px";
		that.gameWindow.appendChild(that.element);//creates bubble
		that.animateBubble();//start animating as soon as ball is created
	}
	this.animateBubble=function (){
		var bounce=new BubbleAnimation();
		if(that.properties.bubbleId=="bubble-red"){
			bounce.animate(that.element,{velocity:-12,top:that.topPos,left:that.positionY,velocityX:that.velocityX},30);
		}else if(that.properties.bubbleId=="bubble-green"){
			bounce.animate(that.element,{velocity:-10,top:that.topPos,left:that.positionY,velocityX:that.velocityX},34);
		}else if(that.properties.bubbleId=="bubble-yellow"){
			bounce.animate(that.element,{velocity:-6,top:that.topPos,left:that.positionY,velocityX:that.velocityX},38);
		}
	}
	this.splitBubble=function (){
		if(that.properties.bubbleId=="bubble-green"){
			that.gameWindow.removeChild(document.getElementById("bubble-green"));
			that.createBubble({bubbleId:"bubble-yellow",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left),velocityX:-1});
			that.createBubble({bubbleId:"bubble-yellow",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left)});
		}else if(that.properties.bubbleId=="bubble-red"){
			that.gameWindow.removeChild(document.getElementById("bubble-red"));
			that.createBubble({bubbleId:"bubble-green",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left),velocityX:-1});
			that.createBubble({bubbleId:"bubble-green",top:parseInt(that.element.style.top),left:parseInt(that.element.style.left)});
		}else if(that.properties.bubbleId=="bubble-yellow"){
			that.gameWindow.removeChild(document.getElementById("bubble-yellow"));
		}
		
	}
}