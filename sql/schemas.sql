CREATE TABLE users
(
    id SERIAL UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image TEXT,

    PRIMARY KEY (id)
);

CREATE TABLE artworks
(
    artwork_id SERIAL UNIQUE NOT NULL,
    artwork_url TEXT UNIQUE NOT NULL,
    uploader_id INTEGER NOT NULL,

    artist_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    -- medium VARCHAR(255) NOT NULL,
    -- dimensions VARCHAR(255) NOT NULL,
    -- description TEXT NOT NULL,

    PRIMARY KEY (artwork_id),
    FOREIGN KEY (uploader_id) REFERENCES users (id)
);
