<?
	$db = new SQLite3("../db/datas.sqlite");

	$res = $db->query("SELECT experience.*, type_experience.name as type_str FROM experience INNER JOIN type_experience ON experience.type = type_experience._id");
	$buffer = "";
	$buffer .= "{\"experience\":[";

	$sep = "";
	while($row = $res->fetchArray()) {
		$buffer .= $sep."{\"title\":\"".$row['title']."\", 
			\"id\":".$row['_id'].",
			\"type\":".$row['type'].",
			\"typeStr\":\"".$row['type_str']."\",
			\"descriptionShort\":\"".$row['desc_short']."\",
			\"description\":\"".$row['desc']."\",
			\"image\":\"".$row['image']."\",
			\"open\":".$row['open'].",
			\"other\":\"".$row['other']."\",
			\"skills\":[";
		$resLinks = $db->query("SELECT id_skill, name, size FROM links 
					INNER JOIN skills ON skills._id = links.id_skill
					WHERE id_experience=".$row['_id']);

		$sepSkill = "";
		while($skill = $resLinks->fetchArray()) {
			$buffer .= $sepSkill."{\"name\":\"".$skill['name']."\",
				\"id\":".$skill['id_skill'].",
				\"size\":".$skill['size']."}";
			$sepSkill = ",";
		}
		$buffer .= "]}";
		$sep = ",";
	}	
	$buffer .= "], \"skills\":[";
	$resSkills = $db->query("SELECT * from skills");
	
	$sepSkill = "";
	while($skill = $resSkills->fetchArray()) {
			$buffer .= $sepSkill."{\"name\":\"".$skill['name']."\",
				\"id\":".$skill['_id']."}";
			$sepSkill = ",";
		}
		
	$buffer .= "],
\"words\":[";
	
	//GETTING THE WORDS
	$res = $db->query("SELECT * FROM words");
	
	$sep ="";
	while($row = $res->fetchArray()) {
		$buffer .= $sep."{\"word\":\"".$row['word']."\",
\"description\":\"".$row['description']."\"
}";
		$sep = ",";
	}
	$buffer .= "]}";
	
	echo $buffer;
?>
