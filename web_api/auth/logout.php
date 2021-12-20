<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$id=isset($_GET['id']) ? $_GET['id'] : die('Nie znaleziono takiego komentarza');

	session_id( $id );
	session_start();
	session_destroy();
	
	echo json_encode(array('resultOfLogging'=>'Wylogowano'));

?>