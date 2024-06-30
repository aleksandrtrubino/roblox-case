INSERT INTO users (id, nickname, email, password, enabled)
VALUES
    (123, 'admin','admin','$2a$10$y/JvN2K1McAqP5.z8asBOeXnk67sqD/Rz/mV8xHGx8bMZglIqriX6',true);

INSERT INTO users_authorities (user_id, authority_id)
VALUES
    (123, 692);