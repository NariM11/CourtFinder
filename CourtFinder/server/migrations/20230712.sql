-- Insert dummy data into bookings table
INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type, play_start_time, play_end_time)
VALUES
  ('user1@example.com', '1', '2023-07-25 14:45:00', 'checked in', '2023-07-25 14:45:00', '2023-07-25 15:45:00'),
  ('user2@example.com', '1', '2023-07-25 15:00:00', 'waiting list', '2023-07-25 15:00:00', '2023-07-25 15:00:00')
  
;