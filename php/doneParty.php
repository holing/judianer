<?php 
	session_start();
	class party
	{
		function __construct() {
			
		}
		public function createParty($partyName, $partyAddr, $partyDate, $createUser){
			$mysql = new MySql();
			$db = $mysql->dbConnect();
			if ($db == flase) {
				return false;
			}
			$query = "insert into party(partyName, partyAddr, partyDate, createDate, createUser) values('".$partyName."','".$partyAddr."','".$partyDate."',now(),'".$createUser."');";
			// try {
			// 	$result = $db->query($query);
			// } catch (Exception $e) {
			// 	return $e;
			// }
			$result = $db->query($query);
			// $result = $db->query("select * from party;");
			if (!$result) {
				return false;
			}
			$partyID = $db->insert_id;
			// $partyID = "true";
			return $partyID;
		}
	}
	class MySql
	{
		
		public function dbConnect()
		{
			$result = new mysqli('localhost','root','chenfushan','judianer');
			if (!$result) {
				return false;
			}
			return $result;
		}
		public function resultToArray($result)
		{
			$resArray = array();
			for ($count=0; $row = $result->fetch_assoc(); $count++) { 
				$resArray[$count] = $row;
			}
			return $resArray;
		}
	}

	if (isset($_SESSION['partyName']) && isset($_SESSION['partyAddr'])) {
		$partyName = $_SESSION['partyName'];
		$partyAddr = $_SESSION['partyAddr'];
	}else{
		echo "empty";
		return 0;
	}
	$partyDate = $_POST['DateSelected'];
	$createName = $_POST['name'];
	if ($partyDate == '' || $createName == '') {
		echo "false";
		return 0;
	}
	// $party = new party();
	// echo $party;
	// $partyID = $party->createParty($partyName, $partyAddr, $partyDate, $createName);
	// $mysql = new MySql();
	// $db = $mysql->dbConnect();
	// if ($db == false) {
	// 	return false;
	// }
	// $query = "insert into party(partyName, partyAddr, partyDate, createDate, createUser) values('".$partyName."','".$partyAddr."','".$partyDate."',now(),'".$createUser."');";
	// // try {
	// // 	$result = $db->query($query);
	// // } catch (Exception $e) {
	// // 	return $e;
	// // }
	// $result = $db->query($query);
	// // $result = $db->query("select * from party;");
	// if (!$result) {
	// 	return false;
	// }
	// $partyID = $db->insert_id;
	// if ($partyID != false) {
	// 	echo $partyID;
	// }else{
	// 	echo "false";
	// }

	$party = new party();
	// echo $party;
	$partyID = $party->createParty($partyName, $partyAddr, $partyDate, $createName);
	if ($partyID == false ) {
		echo "false";
	}else{
		if ($partyID == "false80") {
			echo "false80";
		}else{
			echo $partyID;
		}
		
	}

 ?>