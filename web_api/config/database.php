<?php
	//phpinfo();
	$m = new MongoDB\Driver\Manager("mongodb+srv://".$_ENV["MONGODB_USER"].":".$_ENV["MONGODB_PASSWORD"]."@cluster0.bf2kv.mongodb.net/wypozyczalnia");
?>
