<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include '../config/database.php';
 

include '../config/database.php';
	
	
	
		
		$query = new MongoDB\Driver\Query([]);
		$collection = $m -> executeQuery("wypozyczalnia.filmy", $query);
		
		echo json_encode(iterator_to_array($collection));
	


?>