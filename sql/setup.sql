-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cats, dogs, bees, critters;

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
    ('JJ', 7, 'Grey and White');

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    color TEXT NOT NULL
);

INSERT INTO
    dogs (name, age, color)
VALUES
    ('Levi', 9, 'Black and White'),
    ('Charlie', 3, 'Blonde');

CREATE TABLE bees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species TEXT NOT NULL,
    size TEXT NOT NULL
);

INSERT INTO
    bees (species, size)
VALUES
    ('Honeybee', 'Medium'),
    ('Bumblebee', 'Large');

CREATE TABLE critters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    habitat TEXT NOT NULL
);

INSERT INTO
    critters (name, habitat)
VALUES
    ('Squirrel', 'Trees'),
    ('Frog', 'Pond');




    