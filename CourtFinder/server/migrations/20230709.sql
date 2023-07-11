-- Delete all data from the bookings table
DELETE FROM bookings;

-- Delete all data from the users table
DELETE FROM users;

-- Delete all data from the courts table
DELETE FROM courts;


-- Delete court_status, num_parties_waiting, time_remaining in courts
ALTER TABLE courts
DROP COLUMN court_status,
DROP COLUMN num_parties_waiting,
DROP COLUMN time_remaining;

-- Add court name column to courts
ALTER TABLE courts
ADD court_name VARCHAR (255);


-- Delete court_id from bookings
ALTER TABLE bookings 
DROP COLUMN court_id;

-- Rename court_id to id in courts
ALTER TABLE courts
RENAME court_id TO id;

-- Change court type to VAR from SERIAL in courts
ALTER TABLE courts
ALTER COLUMN id TYPE VARCHAR(255);

-- Add a foreign key reference to courts primary key in bookings
ALTER TABLE bookings
ADD court_id VARCHAR(255),
ADD CONSTRAINT fk_court_id FOREIGN KEY (court_id) REFERENCES courts (id);


-- Add a column for play start datetime and play end datettime
ALTER TABLE bookings
ADD play_start_time TIMESTAMP,
ADD play_end_time TIMESTAMP;


-- Insert dummy data into users table
INSERT INTO users (email, hashed_password, first_name, last_name)
VALUES
  ('user1@example.com', 'password1', 'John', 'Doe'),
  ('user2@example.com', 'password2', 'Jane', 'Smith')
;

-- Insert dummy data into courts table
INSERT INTO courts (id, court_name)
VALUES
  ('1', 'Tennis Court 1'),
  ('2', 'Tennis Court 2')
;

-- Insert dummy data into bookings table
INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type, play_start_time, play_end_time)
VALUES
  ('user1@example.com', '1', '2023-07-01 10:00:00', 'checked in', '2023-07-01 10:00:00', '2023-07-01 12:00:00'),
  ('user2@example.com', '2', '2023-07-02 14:00:00', 'waiting list', '2023-07-02 14:00:00', '2023-07-02 16:00:00')
  
;






