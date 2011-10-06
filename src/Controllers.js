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
	model:null,
	linksArray:[],
	experienceArray:[],

	//initialisation des données du CV
	initWithModel:function(model) {
		this.model = model;
		this.draw();
	},

	draw:function() {
		for(var skillIndex in this.model['skills']) {
			var skill = this.model['skills'][skillIndex];
			var skillId = "skill_"+skill.id;
			skillDiv = document.createElement("div");
			skillDiv.id = skillId;
			skillDiv.className = "skill";
			skillDiv.innerHTML = skill.name;
			this.skillsContainer.appendChild(skillDiv);
		}
		
		for(var index in this.model['experience']) {
			var exp = this.model['experience'][index];

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
}
CloudController.prototype = {
	container:null, //DOM element that will contain the cloud canvas
	arrayOfWords:null, //the array containing all the words that may be displayed in a cloud
	visibleCloud:[], //the array containing all the visible cloud
	containerHeight:0,

	initWithModel:function(model) {
		this.arrayOfWords=model;
		for(var i = 0; i<nbClouds; i++) {
			this.containerHeight = parseInt(getComputedStyle(this.container, null).getPropertyValue("height"));
			var newCloud = new Cloud(this);
			this.visibleCloud.push(newCloud);
			this.container.appendChild(newCloud.domElement);
		}
		this.startAllAnim();
	},

	startAllAnim:function() {
		for(var cloudIndex in this.visibleCloud) {
			var cloud = this.visibleCloud[cloudIndex];
			this.initCloud(cloud);
		}
	},

	initCloud:function(cloud) {
		//set a new textual value
		if(cloud.word) {
			//if the cloud has already a word setted, we keep the word in our array
			this.arrayOfWords.push(cloud.word);
		}
		//computing a random text position in the array
		var randTextIndex = Math.floor(Math.random() * this.arrayOfWords.length);
		var word = this.arrayOfWords.splice(randTextIndex, 1)[0];
		
		//computing a random position
		var randPos = Math.floor(Math.random() * (this.containerHeight - cloud.domElement.clientHeight));
		
		//computing a speed class
		var ind = Math.floor(Math.random() * cloudSpeedClasses.length);
		var speedClassName = cloudSpeedClasses[ind];
	

		cloud.reinit(word, randPos, speedClassName); 


	},

	cloudDidFinishAnimation:function(cloud) {
		this.initCloud(cloud);
		
	},
	
}
