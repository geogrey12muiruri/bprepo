// Database client with helper functions for partner booking system

import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role for admin operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Create Supabase client for authenticated user operations
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper functions for partner authentication using 4-digit code
export async function authenticatePartner(partnerCode: string) {
  const { data, error } = await supabaseAdmin
    .from('partners')
    .select('id, business_name, partner_code')
    .eq('partner_code', partnerCode)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return { success: false, error: 'Invalid partner code' };
  }

  // Check if user already exists in auth for this partner
  const { data: existingUser } = await supabaseAdmin
    .from('partner_users')
    .select('user_id')
    .eq('partner_id', data.id)
    .single();

  if (existingUser?.user_id) {
    // Return the existing user to sign in
    const { data: { user }, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email: `${partnerCode}@partner.bluepineapple.local`,
      password: partnerCode, // Partners use their code as password
    });

    if (signInError) {
      // If password signin fails, create magic link auth
      return { success: true, partner: data, requiresMagicLink: true };
    }

    return { success: true, partner: data, user };
  }

  return { success: true, partner: data, requiresRegistration: true };
}

// Get partner's bookings
export async function getPartnerBookings(partnerId: string, accessToken?: string) {
  const client = accessToken ? supabaseClient : supabaseAdmin;
  const { data, error } = await client
    .from('bookings')
    .select(`
      *,
      experiences (slug, title, duration_hours)
    `)
    .eq('partner_id', partnerId)
    .order('booking_date', { ascending: false });

  return { data, error };
}

// Get partner's tier status
export async function getPartnerTier(partnerId: string, year?: number) {
  const { data, error } = await supabaseAdmin
    .from('partner_tiers')
    .select('*')
    .eq('partner_id', partnerId)
    .eq('year', year || new Date().getFullYear())
    .single();

  return { data, error };
}

// Check availability for a date
export async function checkAvailability(experienceId: string, date: string) {
  const { data, error } = await supabaseClient
    .from('availability_slots')
    .select('*')
    .eq('experience_id', experienceId)
    .eq('slot_date', date)
    .neq('status', 'full')
    .order('start_time');

  return { data, error };
}