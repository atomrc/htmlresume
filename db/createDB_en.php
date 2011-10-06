<?

	$db = new SQLite3("datas_en.sqlite");
	
	$db->query("DROP TABLE skills");
	$db->query("DROP TABLE experience");
	$db->query("DROP TABLE type_experience");
	$db->query("DROP TABLE links");	
	$db->query("DROP TABLE words");	
	
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
					open INTEGER DEFAULT 0,
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
			
	$db->query("CREATE TABLE words (
					_id INTEGER PRIMARY KEY,
					word TEXT,
					description TEXT
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
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, open, date_start, type) VALUES (
				0, 
				'HTML5 resume', 
				'', 
				'Design of an web resume using HTML5, Javascript and CSS transitions', 
				'As I wanted to do my 2012 internship in the field of latest web technologies, I decided to make a resume using those technologies. I used some of the new features provided by HTML5/CSS3 (&lt;canvas&gt;, CSS transitions) to do so. You are currently seeing the result of this project. It is an Open Source project and can be found here : <a href=\\\"http://github.com/thomasbelin4/htmlresume\\\">http://github.com/thomasbelin4/htmlresume</a>',
				'<ul><li>Development of a Javascript application using video games programming technics (physical engine, game loop)</li><li>Optimisation of a Javascript application (limiting reflow/repaint, grouping drawing operations, Limiting operations when nothing needs to be updated ...)</li><li>Using CSS transitions</li><ul>',
				1,
				'',
				1);");
				
	
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 0, 100);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (1, 0, 100);");
	
	/****************************************** SITE GALA ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				1, 
				'Polytech By Night website', 
				'', 
				'Development of the website of the Polytech Nantes''s gala (<a href=\\\"http://polytechbynight.fr\\\">polytechbynight.fr</a>).', 
				'This year I was member of our school gala''s organisation team, and I decided to take care of the website.  As it contains a Javascript module to book seats online and an online payement, I had to be very careful with security.', 
				'<ul><li>Handeling users with PHP</li><li>Securing a website (XSS, SQL injection)</li></ul>', 
				'',
				1);");
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 1, 350);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (2, 1, 175);");			
			
	/****************************************** VUE CHRONO ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, image, open, date_start, type) VALUES (
				2, 
				'Chronological HTML5 view', 
				'', 
				'Development of an HTML5 view for a chronological resume (<a href=\\\"http://cv.thomasbelin.fr/timeline/\\\">cv.thomasbelin.fr/timeline</a>)', 
				'As I wanted to display my resume in a different way, I developed an HTML5 view in order to display all my experience in a timeline. This is an Open Source project and can be found here : <a href=\\\"https://github.com/thomasbelin4/timeline\\\">https://github.com/thomasbelin4/timeline</a>', 
				'<ul><li>Manipulation poussée de la balise &lt;canvas&gt;/Javascript offert par HTML5</li></ul>',
				'images/timeline.png', 
				1,
				'',
				1);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 2, 225);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (1, 2, 225);");
	
					
	/****************************************** GREENCOPPER ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				3, 
				'Greencopper', 
				'', 
				'Internship at Greencopper, a mobile application publisher.<br/> (summer 2011)', 
				'My internship, from june to august 2011, at Greencopper, an company specialised in festival mobile applications, was very formative. I had to develop a generic calendar view that would be reused in their future projects. It taught me a lot of things in how to make an adaptative code and how to deal with performance issues.',
				'<ul><li>Advanced optimisation technics (reuse, limit the use of CPU and memory, traking memory leaks, gathering SQL query …)</li></ul>',
				'',
				0);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (4, 3, 50);");


	/****************************************** DPC ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, date_start, type) VALUES (
				4, 
				'DPC', 
				'', 
				'Internship at DPC-interactive, a mobile application publisher.<br/> (summer 2011)',
				'After having developed the \\\"Vieilles Charrues\\\" iPhone app, I found that I liked the field of mobile applications. So I decided to do an intership at DPC-interactive which is a mobile applications editor.', 
				'', 
				0);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (4, 4, 225);");


	/****************************************** SITE PERSO ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				5, 
				'Personal website', 
				'', 
				'Development of my personal website (<a href=\\\"http://thomasbelin.fr\\\">thomasbelin.fr</a>)', 
				'For my 2011 internship search, I wanted to have something stronger than just a resume to support my application. So I decided to develop my personal website.', 
				'<ul><li>Creation of a complete website from scratch using PHP</li></ul>', 
				'',
				1);");
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (2, 5, 300);");


	/****************************************** SITE FORMATION ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				6, 
				'Website for managing courses', 
				'', 
				'Development, in pairs, of a website for managing Polytech''s courses', 
				'This was a school project, in pair, to develop a website for managing our school''s courses. As both of us already knew PHP quite well, we decided ... not to use it. So we used Python and Django to implement this website.', 
				'<ul><li>Discovering the Django''s framework</li><li>Managing users with Django</li></ul>',
				'', 
				2);");

	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (3, 6, 150);");
	
	
	
	/****************************************** PTRANS ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, date_start, type) VALUES (
				7, 
				'Polytech''s Transversal Project', 
				'', 
				'An eight month project in pairs : development, using Javascript, of a workflow designer.',
				'The main project of the fourth year at Polytech Nantes is a project, in pair, in collaboration with a company. Our project was to develop a web application to design workflows. We had the choice of the technologies, but we decided to use open standars : HTML5 and the &lt;canvas&gt; tag.', 
				'<ul><li>Development of an interactive application using web technologies</li></ul>',
				'', 
				2);");
				
			
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (0, 7, 400);");
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (1, 7, 400);");	
				
	/****************************************** VIEILLES CHARRUES ************************************************/
	$db->query("INSERT OR REPLACE INTO experience (_id, title, company, desc_short, desc, other, open, date_start, type) VALUES (
				8, 
				'Vieilles Charrues iPhone app', 
				'', 
				'Development of a Open Source iPhone app for the french festival \\\"les Vieilles Charrues\\\" in 2010.', 
				'In 2010, the huge french festival \\\"Les Vieilles Charrrues\\\" wanted to have an iPhone application.  I only knew the basics of Objective C but I decided to develop this application. It is an Open Source project which can be found here : <a href=\\\"https://github.com/thomasbelin4/Vieilles-Charrues-iPhone\\\">https://github.com/thomasbelin4/Vieilles-Charrues-iPhone</a>', 
				'<ul><li>Developing for a mobile device</li><li>RTFM</li></ul>',
				1,
				'', 
				1);");
				
	
	$db->query("INSERT OR REPLACE INTO links (id_skill, id_experience, size) VALUES (4, 8, 350);");


/*************************************************************
WORDS
*************************************************************/

$db->query("INSERT INTO words (word, description) VALUES ('Musicien', 'Guitariste passioné depuis maintenant 7 ans, je joue régulièrement en groupe.')");
$db->query("INSERT INTO words (word, description) VALUES ('Créatif', 'Un minimum d''originalité demande un minimum de créativité.')");
$db->query("INSERT INTO words (word, description) VALUES ('Consciencieux', 'Je ne me contente jamais de faire quelque chose qui fonctionne. Je fais tout pour qu''il fonctionne le mieux possible.')");
$db->query("INSERT INTO words (word, description) VALUES ('Sportif', 'Parce que le crédo : ''Un corps sain dans un esprit sain'' semble très important à mes yeux, je pratique régulièrement le jogging et l''aviron.')");
$db->query("INSERT INTO words (word, description) VALUES ('Déterminé', 'J''aime me lancer des défis, et je me donne les moyens de les relever.')");
$db->query("INSERT INTO words (word, description) VALUES ('Impliqué', 'Quand je fais quelque chose je le fais à fond.')");

?>
