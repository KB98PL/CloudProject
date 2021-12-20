<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$wypozyczenieId = $request->id;


session_id( $id );
session_start();
if(isset($_SESSION['isLogged']) && $_SESSION['admin']){
include '../config/database.php';
	

	if($id && $wypozyczenieId){
		$wypozyczenieId = new MongoDB\BSON\ObjectId($wypozyczenieId);
		
		
		   $bulkWrite = new MongoDB\Driver\BulkWrite;
		   
		   $filter = ['_id' => $wypozyczenieId];
		   date_default_timezone_set('Europe/Warsaw');
		   $date = date('Y-m-d G:i:s');

		   $update = ['$set' => ['dataFaktycznegoZwrotu' => $date]];
		   $options = ['multi' => false, 'upsert' => false];
		   $bulkWrite->update($filter, $update, $options);
		   $m->executeBulkWrite('wypozyczalnia.wypozyczenia', $bulkWrite);  
		   
		   //wyszukanie idFilmu
		    $filter = ['_id' => $wypozyczenieId];
			$query = new MongoDB\Driver\Query($filter);
			$cursor = $m ->executeQuery('wypozyczalnia.wypozyczenia', $query);
				
			$document = $cursor->toArray()[0];
			$tytul = $document -> tytul;
			
			$filter = ['tytul' => $tytul];
			$qr = new MongoDB\Driver\Query($filter);
			$cr = $m ->executeQuery('wypozyczalnia.filmy', $qr);
			$dc = $cr->toArray()[0];
			$idFilm = $dc -> _id;
			$idFilm = new MongoDB\BSON\ObjectId($idFilm);
		   
		   //set avaible
		     $bw = new MongoDB\Driver\BulkWrite;
		   
			$filter = ['_id' => $idFilm];
			$update = ['$set' => ['dostepnosc' => true]];
			$options = ['multi' => false, 'upsert' => false];
			$bw->update($filter, $update, $options);
			$m->executeBulkWrite('wypozyczalnia.filmy', $bw);  
			
		 
			
			echo json_encode(array('result'=>'Zwrócono film','success' => true));

		
	}
	else{
		echo json_encode(array('result'=>''));
		
	}

}
else{
	echo json_encode(array('result'=>'Zaloguj się'));
}
?>