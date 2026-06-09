// Server actions for admin workflows
'use server';

import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Generate vouchers for year-end rewards
export async function generateYearEndVouchers(year: number = new Date().getFullYear()) {
  const { data: partners, error } = await supabaseAdmin
    .from('partner_tiers')
    .select(`
      *,
      partners (business_name, email)
    `)
    .eq('year', year)
    .eq('voucher_generated', false);

  if (error) throw error;

  for (const partnerTier of partners || []) {
    // Generate unique voucher code
    const voucherCode = `BP-${year}-${partnerTier.partner_code || partnerTier.partner_id.toString().slice(0, 8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const validFrom = new Date(year + 1, 0, 1); // Jan 1 of next year
    const validTo = new Date(year + 2, 0, 31); // Jan 31 of year after

    await supabaseAdmin
      .from('discount_vouchers')
      .insert({
        partner_id: partnerTier.partner_id,
        voucher_code: voucherCode,
        discount_percentage: partnerTier.discount_percentage,
        valid_from: validFrom.toISOString().split('T')[0],
        valid_to: validTo.toISOString().split('T')[0]
      });

    // Mark voucher as generated
    await supabaseAdmin
      .from('partner_tiers')
      .update({ voucher_generated: true })
      .eq('id', partnerTier.id);
  }

  return { success: true, count: partners?.length || 0 };
}

// Calculate and update partner tiers based on bookings
export async function calculatePartnerTiers(year: number = new Date().getFullYear()) {
  const { data: bookingCounts, error } = await supabaseAdmin.rpc('get_partner_booking_counts', {
    year_param: year
  });

  if (error) {
    // Fallback: manually calculate
    const { data: partners } = await supabaseAdmin
      .from('partners')
      .select('id');

    for (const partner of partners || []) {
      const { count } = await supabaseAdmin
        .from('bookings')
        .select('*', { count: 'exact' })
        .eq('partner_id', partner.id)
        .eq('status', 'completed')
        .gte('booking_date', `${year}-01-01`)
        .lt('booking_date', `${year + 1}-01-01`);

      const bookingCount = count ?? 0;
      let tier: 'bronze' | 'silver' | 'gold' | 'platinum' = 'bronze';
      let discount = 5;

      if (bookingCount >= 50) { tier = 'platinum'; discount = 20; }
      else if (bookingCount >= 30) { tier = 'gold'; discount = 15; }
      else if (bookingCount >= 15) { tier = 'silver'; discount = 10; }
      else if (bookingCount >= 5) { tier = 'bronze'; discount = 5; }

      await supabaseAdmin
        .from('partner_tiers')
        .upsert({
          partner_id: partner.id,
          year,
          total_bookings: bookingCount,
          tier,
          discount_percentage: discount
        }, { onConflict: 'partner_id,year' });
    }
  }

  return { success: true };
}

// Update availability for an experience
export async function updateAvailability(
  experienceId: string,
  date: string,
  startTime: string,
  endTime: string,
  maxCapacity: number
) {
  const { data, error } = await supabaseAdmin
    .from('availability_slots')
    .upsert({
      experience_id: experienceId,
      slot_date: date,
      start_time: startTime,
      end_time: endTime,
      max_capacity: maxCapacity,
      current_bookings: 0
    }, { onConflict: 'experience_id,slot_date,start_time' });

  if (error) throw error;
  return { success: true, data };
}

// Block a date (admin only)
export async function blockDate(experienceId: string, date: string, reason?: string) {
  // Create blocked slot entry
  const { error } = await supabaseAdmin
    .from('availability_slots')
    .insert({
      experience_id: experienceId,
      slot_date: date,
      start_time: '00:00',
      max_capacity: 0,
      current_bookings: 0,
      status: 'blocked'
    });

  return { success: !error, error };
}