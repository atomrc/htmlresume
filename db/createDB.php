<?

	$db = new SQLite3("datas.sqlite");
	
	$db->query("DROP TABLE skills");
	$db->query("DROP TABLE experience");
	$db->query("DROP TABLE type_experience");
	$db->query("DROP TABLE links");	
	
	
	$db->query("CREATE TABLE skills (
			_id INTEGER PRIMARY KEY,
			name TEXT
			);");					
	
	$db->query("CREATE TABLE type_experience (
					_id INTEGER PRIMARY KEY,
					name TEXT
					);");
	
	$db->query("CREATE TABLE experience (
					_id INTEGER PRIMARY KEY,
					title TEXT,
					company TEXT,
					desc_short TEXT,
					desc TEXT,
					image TEXT,
					other TEXT,
					date_start TEXT,
					date_end TEXT,
					type INTEGER
					);");	
					
					
	$db->query("CREATE TABLE links (
						_id INTEGER PRIMARY KEY,
						id_skill INTEGER,
						id_experience INTEGER,
						size INTEGER
						);");		
			
				

	
	$db->query("INSERT OR REPLACE INTO type_experience (_id, name) VALUES (0, 'Stage');");
	$db->query("INSERT OR REPLACE INTO type_experience (_id, name) VALUES (1, 'Projet personnel');");
	$db->query("INSERT OR REPLACE INTO type_experience (_id, name) VALUES (2, 'Projet d''école');");	
				
			
	$db->query("INSERT OR REPLACE INTO skills (_id, name) VALUES (0, 'Javascript');");
	$db->query("INSERT OR REPLACE INTO skills (_id, name) VALUES (1, 'HTML5');");
	$db->query("INSERT OR REPLACE INTO skills (_id, name) VALUES (2, 'PHP');");
	$db->query("INSERT OR REPLACE INTO skills (_id, name) VALUES (3, 'Python');");
	$db->query("INSERT OR REPLACE INTO skills (_id, name) VALUES (4, 'Objective C');");
	//$db->query("INSERT OR REPLACE INTO skills (_id, name) VALUES (5, 'Java');");
	

	/****************************************** CV WEB ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				0, 
				'CV web', 
				'', 
				'Création d''un CV utilisant les technologies HTML5, Javascript et CSS transition.', 
				'Voulant faire mon stage de fin d''étude dans le domaine du web et tout particulièrement du HTML5, j''ai décidé de me créer un CV entièrement avec ces technologies. <br/>J''ai volontairement tout réalisé moi même (du moteur physique aux animations CSS) avec les nouveaux standards du web et sans aucun framework (Ce que les anglais pourraient appeler \\\"from scracth\\\"). <br/>Le résultat, vous l''avez en ce moment même sous les yeux.',
				'<ul><li>Développement d''une application Javascript avec les techniques de développement des jeux vidéos (moteur physique, boucle applicative...)</li><li>Optimisation forte d''un code Javascript (limiter le reflow/repaint, regrouper les opérations de dessins, limiter les opérations à chaque tour de boucle ...)</li><li>Manipulation des CSS transitions</li><ul>',
				'',
				1);");
				
	
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 0, 100);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (1, 0, 100);");
	
	/****************************************** SITE GALA ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				1, 
				'Site du gala Polytech By Night', 
				'', 
				'Création du site du gala de l''école Polytech Nantes (<a href=\\\"http://polytechbynight.fr\\\">polytechbynight.fr</a>).', 
				'Je me suis proposé de développer le site web du gala de mon école pour l''année 2011. Le site disposant d''une gestion des utilisateurs, d''un système de paiement par Paypal et d''un module de réservation en Javascript, celui-ci demandait d''être attentif à un certain nombre de choses.', 
				'<ul><li>Gestion des utilisateurs en PHP</li><li>Sécurisation d''un site (XSS, SQL injection)</li></ul>', 
				'',
				1);");
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 1, 350);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (2, 1, 175);");			
			
	/****************************************** VUE CHRONO ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, image, date_start, type) VALUES (
				2, 
				'Module de vue chronologique HTML5', 
				'', 
				'Mise en place d''un module de vue chronologique pour un CV.', 
				'Je voulais pouvoir présenter mes diverses expériences sous une autre forme qu''une liste. Je voulais les afficher sur une frise chronologique. J''ai donc développé un module utilisant uniquement la balise &lt;canvas&gt; d''HTML5 pour présenter mes expériences en informatique.<br/>', 
				'<ul><li>Manipulation poussée de la balise &lt;canvas&gt;/Javascript offert par HTML5</li></ul>',
				'images/timeline.png', 
				'',
				1);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 2, 225);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (1, 2, 225);");
	
					
	/****************************************** GREENCOPPER ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				3, 
				'Greencopper', 
				'', 
				'Stage au Canada chez Greencopper, éditeur d''applications mobiles pour festivals.', 
				'Un stage très formateur chez Greencopper une entreprise spécialisée dans les applications mobiles pour festivals. Parmi leurs clients, on compte Rock en Seine, le Festival de Jazz de Montréal, les Vieilles Charrues ... <br/> Ce stage m''a permis de m''attaquer à des problématiques avancées d''optimisation avec le développement d''un module générique de vue calendrier pour iPhone.', 
				'<ul><li>Techniques d''optimisation générales (recycleur, réduction du nombre de vues dans une page, regroupement de requêtes SQL …)</li></ul>',
				'',
				0);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (4, 3, 50);");


	/****************************************** DPC ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, date_start, type) VALUES (
				4, 
				'DPC', 
				'', 
				'Stage chez DPC-interactive, éditeur d''applications mobiles.', 
				'Après avoir développé l''application iPhone du festival des Vieilles Charrues, le domaine des applications mobiles me plaisait beaucoup et j''ai donc décidé de faire mon stage dans une entreprise de ce type. Ce stage chez DPC fut très enrichissant.', 
				'', 
				0);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (4, 4, 250);");


	/****************************************** SITE PERSO ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				5, 
				'Site web perso', 
				'', 
				'Mise en place de mon site web personnel (<a href=\\\"http://thomasbelin.fr\\\">thomasbelin.fr</a>)', 
				'Pour ma recherche de stages pour l''été 2011, je voulais avoir un support un peu plus fort qu''un simple CV pour appuyer ma candidature. J''ai donc mis en place, de zéro, mon site personnel.', 
				'<ul><li>Création d''un site complet en PHP</li></ul>', 
				'',
				1);");
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (2, 5, 300);");


	/****************************************** SITE FORMATION ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				6, 
				'Site de gestion de formations', 
				'', 
				'Réalisation, en binôme, d''un site de gestion des formations pour Polytech', 
				'Un projet de nos études à été de réaliser un site de gestion des formations proposées par Polytech. Nous étions en binôme et avions le choix des technologies et comme nous connaissions, tous les deux, bien PHP, nous avons décidé de ... ne pas l''utiliser. C''est pourquoi nous nous sommes tournés vers Python et le framework Django pour mettre en oeuvre notre projet.', 
				'<ul><li>Découverte de Django</li><li>Gestion des utilisateurs avec le framework Django</li></ul>',
				'', 
				2);");

	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (3, 6, 150);");
	
	
	
	/****************************************** PTRANS ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				7, 
				'Projet Transversal Polytech', 
				'', 
				'Projet en binôme, sur 8 mois, de développement d''un module de dessin de workflows directement dans un navigateur.',
				'Le gros projet de la quatrième année est le Projet Transversal en collaboration avec une entreprise. Notre projet consistait en la réalisation d''un module de dessin de workflow directement dans un navigateur. Nous avions le choix des technologies et c''est immédiatement vers le nouveau standard du web que nous nous sommes tournés : HTML5 et la balise &lt;canvas&gt;.', 
				'<ul><li>Développement d''une application entièrement interactive utilisant les technologies web</li></ul>',
				'', 
				2);");
				
			
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 7, 400);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (1, 7, 400);");	
				
	/****************************************** VIEILLES CHARRUES ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				8, 
				'Application iPhone Vieilles Charrues', 
				'', 
				'Développement d''une application Open Source pour le festival des Vieilles Charrues.', 
				'En 2010, le festival des Vieilles Charrues cherchait à faire une application iPhone et Android. Mes connaissances d''Objective-C n''étaient que très sommaires, mais, aimant les défis, je me suis proposer pour faire l''application iPhone. Ce fut une expérience très enrichissante qui m''a permis de me plonger dans le développement pour mobiles. Ce projet est Open Source et les sources peuvent être récupérées <a href=\\\"http://code.google.com/p/vieillescharrues/\\\"> ici</a>', 
				'<ul><li>Développement d''une application iPhone</li><li>RTFM</li></ul>',
				'', 
				1);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (4, 8, 400);");

	


?>
