<?php

header("Access-Control-Allow-Origin: *");

require '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'],  PHP_URL_PATH);

$users_file = '../data/users2.json';
$users = file_exists($users_file) ? json_decode(file_get_contents($users_file), true) : [];



function send($data, $code = 200) {
  http_response_code($code);
  header('Content-Type: application/json');
  usleep(1500000);
  echo json_encode($data);
  exit;
}



if ($request_method === 'POST' && $request_uri === '/jwt/api/users/authenticate') {
  
  $input = json_decode(file_get_contents('php://input'), true);
  
  if ($input === null) {
    send(['error' => 'Nieprawidłowy JSON lub brak danych'], 400);
  }

  foreach($users as $user) {
    if ($user['username'] === $input['username'] && password_verify($input['password'], $user['password'])) {
      unset($user['password']);
      $key = 'tajny_klucz';
      $payload = [
        'iss' => 'twoja_domena.pl',
        'iat' => time(),
        'exp' => time() + 3600,
        'user_id' => $user['id']
      ];
      $jwt = JWT::encode($payload, $key, 'HS256');

      send(['message' => 'Zalogowano pomyślnie', 'token' => $jwt]);
    }
  }

  // Jeśli żaden użytkownik nie pasował
    send(['error' => 'Nieprawidłowa nazwa użytkownika lub hasło'], 401);
} else {
  send(['error' => 'Nieobsługiwany endpoint'], 404);
}
