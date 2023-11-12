-- Drop the database if it already exists (use with caution)
-- DROP DATABASE IF EXISTS your_database_name;

-- Create the database
CREATE DATABASE cinema_catalog;

-- Connect to the database
\c your_database_name;

-- Create the genres table
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NULL
);

-- Create the movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NULL,
    description VARCHAR(255) NULL,
    release_date DATE NULL,
    genres VARCHAR(255)[] NULL
);
