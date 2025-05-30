<?php

// require_once 'headers.service.php';

function checkHeaders() {
  $headers = getallheaders();
  if (isset($headers['Authorization'])) {
    $authHeader = $headers['Authorization'];
    list($type, $token) = explode(' ', $authHeader, 2);
    if ($type === 'Bearer' && !empty($token)) {
      // jesli przejdzie to zwróć true
      
    } else {
      http_response_code(401);
      echo json_encode(['error' => 'Nieautoryzowany']);
      exit;
    }
  }
  
}


$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = parse_url($_SERVER['REQUEST_URI'],  PHP_URL_PATH);

$exampleToken = '2#F$$#@12$####';


function send($data, $code = 200) {
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data);
  exit;
}


if ($request_method = 'GET' && $request_uri === '/jwt-api/api/cars') {

  checkHeaders();
}