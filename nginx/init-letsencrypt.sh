#!/bin/bash

domains=("interviewerai.ru" "www.interviewerai.ru")
email="ksvarian374@gmail.com" # Укажите email для уведомлений Certbot
staging=1 # Установите 1 для тестового режима (без реальных сертификатов)

# Проверяем, указаны ли домены
if [ -z "$domains" ]; then
  echo "Не указаны домены!"
  exit 1
fi

# Создаём папку для сертификатов, если её нет
if [ ! -d "/etc/letsencrypt/live/${domains[0]}" ]; then
  certbot --nginx --agree-tos --email $email --domains $(echo "${domains[@]}" | tr ' ' ',') --non-interactive --redirect
else
  echo "Сертификаты уже существуют."
fi

# Перезапускаем Nginx для применения новых сертификатов
nginx -s reload