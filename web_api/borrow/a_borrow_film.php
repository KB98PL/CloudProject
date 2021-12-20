<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$filmId = $request->filmId;
$imie = $request->imie;
$nazwisko = $request->nazwisko;
$userIdTarget = $request->userId;

session_id( $id );
session_start();
if(isset($_SESSION['isLogged'])){
include '../config/database.php';

		  $f = null;
		  if($userIdTarget != null)
		  {
			   $userIdTarget = new MongoDB\BSON\ObjectId($userIdTarget);
			  $f = [ '_id' => $userIdTarget];
		  }
		  else if($nazwisko != null && $imie == null)
		  {
			  $f = [ 'nazwisko' => $nazwisko];
		  }
		  else if($nazwisko == null && $imie != null)
		  {
			  $f = [ 'imie' => $imie];
		  }
		  else if($nazwisko != null && $imie != null)
		  {
			  $f = [ '$and' => [[ 'imie' => $imie],[ 'nazwisko' => $nazwisko]]];
		  }
		  if($f  ==null)
		  {
			   die('Musisz cos wpisac');
		  }
		  $query = new MongoDB\Driver\Query($f);
		  $doc = $m ->executeQuery('wypozyczalnia.klienci', $query);
		  
		  $count = count($doc->toArray());
		  
	if($count==1 && $filmId ){
		$query = new MongoDB\Driver\Query($f);
		$eee = $m ->executeQuery('wypozyczalnia.klienci', $query);
		$dt = $eee->toArray()[0];
		$userId = $dt -> _id;
		
		$userId = new MongoDB\BSON\ObjectId($userId);
		
		
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
				echo json_encode(array('result'=>'Klienta posiada już 3 wypożyczone filmy','success' => false));
		}
	}
	else{
		echo json_encode(array('result'=>'Nie udało się zidentyfikować klienta, znaleziono więcej klientów lub nieistnieje taki w bazie'));
		
	}

}
else{
	echo json_encode(array('result'=>'Zaloguj się jako admin'));
}
?>