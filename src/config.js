/*
*	htmlresume : an original way to diplay a resume
*	Thomas Belin
*/

var isPaused = false;
var cvController = null;
var cloudController = null;
var gravity = new CVVector(0, 0.5);
var speedDown = new CVVector(0.95, 0.95);
var popup = null;
var floatPrecision = 5;

var datas = null;

var nbClouds = 5;
var cloudSpeedClasses = ["highSpeed", "middleHighSpeed", "slowSpeed", "middleSlowSpeed", "middleSpeed"];

