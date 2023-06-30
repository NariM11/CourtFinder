CREATE DATABASE courtfinder;

-- Create users table
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

-- Create bookings table
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) REFERENCES users (email),
    court_id SERIAL REFERENCES courts (court_id),
    booking_datetime TIMESTAMP,
    status VARCHAR(255) CHECK (status IN ('checked in', 'waiting list'))
);

-- Create courts table
CREATE TABLE courts (
    court_id SERIAL PRIMARY KEY,
    current_status VARCHAR(255)
);