<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


$id=isset($_GET['id']) ? $_GET['id'] : die('Nie znaleziono takiego użytkownika');

session_id( $id );
session_start();
if(isset($_SESSION['isLogged'])){
include '../config/database.php';
	
 if($_SESSION['admin'] == true){
	
		$query = new MongoDB\Driver\Query([]);
		$collection = $m -> executeQuery("wypozyczalnia.klienci", $query);
		
		echo json_encode(iterator_to_array($collection));
 }
else{
	echo json_encode(array('result'=>'nie masz dostępu'));
}
}
else{
	echo json_encode(array('result'=>'Zaloguj się'));
}
?>