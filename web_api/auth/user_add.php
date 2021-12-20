<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

 $postdata = file_get_contents("php://input");
 $request = json_decode($postdata);
 $nick = $request->nick;
 $imie = $request->imie;
 $nazwisko = $request->nazwisko;
 $pass = $request->password;
 $adres = $request->adres;
 $telefon = $request->telefon;
 $adminPanel = $request -> adminPanel;
 
	if($nick && $imie && $pass && $nazwisko && $adres && $telefon )
	{
		include '../config/database.php';
			$filter = ['nick' => $nick];
			$query = new MongoDB\Driver\Query($filter);
			$doc = $m ->executeQuery('wypozyczalnia.klienci', $query);
			
			$countNick = count($doc->toArray());
			
			 if($countNick>=1)
			   {
				echo json_encode(array('resultOfLogging'=>'taki użytkownik juz istnieje'));
			   }
			 else{
				date_default_timezone_set('Europe/Warsaw');
				$date = date('Y-m-d G:i:s');

			$hash = password_hash($pass, PASSWORD_BCRYPT);
			
			   $bulkWrite = new MongoDB\Driver\BulkWrite;
				$doc = ['imie' => $imie, 'nazwisko' => $nazwisko, 'password' => $hash,'nick' => $nick,'adres' => $adres, 'telefon' => $telefon,'dataRejestracji'=>$date];
				$bulkWrite->insert($doc);
				$m->executeBulkWrite('wypozyczalnia.klienci', $bulkWrite);
			
							if(!$adminPanel){
								
								session_start();
								if(!isset($_SESSION['isLogged'])){
									$_SESSION['isLogged']=true;
									$_SESSION['username']=$nick;
									$token = session_id();
									
									$_SESSION['admin'] = false;
									
									echo json_encode(array('resultOfLogging'=>'Zalogowano','token'=>$token));
								}
				
							}
							else
							{
								echo json_encode(array('resultOfLogging'=>'Utworzono nowego klienta','result' => true));
							}
							
			}
	
	
	}
	else{
	echo json_encode(array('resultOfLogging'=>'nie uzupełniono wszystkich pól formularza'));
	}
?>