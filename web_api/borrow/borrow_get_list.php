<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include '../config/database.php';
 $id=isset($_GET['id']) ? $_GET['id'] : null;
session_id( $id );
session_start();

include '../config/database.php';
	
		if($_SESSION['admin'] == false)
		{
			$id = new MongoDB\BSON\ObjectId($_SESSION['userId']);
			$filter = ['daneKlienta' => $id];
			$query = new MongoDB\Driver\Query($filter);
			$collection = $m -> executeQuery("wypozyczalnia.wypozyczenia", $query);
			
			echo json_encode(iterator_to_array($collection));
		}
		else
		{
			$query = new MongoDB\Driver\Query([]);
			$collection = $m -> executeQuery("wypozyczalnia.wypozyczenia", $query);
		
			echo json_encode(iterator_to_array($collection));
		}
	
	


?>