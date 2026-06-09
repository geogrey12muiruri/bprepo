-- Migration: Create partner booking system with RBAC

-- 1. Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PARTNERS TABLE (B2B clients with 4-digit codes)
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  partner_code CHAR(4) UNIQUE NOT NULL CHECK (partner_code ~ '^[0-9]{4}$'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes safely
DROP INDEX IF EXISTS idx_partners_code;
CREATE INDEX idx_partners_code ON partners(partner_code);
DROP INDEX IF EXISTS idx_partners_active;
CREATE INDEX idx_partners_active ON partners(is_active);

-- 2b. PARTNER-USER BRIDGE TABLE
-- Links Supabase auth.users to partners (for 4-digit code auth)
CREATE TABLE IF NOT EXISTS partner_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  partner_id UUID REFERENCES partners NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(partner_id)
);

DROP INDEX IF EXISTS idx_partner_users_user_id;
CREATE INDEX idx_partner_users_user_id ON partner_users(user_id);
DROP INDEX IF EXISTS idx_partner_users_partner_id;
CREATE INDEX idx_partner_users_partner_id ON partner_users(partner_id);

-- 3. EXPERIENCES/TRIPS CATALOG
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_hours NUMERIC(4,2) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  image_urls TEXT[],
  capacity_per_slot INTEGER NOT NULL DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes safely
DROP INDEX IF EXISTS idx_experiences_slug;
CREATE INDEX idx_experiences_slug ON experiences(slug);
DROP INDEX IF EXISTS idx_experiences_active;
CREATE INDEX idx_experiences_active ON experiences(is_active);

-- 4. AVAILABILITY SLOTS
DROP TYPE IF EXISTS slot_status;
CREATE TYPE slot_status AS ENUM ('available', 'limited', 'full', 'blocked');

CREATE TABLE IF NOT EXISTS availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
  slot_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  max_capacity INTEGER NOT NULL,
  current_bookings INTEGER DEFAULT 0,
  status slot_status DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(experience_id, slot_date, start_time)
);

-- Create indexes safely
DROP INDEX IF EXISTS idx_slots_experience_date;
CREATE INDEX idx_slots_experience_date ON availability_slots(experience_id, slot_date);
DROP INDEX IF EXISTS idx_slots_date;
CREATE INDEX idx_slots_date ON availability_slots(slot_date);

-- 5. BOOKINGS
DROP TYPE IF EXISTS booking_status;
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID NOT NULL REFERENCES experiences(id),
  partner_id UUID NOT NULL REFERENCES partners(id),
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  participants INTEGER NOT NULL CHECK (participants > 0),
  total_price NUMERIC(10,2) NOT NULL,
  special_requests TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes safely
DROP INDEX IF EXISTS idx_bookings_experience;
CREATE INDEX idx_bookings_experience ON bookings(experience_id);
DROP INDEX IF EXISTS idx_bookings_partner;
CREATE INDEX idx_bookings_partner ON bookings(partner_id);
DROP INDEX IF EXISTS idx_bookings_date;
CREATE INDEX idx_bookings_date ON bookings(booking_date);
DROP INDEX IF EXISTS idx_bookings_status;
CREATE INDEX idx_bookings_status ON bookings(status);

-- 6. PARTNER TIERS & REWARDS
DROP TYPE IF EXISTS tier_level;
CREATE TYPE tier_level AS ENUM ('bronze', 'silver', 'gold', 'platinum');

CREATE TABLE IF NOT EXISTS partner_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM now()),
  total_bookings INTEGER DEFAULT 0,
  tier tier_level NOT NULL DEFAULT 'bronze',
  discount_percentage INTEGER NOT NULL DEFAULT 5 CHECK (discount_percentage BETWEEN 5 AND 20),
  voucher_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(partner_id, year)
);

-- Create indexes safely
DROP INDEX IF EXISTS idx_tiers_partner;
CREATE INDEX idx_tiers_partner ON partner_tiers(partner_id);
DROP INDEX IF EXISTS idx_tiers_year;
CREATE INDEX idx_tiers_year ON partner_tiers(year);

-- 7. DISCOUNT VOUCHERS
CREATE TABLE IF NOT EXISTS discount_vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  voucher_code TEXT UNIQUE NOT NULL,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage BETWEEN 5 AND 20),
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes safely
DROP INDEX IF EXISTS idx_vouchers_partner;
CREATE INDEX idx_vouchers_partner ON discount_vouchers(partner_id);
DROP INDEX IF EXISTS idx_vouchers_code;
CREATE INDEX idx_vouchers_code ON discount_vouchers(voucher_code);

-- 8. AUDIT LOG FOR OPERATIONS
CREATE TABLE IF NOT EXISTS audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID,
  operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  performed_by TEXT,
  performed_at TIMESTAMPTZ DEFAULT now(),
  details JSONB
);