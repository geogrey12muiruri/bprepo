// Webhook for booking confirmations (email/SMS notifications)
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/webhooks/booking - Handle booking events
export async function POST(request: NextRequest) {
  const payload = await request.json();
  const { type, record, old_record } = payload;

  // Handle booking creation
  if (type === 'INSERT' && record?.status === 'pending') {
    const { data: booking } = record;
    
    // Get partner info
    const { data: partner } = await supabaseAdmin
      .from('partners')
      .select('business_name, email, phone')
      .eq('id', booking.partner_id)
      .single();

    // Get experience info
    const { data: experience } = await supabaseAdmin
      .from('experiences')
      .select('title, duration_hours')
      .eq('id', booking.experience_id)
      .single();

    // Send confirmation to partner (via SMS/WhatsApp integration)
    // This would integrate with your Twilio or WhatsApp API
    console.log('Booking confirmation for partner:', {
      partner: partner?.business_name,
      guest: booking.guest_name,
      experience: experience?.title,
      date: booking.booking_date
    });

    // Send confirmation to guest (email)
    // Would integrate with email service

    // Notify admin (Ian)
    // Would integrate with notification service
  }

  // Handle status changes
  if (type === 'UPDATE' && old_record?.status !== record?.status) {
    console.log('Booking status changed:', {
      booking_id: record.id,
      old_status: old_record.status,
      new_status: record.status
    });
  }

  return NextResponse.json({ received: true });
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  const verifyToken = request.nextUrl.searchParams.get('verify');
  if (verifyToken === process.env.WEBHOOK_VERIFY_TOKEN) {
    return NextResponse.json({ status: 'verified' });
  }
  return NextResponse.json({ error: 'Invalid verification token' }, { status: 401 });
}