# Базовый образ Nginx
FROM nginx:latest

# Устанавливаем Certbot и зависимости
RUN apt-get update && apt-get install -y \
    certbot \
    python3-certbot-nginx \
    && rm -rf /var/lib/apt/lists/*

# Копируем конфигурацию Nginx
COPY ./nginx/conf.d /etc/nginx/conf.d

# Сценарий автоматической генерации сертификатов
COPY ./init-letsencrypt.sh /usr/local/bin/init-letsencrypt.sh
RUN chmod +x /usr/local/bin/init-letsencrypt.sh

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]