FROM php:7.4-apache
RUN apt-get update; apt-get install unzip git -y
RUN docker-php-ext-install mysqli && a2enmod rewrite
RUN a2enmod rewrite
EXPOSE 80
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


CMD ["/entrypoint.sh"]
