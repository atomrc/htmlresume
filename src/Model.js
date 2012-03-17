/****************************************** 
	MODEL 
******************************************/
function Word(word, desc) {
	this.word = word;
	this.desc = desc;
}

Word.prototype = {
	word:null,
	desc:null,

	getHTMLDescription:function() {
		return "<h1>"+this.word+"</h1><p>"+this.desc+"</p>";
	},
}
