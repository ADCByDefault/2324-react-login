<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/PartiteController.php';

$app = AppFactory::create();

$app->post('/partita', "PartiteController:create");
$app->put('/partita/{id}', "PartiteController:update");

$app->run();
