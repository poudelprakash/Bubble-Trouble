function Ajax() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	//display output
	    document.getElementById("score").innerHTML = xmlhttp.responseText;
	    }
    }
    this.putScore=function(score){
        console.log(score);
    	xmlhttp.open("GET", "putscore.php?Score="+score, true);
        xmlhttp.send();
    }
    this.getHighScore=function(){

    	xmlhttp.open("GET", "getscore.php", true);
        xmlhttp.send();
    }

    
}
var a=new Ajax();
a.getHighScore();