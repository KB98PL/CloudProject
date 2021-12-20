<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$userId = $request->id;
$nick = $request->nick;
$imie = $request->imie;
$nazwisko = $request->nazwisko;
$adres = $request->adres;
$telefon = $request->telefon;

session_id( $id );
session_start();
if(isset($_SESSION['isLogged'])){
include '../config/database.php';
	
 if($_SESSION['admin'] == true){
	if($id && $userId && $nick && $imie && $nazwisko){
	
		
				
		$bulkWrite = new MongoDB\Driver\BulkWrite;
		$userId = new MongoDB\BSON\ObjectId($userId);
		$filter = ['_id' => $userId];
		$update = ['$set' => ['nick' => $nick, 'adres' => $adres, 'telefon' => $telefon,'nazwisko' => $nazwisko,'imie' => $imie]];
		$options = ['multi' => false, 'upsert' => false];
		$bulkWrite->update($filter, $update, $options);
		$m->executeBulkWrite('wypozyczalnia.klienci', $bulkWrite);  


		echo json_encode(array('result'=>'Zedytowano'));
	}
	else{
		echo json_encode(array('result'=>'Nie uzupełniono wszystkich wymaganych pól'));
		
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