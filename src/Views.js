/*
*	PhyResume
*	Thomas Belin
*/

/****************************************** 
	VIEWS 
******************************************/

function Popup(htmlText) {
	this.htmlText = htmlText;
	this.createDomElement();
}
Popup.prototype = {
	htmlText:"",
	domElement:null,
	contentElement:null,
	addedToDom:false,

	createDomElement:function() {
		var elt = document.createElement("div");
		elt.id = "popup";
		elt.className = "hidden";

		var content = document.createElement("div");
		content.id="popupContent";
		elt.appendChild(content);
		this.contentElement = content;
		
		var hideFunc = (function() { this.hide(); }).bind(this);
		elt.onclick = hideFunc;
		this.domElement = elt;
		
	},

	setInnerHtml:function(htmlText) {
		this.htmlText = htmlText;	
	},

	show:function() {
		this.contentElement.innerHTML = this.htmlText;
		if(!this.addedToDom) {
			document.body.appendChild(this.domElement);
			this.addedToDom = true;
		}
		this.domElement.className = "";
	},

	hide:function() {
		this.domElement.className = "hidden";
	}
}

//the classe that represents the experience on the board
function Experience(exp) {
	this.model = exp;
	this.speedVector = new CVVector(0, 0);
	this.position = new CVPoint(10, 0);

	this.createDomElement();
	
}
Experience.prototype = {	
	model:null,			//the model on which the view is based
	speedVector:null,	//the vector that represents the speed of the box containing the experience
	position:null,		//the actual position of the box
	previousPosition:null,
	domElement:null,	//the dom element that will be drawn on the board
	addedToDoc:false,	//Boolean : if the element has already been added to the document, no need to re-add it
	mousePoint:null,	//the position of the mouse when an mouseDown is fired
	selected:false,		
	
	update:function() {
		this.speedVector.addVector(gravity);
	},

	//update the view position
	//return true if the view has been upated false else 
	//if the Experience element has been added to the DOM, it's added
	drawInContext:function(context) {
		if(!this.addedToDoc) {
			context.appendChild(this.domElement);
			this.addedToDoc = true;
		}
		//if the element is not selected, we apply his speed vector to his position and we move the DOM element
		if(!this.selected) {
			this.previousPosition = new CVPoint(this.position.x, this.position.y);
			this.speedVector.applyToPoint(this.position);
		}
		
		var updated = false;
		var style = this.domElement.style;
		var prev = this.previousPosition;
		var pos = this.position;
		if(prev.y.toPrecision(floatPrecision) != pos.y.toPrecision(floatPrecision)){
			style.top = pos.y+"px";
			updated = true;
		} 
		if(prev.y.toPrecision(floatPrecision) != pos.y.toPrecision(floatPrecision)){
			style.left = pos.x+"px";
			updated = true;
		}
		return updated;
	},
	
	//init the DOM element that will represent the experience
	//the element is not yet added to the document
	createDomElement:function() {
		var exp = this.model;
		
		var expDiv = document.createElement("div");
		expDiv.className = "experience type_"+exp.type;
		expDiv.id = "exp_"+exp.id;
		
		//type div
		var typeDiv = document.createElement("span");
		typeDiv.className = "type";
		typeDiv.innerHTML = exp.typeStr;
		expDiv.appendChild(typeDiv);
		
		//title div
		var titleDiv = document.createElement("div");
		titleDiv.className = "title";
		titleDiv.innerHTML = exp.title;
		expDiv.appendChild(titleDiv);

		//description div
		var descDiv = document.createElement("div");
		descDiv.className = "description";
		descDiv.innerHTML = "<p>"+ exp.descriptionShort +"</p>";
		expDiv.appendChild(descDiv);

		expDiv.onmousedown = (function(event) { this.mouseDown(event) }).bind(this);
		expDiv.onmouseup = (function() { this.mouseUp() }).bind(this);
		expDiv.onclick = (function(event) { this.showDetails() }).bind(this);

		this.domElement = expDiv;

	},
	
	immobilize:function() {
		this.speedVector.dx = 0;
		this.speedVector.dy = 0;	
	},
	
	getWidth:function() {
		return this.domElement.clientWidth;
	},

	mouseDown:function(event) {
		if (typeof (event.preventDefault)!=undefined) {event.preventDefault();}
		this.immobilize();
		this.domElement.style.zIndex = 1;
		this.selected = true;
		this.mousePoint = new CVPoint(event.clientX, event.clientY);
		this.moving = false;
		document.onmousemove = (function(event) { this.mouseMove(event)}).bind(this);
	},

	mouseUp:function() {
		this.selected = false;
		this.domElement.style.zIndex = 0;
		document.onmousemove = null;
	},
	
	mouseMove:function(event) {
		if(this.selected) {
			var movePoint = new CVPoint(event.clientX, event.clientY);
			var vect = movePoint.getVector(this.mousePoint);
			this.mousePoint = movePoint;
			vect.applyToPoint(this.position);
			this.drawInContext(null);
			this.moving = true;
		}
	},
	
	getHTMLDesc:function() {
		var model = this.model;
		var img = "";
		var other = "";
		var desc = "";
		if(model.image) {
			img = "<img src='"+model.image+"' />";
		}
		if(model.other) {
			other = "<h2>Compétences aquises</h2><div class=\"other\">"+model.other+"</p></div>";
		}
		if(model.description) {
			desc = "<h2>Description</h2><div class=\"description\"><p>"+this.model.description+"</p></div>";
		}
		return "<h1>"+this.model.title+"</h1>"
			+img
			+desc
			+other;
	},

	showDetails:function() {
		if(!this.moving) {
			showPopup(this.getHTMLDesc());	
		}
	}
	
}

/* The class that represents a link between an experience and a skill 
	it knows the starting DOM element and the ending experience
*/
function Link(startElem, endElem, size) {
	this.startElem = startElem;
	this.endElem = endElem;
	this.strengthVector = new CVVector(0, 0);
	this.size = size;

}
Link.prototype = {
	startElem:null,		//the DOM element containing the skill	
	endElem:null,		//the Experience linked to the skill
	strengthVector:null, //the vector representing the strenght of the elastic
	size:100,			//the max size of the elastic
	elasticity:0.05,
	
	update:function() {
		if(!this.endElem.selected) {
			
			this.endElem.update();
			
			var height = this.getHeight();
			var width = this.getWidth();
			
			var currentSize = this.getCurrentSize();
			var dif =  Math.max(0, currentSize - this.size);
			var bounce = this.elasticity * dif;
	
			var cos = currentSize != 0 ?  Math.abs(width / currentSize) : 0;
			var sin = currentSize != 0 ? Math.abs(height / currentSize) : 0;
			
			cos = width <= 0 ? -cos :  cos;
			sin = height <= 0 ? -sin : sin;
	
			this.strengthVector.dx = cos * bounce;
			this.strengthVector.dy = bounce * sin;
	
			this.endElem.speedVector.addVector(this.strengthVector);
			this.endElem.speedVector.multVector(speedDown);
		}
		
	},

	//draw the link in the context
	//the context must have called "beginPath" before calling this method and closePath after
	drawInContext:function(context) {
		var startElt = this.startElem;
		var endElt = this.endElem;

		var startX = startElt.offsetLeft + parseInt(startElt.clientWidth /2);
		var startY = 0;//startElt.offsetTop + startElt.clientHeight;
		var endX = endElt.position.x + parseInt(endElt.getWidth()/2);
		var endY = endElt.position.y + startY;

		
		context.moveTo(startX, startY);
		context.lineTo(endX, endY);
				
	},

	//returns the current size of the link 
	getCurrentSize:function() {
		return Math.sqrt(Math.pow(this.getWidth(), 2) + Math.pow(this.getHeight(), 2));
	},

	//returns the width of the link (needed to compute the bouncing vector)
	getWidth:function() {
		var startElt = this.startElem;
		var endElt = this.endElem;

		var startX = startElt.offsetLeft + Math.floor(startElt.clientWidth /2);
		var endX = endElt.position.x + Math.floor(endElt.getWidth()/2);
		
		return startX - endX;
		
	},

	getHeight:function() {
		var startElt = this.startElem;
		var endElt = this.endElem;

		var startY = startElt.offsetTop + startElt.clientHeight;
		var endY = endElt.position.y + startY;
		
		return startY - endY;
		
	}
}


/* the class that represents the clouds */
function Cloud(cHeight) {
	this.containerHeight = cHeight;


	this.createDomElement();
}
Cloud.prototype = {
	text:null,
	containerHeight:0,
	domElement:null,
	speedClassName:"",

	createDomElement:function() {
		var elt = document.createElement("div");
		elt.className = "cloud";
		var trans = (function() { this.startAnim() }).bind(this);
		elt.addEventListener("webkitTransitionEnd", trans, true);
		elt.addEventListener("OTransitionEnd", trans, true);
		elt.addEventListener("transitionend", trans, true);

		var showDetails = (function() { this.showDetails(); }).bind(this)
		elt.onclick = showDetails;
		this.domElement = elt;
		
	},

	//set a random cloud speed class for the dom element
	computeSpeedClass:function() {
		var ind = Math.floor(Math.random() * cloudSpeedClasses.length);
		this.speedClassName = cloudSpeedClasses[ind];
	},
	
	//launch the cloud animantion
	launchAnim:function() {
		this.computeSpeedClass();
		this.domElement.className = this.speedClassName + " cloud";
		this.domElement.style.left = "100%";
	},

	//init the animation of the cloud
	startAnim:function() {
		this.reinit();
		var launch = (function() {this.launchAnim()}).bind(this);
		window.setTimeout(launch, 1);
	},

	//re init the cloud to his initial position	
	reinit:function() {
		//set a new textual value
		if(this.word) {
			arrayOfWords.push(this.word);
		}
		var randTextIndex = Math.floor(Math.random() * arrayOfWords.length);
		this.word = arrayOfWords.splice(randTextIndex, 1)[0];
		this.domElement.innerHTML = this.word.text;
		var randPos = Math.floor(Math.random() * (this.containerHeight - this.domElement.clientHeight)); 
		this.domElement.className = "cloud";
		this.domElement.style.top = randPos+"px";
		this.domElement.style.left = "-20%";

	},
	

	//show the popup with the details of the word
	showDetails:function() {
		showPopup(this.word.getHTMLDescription());
	},
	
}	

