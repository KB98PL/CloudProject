<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$filmId = $request->id;


session_id( $id );
session_start();
if(isset($_SESSION['isLogged'])){
include '../config/database.php';
	

	if($id && $filmId){
		$userId = new MongoDB\BSON\ObjectId($_SESSION['userId']);
		
		
		 $f = ['daneKlienta' => $userId,'dataFaktycznegoZwrotu' => ""];
		 $query = new MongoDB\Driver\Query($f);
		 $doc = $m ->executeQuery('wypozyczalnia.wypozyczenia', $query);
			
		 $countWyp = count($doc->toArray());
		if($countWyp < 3)
		{
		   $bulkWrite = new MongoDB\Driver\BulkWrite;
		   $filmId = new MongoDB\BSON\ObjectId($filmId);
		   $filter = ['_id' => $filmId];
		   $update = ['$set' => ['dostepnosc' => false]];
		   $options = ['multi' => false, 'upsert' => false];
		   $bulkWrite->update($filter, $update, $options);
		   $m->executeBulkWrite('wypozyczalnia.filmy', $bulkWrite);  
		   
		   
			date_default_timezone_set('Europe/Warsaw');
			$utcdatetime2 = new DateTime;
			$utcdatetime2->add(new DateInterval('P2D'));
			$utc1 = new MongoDB\BSON\UTCDateTime(new DateTime);
			$utc2 = new MongoDB\BSON\UTCDateTime($utcdatetime2);

			$fil = ['_id' => $filmId];
			$que = new MongoDB\Driver\Query($fil);
			$d = $m ->executeQuery('wypozyczalnia.filmy', $que);
			$dt = $d->toArray()[0];
			$tytul = $dt -> tytul;
			$bue = new MongoDB\Driver\BulkWrite;

			$dc = ['daneKlienta' => $userId, 'tytul' => $tytul, 'dataWypozyczenia' => $utc1,'dataZwrotu' => $utc2,'dataFaktycznegoZwrotu' => ""];
			$bue->insert($dc);
			$m->executeBulkWrite('wypozyczalnia.wypozyczenia', $bue);
			
			echo json_encode(array('result'=>'Wypożyczono film','success' => true));

		}
		else
		{
				echo json_encode(array('result'=>'Posiadasz już 3 wypożyczone filmy','success' => false));
		}
	}
	else{
		echo json_encode(array('result'=>''));
		
	}

}
else{
	echo json_encode(array('result'=>'Zaloguj się'));
}
?>