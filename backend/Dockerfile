# Используем базовый образ Maven для сборки
FROM maven:3.9.5-eclipse-temurin-21 AS build

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем исходный код и скрипты Maven
COPY . /usr/src/app

# Выполняем сборку проекта
RUN mvn clean package -DskipTests

# Используем легковесный OpenJDK образ для запуска приложения
FROM openjdk:21-jdk-slim

# Копируем собранный JAR файл из предыдущего слоя
COPY --from=build /usr/src/app/target/*.jar /opt/app.jar

# Устанавливаем рабочую директорию
WORKDIR /opt

# Устанавливаем точку входа для запуска приложения
ENTRYPOINT ["java", "-Dfile.encoding=UTF-8", "-jar", "app.jar"]