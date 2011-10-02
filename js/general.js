/*
*	htmlresume : an original way to diplay a resume
*	Thomas Belin
*/

var isPaused = false;
var cvController = null;
var cloudController = null;
const gravity = new CVVector(0, 0.5);
const speedDown = new CVVector(0.95, 0.95);
var popup = null;
const floatPrecision = 5;

const nbClouds = 5;
const cloudSpeedClasses = ["highSpeed", "middleHighSpeed", "slowSpeed", "middleSlowSpeed", "middleSpeed"];


function keyPressed(event) {
	switch(event.charCode) {
		case 112:
			isPaused = !isPaused;
	}
	if(!isPaused) {
		runExpAnim();
	}
}

//Init the resume controller
function initCV() {
	
	document.onkeypress = keyPressed;

	cvController = new CVController("mainContainer");
	cvController.init();
	
	cloudController = new CloudController("divMe");
	cloudController.init();
	runExpAnim();	//launch the animation of the physical engine
}

function runExpAnim() {
	cvController.step();
	if(!isPaused) {
		requestAnimFrame(runExpAnim);
	}
}
/****************************************** 
	MODEL 
******************************************/
function Word(text, desc) {
	this.text = text;
	this.desc = desc;
}

Word.prototype = {
	text:null,
	desc:null,

	getHTMLDescription:function() {
		return "<h1>"+this.text+"</h1><p>"+this.desc+"</p>";
	},
}

var arrayOfWords = [	new Word("Musicien", "Guitariste passioné depuis maintenant 7 ans, je joue régulièrement en groupe."), 
			new Word("Créatif", "Un minimum d'originalité demande un minimum de créativité."), 
			new Word("Consciencieux", "Je ne me contente jamais de faire quelque chose qui fonctionne. Je fais tout pour qu'il fonctionne le mieux possible."),
			new Word("Sportif", "Parce que le crédo : \"Un corps sain dans un esprit sain\" semble très important à mes yeux, je pratique régulièrement le jogging et l'aviron."), 
			new Word("Déterminé", "J'aime me lancer des défis, et je me donne les moyens de les relever"),
			new Word("Impliqué", "Quand je fais quelque chose je le fais à fond.")];
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

		if(exp.open != 0) {
			var openDiv = document.createElement("span");
			openDiv.className = "open";
			openDiv.innerHTML = "Open Source";
			expDiv.innerHTML += "<br/>";
			expDiv.appendChild(openDiv);
		}
		
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
			other = "<h2>Compétences acquises</h2><div class=\"other\">"+model.other+"</p></div>";
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

/****************************************** 
	CONTROLLERS
******************************************/
/* Main controller of the resume
	idContainer : the id of the DOM element that will contain the resume
 */
function CVController(idContainer) {
	this.container = document.getElementById(idContainer);
	

	this.skillsContainer = document.createElement("div");
	this.skillsContainer.id = "skillsContainer";
	this.container.parentNode.insertBefore(this.skillsContainer,this.container.parentNode.firstChild);;
	
	
	var linkCanvas = document.createElement("canvas");
	linkCanvas.id = "linkCanvas";
	
	var containerHeight = parseInt(getComputedStyle(this.container, null).getPropertyValue("height"));
	var containerWidth = parseInt(getComputedStyle(this.container, null).getPropertyValue("width"));
	linkCanvas.style.height = containerHeight+"px";
	linkCanvas.style.width = containerWidth+"px";
	linkCanvas.height = containerHeight;
	linkCanvas.width = containerWidth;

	this.linkCanvas = linkCanvas;
	this.container.appendChild(linkCanvas);
	//this.container.parentNode.insertBefore(this.linkCanvas,this.container.parentNode.firstChild);
	
	var context = linkCanvas.getContext("2d");
	context.lineCap = "round";
	context.lineWidth = 1;
	context.strokeStyle = "white";
	this.linkContext = context;
	
	this.experienceContainer = document.createElement("div");
	this.experienceContainer.id = "experienceContainer";
	this.container.appendChild(this.experienceContainer);
}
CVController.prototype = {
	container:null,
	linkCanvas:null,
	linkContext:null,
	skillsContainer:null,
	experienceContainer:null,
	ajaxModel:null,
	linksArray:[],
	experienceArray:[],

	//initialisation des données du CV
	init:function() {
		var req = getXmlHttpRequest();
		var response = "";
		req.onreadystatechange = function(){ 
			if(req.readyState == 4){
        			if(req.status == 200){ 
             				response = JSON.parse(req.responseText);	
        			}else{ 
              				console.log("Error: returned status code " + 
                   			req.status + " " + xhr.statusText); 
       				} 
    			} 
 		}; 
		req.open("GET", "requests/getDatas.php", false);	
		req.send(null);
		
		this.ajaxModel = response;

		this.draw();
	},

	draw:function() {
		for(var skillIndex in this.ajaxModel['skills']) {
			var skill = this.ajaxModel['skills'][skillIndex];
			var skillId = "skill_"+skill.id;
			skillDiv = document.createElement("div");
			skillDiv.id = skillId;
			skillDiv.className = "skill";
			skillDiv.innerHTML = skill.name;
			this.skillsContainer.appendChild(skillDiv);
		}
		
		for(var index in this.ajaxModel['experience']) {
			var exp = this.ajaxModel['experience'][index];

			var experience = new Experience(exp);
			this.experienceArray.push(experience);

			for(var skillIndex in exp.skills){
				var skill = exp.skills[skillIndex];
				var skillId = "skill_"+skill.id;
				var skillDiv = document.getElementById(skillId);
				var link = new Link(skillDiv, experience, skill.size);
				this.linksArray.push(link);
			}
		}
		this.refresh();
	},
	
	step:function() {
		this.update();
		this.refresh();
	},

	update:function() {
		for(var iLink in this.linksArray) {
			var link = this.linksArray[iLink];
			link.update();
		}
	},
	
	refresh:function() {
		var needToRefreshLinks = false;
		for(var iExp in this.experienceArray) {
			var exp = this.experienceArray[iExp];
			var up = exp.drawInContext(this.experienceContainer);
			needToRefreshLinks = needToRefreshLinks || up;
		}
		if(needToRefreshLinks) {
			var context = this.linkContext;
			context.clearRect(0,0, context.canvas.clientWidth, context.canvas.clientHeight);
		
			context.beginPath();
			for(var iLink in this.linksArray) {
				var link = this.linksArray[iLink];
				link.drawInContext(context);
			}
			context.closePath();	
		
			context.stroke();
		}
	}
}


/* The controller that updates and draw the cloud in the document */
function CloudController(divId) {
	this.container = document.getElementById(divId); 
	this.arrayOfWords = ["Créatif", "Dynamique", "Musicien", "Sportif", "Ouvert d'esprit", "Social", "Consciencieux"];
	this.visibleCloud = [];
}
CloudController.prototype = {
	container:null, //DOM element that will contain the cloud canvas
	arrayOfWords:null, //the array containing all the words that may be displayed in a cloud
	visibleCloud:null, //the array containing all the visible cloud
	
	init:function() {
		for(var i = 0; i<nbClouds; i++) {
			var containerHeight = parseInt(getComputedStyle(this.container, null).getPropertyValue("height"));
			var newCloud = new Cloud(containerHeight);
			this.visibleCloud.push(newCloud);
			this.container.appendChild(newCloud.domElement);
		}
		this.startAllAnim();
	},

	startAllAnim:function() {
		for(cloudIndex in this.visibleCloud) {
			var cloud = this.visibleCloud[cloudIndex];
			cloud.startAnim(); 
			
		}
	}
	
}

/****************************************** 
	MATH / GRAPHICS 
******************************************/

function CVPoint(x, y) {
	this.x = x;
	this.y = y;
}
CVPoint.prototype = {
	x:0,
	y:0,
	
	getVector:function(point) {
		return new CVVector(this.x - point.x, this.y - point.y);
	}	
}


function CVVector(dx, dy) {
	this.dx = dx; 
	this.dy = dy;
}
CVVector.prototype = {
	dx:0,
	dy:0,
	
	//Apply the vector to the point 
	applyToPoint:function(point) {
		point.x += this.dx;
		point.y += this.dy;
	},
	
	addToVector:function(vect) {
		vect.dx += this.dx;
		vect.dy += this.dy;	
		vect.minifyPrecision();
	},
	
	multToVector:function(vect) {
		vect.dx *= this.dx;
		vect.dy *= this.dy;	
		vect.minifyPrecision();
	},
	
	addVector:function(vect) {
		this.dx += vect.dx;
		this.dy += vect.dy;	
		this.minifyPrecision();
	},
	
	
	multVector:function(vect) {
		this.dx *= vect.dx;
		this.dy *= vect.dy;	
		this.minifyPrecision();
	},
	
	minifyPrecision:function() {
		this.dx = parseFloat(this.dx.toFixed(floatPrecision));
		this.dy = parseFloat(this.dy.toFixed(floatPrecision));
	},
	
	//create a new vector by adding values of the current vector and the vector "vect"
	getAddedVector:function(vect) {
		return new CVVector(parseFloat((this.dx + vect.dx).toPrecision(floatPrecision)), parseFloat((this.dy + vect.dy).toPrecision(floatPrecision)));
	},

	//create a new vector by multipling values of the current vector and the vector "vect"
	getMultVector:function(vect) {
		return new CVVector(parseFloat((this.dx * vect.dx).toPrecision(floatPrecision)), parseFloat((this.dy * vect.dy).toPrecision(floatPrecision)));
	},
}

/****************************************** 
	UTILS 
******************************************/

function showPopup(text) {
	if(!popup) {
		popup = new Popup(text);
	}
	popup.setInnerHtml(text);
	popup.show();
}

function hidePopup() {
	popup.hide();
}

//Bind method if not implemented
if (!Function.prototype.bind) {

  Function.prototype.bind = function (oThis) {

    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));    
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;

  };

}

//simple wraper of the requestAnimationFrame method
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
	      window.mozRequestAnimationFrame    || 
	      window.oRequestAnimationFrame      || 
	      window.msRequestAnimationFrame     || 
	      function(/* function */ callback, /* DOMElement */ element){
	      window.setTimeout(callback, 1000 / 60);
	};
})();

//simple wraper for the AJAX requests
function getXmlHttpRequest() {
	var xhr_object = null;

	if(window.XMLHttpRequest) // Firefox
		xhr_object = new XMLHttpRequest();
	else if(window.ActiveXObject) // Internet Explorer
   		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
	else  // XMLHttpRequest non supporté par le navigateur
   		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
	
   	return xhr_object;;
}


