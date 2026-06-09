-- Seed data for Blue Pineapple partner booking system

-- Initial experiences (from your existing trips)
INSERT INTO experiences (slug, title, description, duration_hours, price, capacity_per_slot) VALUES
  ('fort-jesus-trip', 'Fort Jesus Hop-on Hop-off', 'Historical tour of Fort Jesus UNESCO World Heritage site', 8.0, 500.00, 20),
  ('creek-safaris-mangrove', 'Creek Safaris Mangrove', 'Glide through tranquil estuaries aboard a glass-bottomed boat', 3.0, 4000.00, 12),
  ('sunset-sailing', 'Sunset Sailing', 'Romantic sunset cruise along the Mombasa coast with Swahili snacks', 2.5, 3000.00, 16),
  ('birthdays-anniversaries', 'Birthdays & Anniversaries', 'Private charter for celebrations on the Indian Ocean', 2.0, 2000.00, 20),
  ('snorkelling-reef', 'Snorkelling Reef', 'Float above vibrant coral gardens with tropical fish', 2.0, 2000.00, 16);

-- Note: Partners need to be imported from your spreadsheet
-- You will import 205 partners via admin panel or CSV upload
-- The partner_code field will be their 4-digit login code

-- Initial tier thresholds (matching proposal document)
-- Bronze: 5-14 bookings = 5%
-- Silver: 15-29 bookings = 10%
-- Gold: 30-49 bookings = 15%
-- Platinum: 50+ bookings = 20%