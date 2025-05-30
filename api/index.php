<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<?php require_once('init.php'); ?>
<?php require_once('database.class.php'); ?>

<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = array();
  $data['username'] = $_POST['username'] ?? null;
  $data['password'] = $_POST['password'] ?? null;

  if (isset($data)) {
    Database::createNewUser($data);
  }
}

?>

<form method="post">
  <p>
    <input type="text" name="username" value="">
  </p>
  <p>
    <input type="text" name="password" value="">
  </p>
  <p>
    <input type="submit" value="Zapisz">
  </p>
</form>
  
</body>
</html>