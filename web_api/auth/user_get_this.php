<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$id=isset($_GET['id']) ? $_GET['id'] : die('Nie znaleziono takiego użytkownika');

session_id( $id );
session_start();

if(isset($_SESSION['isLogged'])){
		
	include '../config/database.php';		
		
	if($_SESSION['admin'] == true){
					$json = json_encode(true);
					echo json_encode(array('res'=>true));
	}else{
		echo json_encode(array('res'=>false,'userId'=> $_SESSION['userId']));
	}
}
else{
	session_destroy();
	echo json_encode(array('resultOfLogging'=>'Zaloguj się!'));
}
?>