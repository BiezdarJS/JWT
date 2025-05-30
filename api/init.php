<?php

require_once('db_credentials.php');

$db = new PDO("mysql:dbhost=$db_host;dbname=$db_name", $db_user, $db_pass);

?>

