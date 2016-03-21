<?php
	session_start(); 
	$partyName = $_POST['partyName'];
	$partyAddr = $_POST['partyAddr'];

	$_SESSION['partyName'] = $partyName;
	$_SESSION['partyAddr'] = $partyAddr;

	echo "true";

 ?>