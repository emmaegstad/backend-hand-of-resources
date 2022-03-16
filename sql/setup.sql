-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cats;

CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    color TEXT NOT NULL
);

INSERT INTO
    cats (name, age, color)
VALUES
    ('Minnie', 7, 'Brown Tabby'),
    ('JJ', 7, 'Grey and White')