INSERT INTO users (id, nickname, email, password, enabled)
VALUES
    (1, 'user', 'user', '$2a$10$03zqg8Jzz2JNmfRVb8oY4ekqsSHZtw2l7FayB3V4QkKtEfbZH3qHq', true),
    (2, 'moderator', 'moderator', '$2a$10$3YMp8G.wucLp0OywbC5Hlue68zTd240BCLcXK3L5qfMjQgwXqVa2S', true),
    (3, 'admin','admin','$2a$10$y/JvN2K1McAqP5.z8asBOeXnk67sqD/Rz/mV8xHGx8bMZglIqriX6',true);
INSERT INTO users_authorities (user_id, authority_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);