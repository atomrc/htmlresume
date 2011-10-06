
function keyPressed(event) {
	switch(event.charCode) {
		case 112:
			isPaused = !isPaused;
	}
	if(!isPaused) {
		runExpAnim();
	}
}

function getDatas(language, callback) {
	var req = getXmlHttpRequest();
	var response = "";
	req.onreadystatechange = callback;
	req.open("GET", "requests/getDatas.php", false);	
	req.send(null);
}

//Init the resume controller
function initCV() {

	if(isCompatible()) {
		document.onkeypress = keyPressed;

		cvController = new CVController("mainContainer");
		
		cloudController = new CloudController("divMe");
		
		var callback = function(){ 
			if(this.readyState == 4){
				if(this.status == 200){ 
					var response = JSON.parse(this.responseText);	
					cvController.initWithModel(response);
					cloudController.initWithModel(arrayOfWords);
				}else{ 
					console.log("Error: returned status code " + 
					this.status + " " + this.statusText); 
				} 
			} 
		}; 

		getDatas(lang, callback);

		runExpAnim();	//launch the animation of the physical engine
	} else {
		printCompatibilityMessage();
	}
}

function runExpAnim() {
	cvController.step();
	if(!isPaused) {
		requestAnimFrame(runExpAnim);
	}
}
