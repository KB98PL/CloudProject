<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->token;
$tytul = $request->tytul;
$gatunek = $request->gatunek;
$rezyser = $request->rezyser;
$streszczenie_fabuly = $request->streszczenie_fabuly;
$czas_trwania = $request->czas_trwania;
$ocena_filmu = $request->ocena_filmu;
$obsada = $request->obsada;
 
 
	if($tytul && $gatunek && $rezyser && $streszczenie_fabuly && $czas_trwania && $ocena_filmu && $obsada)
	{
		include '../config/database.php';
			$filter = ['tytul' => $tytul];
			$query = new MongoDB\Driver\Query($filter);
			$doc = $m ->executeQuery('wypozyczalnia.filmy', $query);
			
			$countNick = count($doc->toArray());
			
			 if($countNick>=1)
			   {
				echo json_encode(array('result'=>false));
			   }
			 else{
				date_default_timezone_set('Europe/Warsaw');
				$date = date('Y-m-d G:i:s');

			
			   $bulkWrite = new MongoDB\Driver\BulkWrite;
				$doc = ['tytul' => $tytul, 'gatunek' => $gatunek, 'rezyser' => $rezyser,'streszczenie_fabuly' => $streszczenie_fabuly,'czas_trwania' => $czas_trwania, 'ocena_filmu' => $ocena_filmu,'obsada' => $obsada,'czas_utworzenia'=>$date];
				$bulkWrite->insert($doc);
				$m->executeBulkWrite('wypozyczalnia.filmy', $bulkWrite);
			
		
							
								
				echo json_encode(array('result'=>true));
				
				
			}
	
	
	}
	
	else{
	echo json_encode(array('resultOf'=>'nie uzupełniono wszystkich pól formularza'));
	}


?>