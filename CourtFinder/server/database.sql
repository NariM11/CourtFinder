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
    booking_datetime TIMESTAMP,
    booking_type VARCHAR(255) CHECK (status IN ('checked in', 'waiting list'))
    play_start_time TIMESTAMP,
    play_end_time TIMESTAMP
);


-- Create reference column in bookings for court id
ALTER TABLE bookings(
ADD court_id VARCHAR(255),
ADD CONSTRAINT fk_court_id FOREIGN KEY (court_id) REFERENCES courts (id)
);

-- Create courts table
CREATE TABLE courts (
    id VARCHAR(255) PRIMARY KEY,
    court_name VARCHAR(255)
);

