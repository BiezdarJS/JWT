<?php



class Database {

  public static function createNewUser($data) {
    global $db;
    $sql = "INSERT INTO users (username, password) VALUES (:username, :password)";
    $query = $db->prepare($sql);

    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    $result = $query->execute([':username' => $data['username'], ':password' => $hashedPassword]);
    return $result;
  } 

}