
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

	if(isCompatible()) {
	document.onkeypress = keyPressed;

	cvController = new CVController("mainContainer");
	cvController.init();
	
	cloudController = new CloudController("divMe");
	cloudController.init();
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
