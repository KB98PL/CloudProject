<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$filmId = $request->filmId;

session_id( $id );
session_start();

if(isset($_SESSION['isLogged'])){
	include '../config/database.php';
	
	 if($_SESSION['admin'] == true){
				$filmId = new MongoDB\BSON\ObjectId($filmId);
				$filter = ['_id' => $filmId];
				$query = new MongoDB\Driver\Query($filter);
				$doc = $m ->executeQuery('wypozyczalnia.filmy', $query);				
				echo json_encode(iterator_to_array($doc));


	}else{
	echo json_encode(array('result'=>'nie masz dostępu'));
	}
}
else{
	session_destroy();
	echo json_encode(array('resultOfLogging'=>'Zaloguj się!'));
}
?>