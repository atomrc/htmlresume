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
			new Word("Sportif", "Parce que le crédo : \"Un corps sain dans un esprit sain\" semble très important à mes yeux, je pratique régulièrement le jogging."), 
			new Word("Determiné", "J'aime me lancer des défis, et je me donne les moyens de relever ces défis."), 
			new Word("Impliqué", "Quand je fais quelque chose je le fais à fond.")];