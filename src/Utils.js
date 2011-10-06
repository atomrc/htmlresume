function changeLanguage(lang) {
	alert(lang);	
}

//usefull browser detection found here : http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function isCompatible() {
	var isOk = true;
	isOk = BrowserDetect.browser != "Explorer" || BrowserDetect.version >= 9;
	return isOk;
	
}

function printCompatibilityMessage() {
	var cont= document.getElementById("compMessage");
	cont.style.display = "block";
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


