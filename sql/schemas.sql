CREATE TABLE users
(
    id SERIAL UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    image TEXT,

    PRIMARY KEY (id)
);

CREATE TYPE school AS ENUM
(
    'Ashton Meadows PS',
    'Castlemore PS',
    'Coledale PS',
    'David Suzuki PS',
    'Franklin Street PS',
    'Legacy PS',
    'Nokiidaa PS',
    'Reesor Park PS',
    'Roy H. Crosby PS',
    'William Armstrong PS',
    'Bill Crothers SS',
    'Markham District HS',
    'Unionville HS',
    'Parkview PS'
);

CREATE TABLE artworks 
(
    artist_fullname TEXT NOT NULL,
    artist_school SCHOOL NOT NULL,

    artwork_title VARCHAR(255) NOT NULL,
    artwork_medium VARCHAR(255) NOT NULL,
    artwork_width INTEGER NOT NULL,
    artwork_height INTEGER NOT NULL,
    artwork_depth INTEGER,
    artwork_creation_date DATE NOT NULL,

    uploader_id INTEGER NOT NULL,
    artwork_id SERIAL UNIQUE NOT NULL,
    artwork_url TEXT UNIQUE NOT NULL,

    PRIMARY KEY (artwork_id),
    FOREIGN KEY (uploader_id) REFERENCES users (id)
)

-- CREATE TABLE artworks
-- (
--     artwork_id SERIAL UNIQUE NOT NULL,
--     artwork_url TEXT UNIQUE NOT NULL,
--     uploader_id INTEGER NOT NULL,
--
--     artist_name VARCHAR(255) NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     medium VARCHAR(255) NOT NULL,
--     width INTEGER NOT NULL,
--     height INTEGER NOT NULL,
--     depth INTEGER,
--     school SCHOOL NOT NULL,
--     creation_date DATE NOT NULL,
--     description TEXT NOT NULL,
--     description_recording_url TEXT UNIQUE NOT NULL,
--
--     PRIMARY KEY (artwork_id),
--     FOREIGN KEY (uploader_id) REFERENCES users (id)
-- );
