<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->get('/', function (Request $request, Response $response, $args) {
  $mysqli_connection = new MySQLi('my_db', 'root', 'ciccio', 'db');
  $result = $mysqli_connection->query("SELECT * FROM alunni");
  $results = $result->fetch_all(MYSQLI_ASSOC);
  $response->getBody()->write(json_encode($results));
  return $response->withHeader("Content-type", "application/json")->withStatus(201);
});

$app->run();
