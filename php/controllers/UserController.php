<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UserController
{
  public function signup(Request $request, Response $response, $args){
    sleep(1);
    $body = json_decode($request->getBody()->getContents(), true);    
    $username = $body["username"];
    $password = hash('sha256', $body["password"]);
    $email = $body["email"];
    $token = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(20/strlen($x)) )),1,20);
    $conn = new mysqli("my_mariadb", "root", "ciccio", "my_app");
    $raw_query = "INSERT INTO user(username, password, email, token) VALUES(?, ?, ?, ?)";
    $stmt = $conn->prepare($raw_query);
    $stmt->bind_param('ssss', $username, $password, $email, $token);
    $result = $stmt->execute();
    $response->getBody()->write(json_encode(array("status" => $result)));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function login(Request $request, Response $response, $args){
    sleep(1);
    $conn = new mysqli("my_mariadb", "root", "ciccio", "my_app");
    $body = json_decode($request->getBody()->getContents(), true);    
    $username = $body["username"];
    $password = hash('sha256', $body["password"]);
    $raw_query = "SELECT * FROM user WHERE username = ? AND password = ? LIMIT 1";
    $stmt = $conn->prepare($raw_query);
    $stmt->bind_param('ss', $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row){
      $response->getBody()->write(json_encode(array("token" => $row["token"])));
    }else{
      $response->getBody()->write(json_encode(array("token" => "")));
    }
      return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function show(Request $request, Response $response, $args){
    sleep(1);
    $conn = new mysqli("my_mariadb", "root", "ciccio", "my_app");
    $body = json_decode($request->getBody()->getContents(), true);    
    $token = $args["token"];
    $raw_query = "SELECT * FROM user WHERE token = ? LIMIT 1";
    $stmt = $conn->prepare($raw_query);
    $stmt->bind_param('s', $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    unset($row['password']);
    $response->getBody()->write(json_encode($row));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

}
