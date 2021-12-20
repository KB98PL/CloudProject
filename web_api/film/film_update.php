<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$filmId = $request->id;
$tytul = $request->tytul;
$gatunek = $request->gatunek;
$rezyser = $request->rezyser;
$streszczenie_fabuly = $request->streszczenie_fabuly;
$czas_trwania = $request->czas_trwania;
$ocena_filmu = $request->ocena_filmu;
$obsada = $request->obsada;

session_id( $id );
session_start();
if(isset($_SESSION['isLogged'])){
include '../config/database.php';
	
 if($_SESSION['admin'] == true){
	if($id && $filmId && $tytul){
	
		
				
		$bulkWrite = new MongoDB\Driver\BulkWrite;
		$filmId = new MongoDB\BSON\ObjectId($filmId);
		$filter = ['_id' => $filmId];
		$update = ['$set' => ['tytul' => $tytul, 'gatunek' => $gatunek, 'rezyser' => $rezyser,'streszczenie_fabuly' => $streszczenie_fabuly,'czas_trwania' => $czas_trwania,'ocena_filmu' => $ocena_filmu,'obsada' => $obsada]];
		$options = ['multi' => false, 'upsert' => false];
		$bulkWrite->update($filter, $update, $options);
		$m->executeBulkWrite('wypozyczalnia.filmy', $bulkWrite);  


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