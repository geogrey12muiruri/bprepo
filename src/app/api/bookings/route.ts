// API endpoint for partner bookings
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/bookings - Get bookings for authenticated partner
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  
  // Get user's partner link
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Get partner_id from partner_users
  const { data: partnerUser } = await supabase
    .from('partner_users')
    .select('partner_id')
    .eq('user_id', user.id)
    .single();

  if (!partnerUser) {
    return NextResponse.json({ error: 'Partner account not linked' }, { status: 403 });
  }

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      experiences (slug, title, duration_hours)
    `)
    .eq('partner_id', partnerUser.partner_id)
    .order('booking_date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings });
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const body = await request.json();

  // Validate required fields
  const required = ['experience_id', 'guest_name', 'guest_email', 'booking_date', 'participants'];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  // Get user's partner link
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const { data: partnerUser } = await supabase
    .from('partner_users')
    .select('partner_id')
    .eq('user_id', user.id)
    .single();

  if (!partnerUser) {
    return NextResponse.json({ error: 'Partner account not linked' }, { status: 403 });
  }

  // Get experience price
  const { data: experience } = await supabase
    .from('experiences')
    .select('price')
    .eq('id', body.experience_id)
    .single();

  const totalPrice = experience ? experience.price * body.participants : 0;

  // Create booking
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      experience_id: body.experience_id,
      partner_id: partnerUser.partner_id,
      guest_name: body.guest_name,
      guest_email: body.guest_email,
      guest_phone: body.guest_phone,
      booking_date: body.booking_date,
      start_time: body.start_time || '09:00',
      participants: body.participants,
      total_price: totalPrice,
      special_requests: body.special_requests,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, booking }, { status: 201 });
}