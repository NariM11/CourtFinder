-- Insert dummy data into bookings table
INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type, play_start_time, play_end_time)
VALUES
  ('user1@example.com', '1', '2023-07-11 14:30:00', 'checked in', '2023-07-11 14:30:00', '2023-07-11 15:30:00'),
  ('user2@example.com', '1', '2023-07-11 14:42:00', 'waiting list', '2023-07-11 15:30:00', '2023-07-11 16:30:00')
;

INSERT INTO bookings (user_email, court_id, booking_datetime, booking_type, play_start_time, play_end_time)
VALUES
  ('user1@example.com', '1', '2023-07-11 18:30:00', 'checked in', '2023-07-11 18:30:00', '2023-07-11 19:30:00'),
  ('user2@example.com', '1', '2023-07-11 18:42:00', 'waiting list', '2023-07-11 19:30:00', '2023-07-11 20:30:00')
;

