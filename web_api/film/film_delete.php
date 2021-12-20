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
	$filter = ['_id' => $filmId,'dostepnosc' => false];
	
	$query = new MongoDB\Driver\Query($filter);
	$doc = $m ->executeQuery('wypozyczalnia.filmy', $query);
	$count = count($doc->toArray());
	
	if($count != 0)
	{
		echo json_encode(array('result'=>false));
	}
	else
	{
		$filter = ['_id' => $filmId];
		$bulkWrite = new MongoDB\Driver\BulkWrite;
	
		$bulkWrite->delete($filter);
		$m->executeBulkWrite('wypozyczalnia.filmy', $bulkWrite);
		echo json_encode(array('result'=>true));

	}
	
 }
else{
	echo json_encode(array('result'=>'Nie masz dostępu'));
}
}
else{
	echo json_encode(array('result'=>'Zaloguj się'));
}
?>