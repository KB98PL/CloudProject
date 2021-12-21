<?php
	//phpinfo();
	echo $_ENV["MONGODB_USER"];
	echo 'mongodb+srv://'.$_ENV["MONGODB_USER"].':jakiesHaslo@cluster0.bf2kv.mongodb.net/wypozyczalnia';
	$m = new MongoDB\Driver\Manager("mongodb+srv://".$_ENV['MONGODB_USER'].":".$_ENV['MONGODB_PASSWORD']."@cluster0.bf2kv.mongodb.net/wypozyczalnia");
?>
