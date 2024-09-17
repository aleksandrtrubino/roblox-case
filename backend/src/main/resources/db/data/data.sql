INSERT INTO users (id, nickname, email, password, enabled)
VALUES
    (1, 'admin','trubino2003@gmail.com','$2a$10$UcBHw/WSoLgLcJBT6a7SneaU0uvZLp.RzerFN5Rx7hurMSLJhbtWe',true);
INSERT INTO users_authorities (user_id, authority_id)
VALUES
    (1, 1);

TRUNCATE TABLE pets;
INSERT INTO pets (id, name, rarity_id)
VALUES
    (1001, 'Field Mouse', 5),
    (1002, 'Corn Doggo', 5),
    (1003, 'Cat', 1),
    (1004, 'Mouse', 1),
    (1005, 'Flying Fish', 1),
    (1006, 'Dingo', 2),
    (1007, 'Donkey', 2),
    (1008, 'Arctic Tern', 2),
    (1009, 'Lobster', 2),
    (1010, 'Rock', 2),
    (1011, 'Ostrich', 3),
    (1012, 'Gorilla', 3),
    (1013, 'Space Whale', 4),
    (1014, 'Binturong', 4),
    (1015, 'Flaming Fox', 4),
    (1016, 'Nessie', 5),
    (1017, 'Spinosaurus', 5),
    (1018, 'Dimorphodon', 5),
    (1019, 'Mushroom Friend', 5),
    (1020, 'Fleur De Ice', 5),
    (1021, 'Chocolate Chow-Chow', 5),
    (1022, 'Peacock', 5),
    (1023, 'Hamster', 4),
    (1024, 'Happy Clam', 4),
    (1025, 'Chick', 1),
    (1026, 'Giant Blue Scarab', 4),
    (1027, 'Yeti', 4),
    (1028, 'Black Moon Bear', 3),
    (1029, 'Seahorse', 3),
    (1030, 'Yellow Butterfly', 3);
ALTER SEQUENCE pets_seq RESTART WITH 1031;

TRUNCATE TABLE pet_cards CASCADE ;
INSERT INTO pet_cards (id, price, pet_id)
VALUES
    (1001, 45, 1001),
    (1002, 78, 1002),
    (1003, 67, 1003),
    (1004, 92, 1004),
    (1005, 36, 1005),
    (1006, 55, 1006),
    (1007, 98, 1007),
    (1008, 60, 1008),
    (1009, 43, 1009),
    (1010, 82, 1010),
    (1011, 71, 1011),
    (1012, 50, 1012),
    (1013, 65, 1013),
    (1014, 33, 1014),
    (1015, 95, 1015),
    (1016, 61, 1016),
    (1017, 72, 1017),
    (1018, 84, 1018),
    (1019, 58, 1019),
    (1020, 76, 1020),
    (1021, 88, 1021),
    (1022, 47, 1022),
    (1023, 91, 1023),
    (1024, 35, 1024),
    (1025, 80, 1025),
    (1026, 53, 1026),
    (1027, 40, 1027),
    (1028, 66, 1028),
    (1029, 74, 1029),
    (1030, 90, 1030);
ALTER SEQUENCE pet_cards_seq RESTART WITH 1031;
INSERT INTO pet_cards_pet_properties (pet_card_id, pet_property_id)
VALUES
    (1001, 1),
    (1002, 1),
    (1003, 1),
    (1004, 1),
    (1005, 1),
    (1006, 1),
    (1007, 1),
    (1008, 1),
    (1009, 1),
    (1010, 1),
    (1011, 2),
    (1012, 2),
    (1013, 2),
    (1014, 2),
    (1015, 2),
    (1016, 1),
    (1017, 2),
    (1018, 2),
    (1019, 2),
    (1020, 1),
    (1021, 2),
    (1022, 2),
    (1023, 2),
    (1024, 2),
    (1025, 2),
    (1026, 1),
    (1027, 1),
    (1028, 2),
    (1029, 2),
    (1030, 1),
    (1021, 3),
    (1022, 3),
    (1023, 3),
    (1024, 3),
    (1025, 3),
    (1026, 3),
    (1027, 3),
    (1028, 3),
    (1029, 3),
    (1030, 3),
    (1025, 4),
    (1026, 4),
    (1027, 4),
    (1028, 4),
    (1029, 4),
    (1030, 4);
