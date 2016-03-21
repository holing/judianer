<?php 
	/**
	* class party
	*/
	class party
	{
		function __construct() {
			
		}
		public function createParty($partyName, $partyAddr, $partyDate, $createUser){
			$mysql = new MySql();
			$db = $mysql->dbconnect();
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
				return "false80";
			}else{
				$partyID = $db->insert_id;
				// $partyID = "true";
				return $partyID;
			}
			
		}
	}

	/**
	* Mysql connect to database
	*/
	class MySql
	{
		
		function __construct()
		{	
		}
		public function dbconnect()
		{
			$result = new mysqli('localhost','root','','judianer');
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
	
 ?>