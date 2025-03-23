CREATE TYPE ROLE AS ENUM ('artist', 'teacher');

CREATE TABLE users
(
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role ROLE NOT NULL,
  image TEXT,

  PRIMARY KEY (id)
);
