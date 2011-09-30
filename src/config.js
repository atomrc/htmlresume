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

