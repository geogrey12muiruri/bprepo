// Types for partner booking system database entities

export type Partner = {
  id: string; // UUID
  business_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  partner_code: string; // 4-digit code
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PartnerUser = {
  id: string; // UUID
  user_id: string; // Supabase auth user ID
  partner_id: string;
  created_at: string;
};

export type Experience = {
  id: string; // UUID
  slug: string;
  title: string;
  description?: string;
  duration_hours: number;
  price: number;
  image_urls?: string[]; // Cloudinary URLs
  capacity_per_slot: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SlotStatus = 'available' | 'limited' | 'full' | 'blocked';

export type AvailabilitySlot = {
  id: string; // UUID
  experience_id: string;
  slot_date: string; // DATE
  start_time: string; // TIME
  end_time?: string; // TIME
  max_capacity: number;
  current_bookings: number;
  status: SlotStatus;
  created_at: string;
};

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type Booking = {
  id: string; // UUID
  experience_id: string;
  partner_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  booking_date: string; // DATE
  start_time: string; // TIME
  participants: number;
  total_price: number;
  special_requests?: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

export type TierLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export type PartnerTier = {
  id: string; // UUID
  partner_id: string;
  year: number;
  total_bookings: number;
  tier: TierLevel;
  discount_percentage: number; // 5-20
  voucher_generated: boolean;
  created_at: string;
  updated_at: string;
};

export type DiscountVoucher = {
  id: string; // UUID
  partner_id: string;
  voucher_code: string;
  discount_percentage: number;
  valid_from: string; // DATE
  valid_to: string; // DATE
  is_used: boolean;
  used_at?: string;
  created_at: string;
};

export type AuditLog = {
  id: number; // BIGSERIAL
  table_name: string;
  record_id?: string;
  operation: 'INSERT' | 'UPDATE' | 'DELETE';
  performed_by?: string;
  performed_at: string;
  details?: Record<string, unknown>;
};