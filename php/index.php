<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/UserController.php';

$app = AppFactory::create();

$app->post('/signup', "UserController:signup");
$app->post('/login', "UserController:login");
$app->get('/user/{token}', "UserController:show");

$app->run();
