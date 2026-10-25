-- 1. Create users table
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 2. Create children table
CREATE TABLE children (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      gender VARCHAR(20),
      birth_date DATE,
      profile_image TEXT,
      current_stats JSONB,
      insight JSONB
);

-- 3. Create growth records table
CREATE TABLE growth_records (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    child_id INTEGER NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    height NUMERIC NOT NULL,
    weight NUMERIC NOT NULL,
    note TEXT
);

-- 4. Create sleep records table
CREATE TABLE sleep_records (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    child_id INTEGER NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    day VARCHAR(20),
    duration NUMERIC NOT NULL,
    note TEXT
);

-- 5. Create feeding records table
CREATE TABLE feeding_records (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    child_id INTEGER NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    type TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    duration INTEGER,
    note text
);