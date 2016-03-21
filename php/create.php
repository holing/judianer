<?php 
	require_once 'phpclass.php';
	session_start();
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
	// echo $createName;
	// return 0;
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