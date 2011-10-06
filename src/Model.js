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
