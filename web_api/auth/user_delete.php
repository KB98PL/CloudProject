<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$userId = $request->userId;

session_id( $id );
session_start();
if(isset($_SESSION['isLogged'])){
include '../config/database.php';
	
 if($_SESSION['admin'] == true){
	 
	
	 
	$userId = new MongoDB\BSON\ObjectId($userId);
	$filter = ['daneKlienta' => $userId];
	
	$query = new MongoDB\Driver\Query($filter);
	$doc = $m ->executeQuery('wypozyczalnia.wypozyczenia', $query);
	$count = count($doc->toArray());
	
	if($count != 0)
	{
		echo json_encode(array('result'=>false));
	}
	else
	{
		$bulkWrite = new MongoDB\Driver\BulkWrite;
		$filter = ['_id' => $userId];

		$bulkWrite->delete($filter);
		$m->executeBulkWrite('wypozyczalnia.klienci', $bulkWrite);
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