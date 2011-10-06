<!DOCTYPE html>

<html>
	<head>
		<title>Thomas Belin CV</title>
		<link rel="stylesheet" type="text/css" href="style/style.css"/>
		<script type="text/javascript" language="JavaScript" src="js/general.js"></script>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="shortcut icon" href="images/favicon.ico" />
		
		<!-- Piwik -->
		<script type="text/javascript">
		var pkBaseURL = (("https:" == document.location.protocol) ? "https://cv.thomasbelin.fr/piwik/" : "http://cv.thomasbelin.fr/piwik/");
		document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
		</script><script type="text/javascript">
		try {
		var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
		piwikTracker.trackPageView();
		piwikTracker.enableLinkTracking();
		} catch( err ) {}
		</script><noscript><p><img src="http://cv.thomasbelin.fr/piwik/piwik.php?idsite=1" style="border:0" alt="" /></p></noscript>
		<!-- End Piwik Tracking Code -->
		
		<script type="text/javascript" language="Javascript">
			window.onload = initCV;
			<? 
				$lang = $_POST['lang'];
				if(isset($lang)) {
					echo "var lang =\"$lang\";"; 
				}else {
					echo "var lang =\"en\";"; 
				}	
			?>
		</script>
		
		
	</head>
	

	<body>
		<div id="menuBar">
			<form action="" method="POST">
				<input type="hidden" name="lang" value="en"/>
				<input type="submit" value="en"/>
			</form>
			<form action="" method="POST">
				<input type="hidden" name="lang" value="fr"/>
				<input type="submit" value="fr"/>
			</form>
		</div>
		<div id="main">
			<div id="header">
				<h1 id="nom">Thomas Belin</h1>
				<h2 id="title">Elève Ingénieur à Polytech'Nantes (promotion 2012)</h2>
			</div>
			<div id="content">
				<div id="mainContainer">
					<div id="compMessage">
						Désolé votre navigateur n'est pas assez récent pour afficher cette page correctement.<br/>Pour profiter pleinement des nouvelles fonctionnalités d'HTML5, utilisez l'un des navigateur suivant :
						<ul>
							<li><a href="http://www.mozilla.org/fr/firefox/new/">Mozilla Firefox</a></li>
							<li><a href="http://www.google.com/chrome?hl=fr">Google Chrome</a></li>
							<li><a href="http://www.apple.com/fr/safari/">Apple Safari</a></li>
						</ul>
					</div>	
				</div>
				<div id="divMe">
				</div>
				<noscript>
					Vous devez activer Javascript pour voir cette page correctement
				</noscript>
				
			</div>
		</div>
		<div id="footer">
			Thomas Belin<br/>
			ThomasBelin4@gmail.com<br/>
			+33(0)6.99.05.97.83 
		</div>
	</body>
</html>
