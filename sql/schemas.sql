CREATE TABLE users
(
    id SERIAL UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image TEXT,

    PRIMARY KEY (id)
);
