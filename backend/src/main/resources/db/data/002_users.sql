INSERT INTO users (id, nickname, email, password, enabled)
VALUES
   (1, 'admin','admin@mail.ru','$2a$10$UcBHw/WSoLgLcJBT6a7SneaU0uvZLp.RzerFN5Rx7hurMSLJhbtWe',true);
INSERT INTO users_authorities (user_id, authority_id)
VALUES
    (1, 1);