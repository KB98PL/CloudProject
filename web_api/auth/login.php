<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Origin");
header('Content-Type: application/json, charset=utf-8');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$nick = $request->nick;
	$pass = $request->password;
  
	if($nick && $pass){
	  
		if($nick == "admin" && $pass=="admin")
		{
			session_start();			
					if(!isset($_SESSION['isLogged'])){
						$_SESSION['isLogged']=true;
						$_SESSION['username']=$nick;
						$token = session_id();
						$_SESSION['admin'] = true;
			}

			echo json_encode(array('resultOfLogging'=>'Zalogowano','token'=>$token));
		}
		else
		{

			include '../config/database.php';
		
		
			$filter = ['nick' => $nick];
			$query = new MongoDB\Driver\Query($filter);
			$doc = $m ->executeQuery('wypozyczalnia.klienci', $query);
			
			$countNick = count($doc->toArray());
			
			if($countNick<1)
		    {
				echo json_encode(array('resultOfLogging'=>'nie ma takiego użytkownika'));
		    }
		    else
			{
				$filter = ['nick' => $nick];
				$query = new MongoDB\Driver\Query($filter);
				$cursor = $m ->executeQuery('wypozyczalnia.klienci', $query);
				
				$document = $cursor->toArray()[0];
				$passFromDB = $document -> password;				

				$hash = password_verify($pass,$passFromDB);
				if($hash)
				{
			   
						session_start();			
						if(!isset($_SESSION['isLogged'])){
							$_SESSION['isLogged']=true;
							$_SESSION['username']=$nick;
							$token = session_id();	
							$_SESSION['admin'] = false;
							$_SESSION['userId'] = $document -> _id;
							
							echo json_encode(array('resultOfLogging'=>'Zalogowano','token'=>$token));
						}
						else{
							echo json_encode(array('resultOfLogging'=>'Jesteś już zalogowany'));
						}
						
				
			    }
			    else{
				  echo json_encode(array('resultOfLogging'=>'błędne hasło'));
			   }
			}
		}
	}
	else{
		echo json_encode(array('resultOfLogging'=>'nie uzupełniono wszystkich pól formularza'));
	}
?>