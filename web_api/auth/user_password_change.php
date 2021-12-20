<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$userId = $request->userId;
$pass = $request->password;

 session_id( $id );
 session_start();
 if(isset($_SESSION['isLogged'])){
 include '../config/database.php';

  if($_SESSION['admin'] == true){
	
		$bulkWrite = new MongoDB\Driver\BulkWrite;
		$userId = new MongoDB\BSON\ObjectId($userId);
		$filter = ['_id' => $userId];
		$hash = password_hash($pass, PASSWORD_BCRYPT);
		$update = ['$set' => ['password' => $hash]];
		$options = ['multi' => false, 'upsert' => false];
		$bulkWrite->update($filter, $update, $options);
		$m->executeBulkWrite('wypozyczalnia.klienci', $bulkWrite);  


		echo json_encode(array('result'=>'Zedytowano'));
 }
 else{
	echo json_encode(array('result'=>'nie masz dostępu'));
 }
 }
else{
 echo json_encode(array('result'=>'zaloguj się'));
 }
?>