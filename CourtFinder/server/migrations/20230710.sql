-- Insert dummy data into bookings table
INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type, play_start_time, play_end_time)
VALUES
  ('user1@example.com', '1', '2023-07-10 18:00:00', 'checked in', '2023-07-10 18:00:00', '2023-07-01 19:00:00'),
  ('user2@example.com', '1', '2023-07-10 18:35:00', 'waiting list', '2023-07-02 19:00:00', '2023-07-02 20:00:00')
  
;


-- Insert dummy data into bookings table
INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type, play_start_time, play_end_time)
VALUES
  ('user1@example.com', '1', '2023-07-10 18:00:00', 'checked in', '2023-07-10 18:00:00', '2023-07-10 19:00:00'),
  ('user2@example.com', '1', '2023-07-10 18:35:00', 'waiting list', '2023-07-10 19:00:00', '2023-07-10 20:00:00')
  
;