# Utilizzare Docker per avviare un LAMP

Dentro la cartella di progetto avviare il container Docker con php, apache e composer

`docker run --rm --name myPhp -v ${PWD}:/var/www/html -p 8080:80 benvenuti/php-composer:1.1`

Aprire il browser al seguente indirizzo: 
http://localhost:8080

## Per terminare il container docker

In un altro terminale eseguire il seguente comando:

`$ docker kill myPhp`

## Al primo avvio o quando vengono modificate le dipendenze

In un altro terminale eseguire il seguente comando per eseguire 'composer update' dentro il container:

`$ docker exec myPhp composer update`

Questo scaricherà le dipendenze dentro la cartella 'vendor', già aggiunta al `.gitignore`

