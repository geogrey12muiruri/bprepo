-- Migration: Row Level Security Policies for Partner Booking System

-- Enable RLS on all tables
ALTER TABLE IF EXISTS partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS partner_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS discount_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS partner_users ENABLE ROW LEVEL SECURITY;

-- Partners can read their own profile (via partner_users bridge)
DROP POLICY IF EXISTS "partners_read_own" ON partners;
CREATE POLICY "partners_read_own" ON partners
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_users 
      WHERE partner_users.partner_id = partners.id 
      AND partner_users.user_id = auth.uid()
    )
  );

-- Partners can insert bookings (only for their own partner account)
DROP POLICY IF EXISTS "partners_insert_booking" ON bookings;
CREATE POLICY "partners_insert_booking" ON bookings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM partner_users 
      WHERE partner_users.partner_id = bookings.partner_id 
      AND partner_users.user_id = auth.uid()
    )
  );

-- Partners can read their own bookings only
DROP POLICY IF EXISTS "partners_read_bookings" ON bookings;
CREATE POLICY "partners_read_bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_users 
      WHERE partner_users.partner_id = bookings.partner_id 
      AND partner_users.user_id = auth.uid()
    )
  );

-- Partners can update their pending bookings
DROP POLICY IF EXISTS "partners_update_own_booking" ON bookings;
CREATE POLICY "partners_update_own_booking" ON bookings
  FOR UPDATE USING (
    status = 'pending' 
    AND EXISTS (
      SELECT 1 FROM partner_users 
      WHERE partner_users.partner_id = bookings.partner_id 
      AND partner_users.user_id = auth.uid()
    )
  );

-- Public can read active experiences
DROP POLICY IF EXISTS "public_read_experiences" ON experiences;
CREATE POLICY "public_read_experiences" ON experiences
  FOR SELECT USING (is_active = TRUE);

-- Public can read available slots
DROP POLICY IF EXISTS "public_read_slots" ON availability_slots;
CREATE POLICY "public_read_slots" ON availability_slots
  FOR SELECT USING (status IN ('available', 'limited'));

-- Partners can read their tier status
DROP POLICY IF EXISTS "partners_read_tier" ON partner_tiers;
CREATE POLICY "partners_read_tier" ON partner_tiers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_users 
      WHERE partner_users.partner_id = partner_tiers.partner_id 
      AND partner_users.user_id = auth.uid()
    )
  );

-- Partners can read their vouchers
DROP POLICY IF EXISTS "partners_read_vouchers" ON discount_vouchers;
CREATE POLICY "partners_read_vouchers" ON discount_vouchers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM partner_users 
      WHERE partner_users.partner_id = discount_vouchers.partner_id 
      AND partner_users.user_id = auth.uid()
    )
  );

-- Admin policies (users with admin role in JWT)
DROP POLICY IF EXISTS "admin_all_access" ON bookings;
CREATE POLICY "admin_all_access" ON bookings
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "admin_partners_access" ON partners;
CREATE POLICY "admin_partners_access" ON partners
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "admin_experiences_access" ON experiences;
CREATE POLICY "admin_experiences_access" ON experiences
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "admin_slots_access" ON availability_slots;
CREATE POLICY "admin_slots_access" ON availability_slots
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

DROP POLICY IF EXISTS "admin_tiers_access" ON partner_tiers;
CREATE POLICY "admin_tiers_access" ON partner_tiers
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');