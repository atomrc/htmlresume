<?
	$db = new SQLite3("../db/datas.sqlite");

	$res = $db->query("SELECT experience.*, type_experience.name as type_str FROM experience INNER JOIN type_experience ON experience.type = type_experience._id");
	echo "{\"experience\":[";

	$sep = "";
	while($row = $res->fetchArray()) {
		echo $sep."{\"title\":\"".$row['title']."\", 
			\"id\":".$row['_id'].",
			\"type\":".$row['type'].",
			\"typeStr\":\"".$row['type_str']."\",
			\"descriptionShort\":\"".$row['desc_short']."\",
			\"description\":\"".$row['desc']."\",
			\"image\":\"".$row['image']."\",
			\"other\":\"".$row['other']."\",
			\"skills\":[";
		$resLinks = $db->query("SELECT id_skill, name, size FROM links 
					INNER JOIN skills ON skills._id = links.id_skill
					WHERE id_experience=".$row['_id']);

		$sepSkill = "";
		while($skill = $resLinks->fetchArray()) {
			echo $sepSkill."{\"name\":\"".$skill['name']."\",
				\"id\":".$skill['id_skill'].",
				\"size\":".$skill['size']."}";
			$sepSkill = ",";
		}
		echo "]}";
		$sep = ",";
	}	
	echo "], \"skills\":[";
	$resSkills = $db->query("SELECT * from skills");
	
	$sepSkill = "";
	while($skill = $resSkills->fetchArray()) {
			echo $sepSkill."{\"name\":\"".$skill['name']."\",
				\"id\":".$skill['_id']."}";
			$sepSkill = ",";
		}
		
	echo "]}";	
?>
