// API endpoint for admin dashboard - all business intelligence
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// GET /api/admin/dashboard - Get all dashboard data
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || 'today'; // today, week, month, year

  // Get bookings with partner and experience info
  let query = supabaseAdmin
    .from('bookings')
    .select(`
      id,
      guest_name,
      booking_date,
      start_time,
      participants,
      total_price,
      status,
      created_at,
      partners (business_name, partner_code),
      experiences (title)
    `);

  // Filter by time period
  const now = new Date();
  if (period === 'today') {
    query = query.eq('booking_date', now.toISOString().split('T')[0]);
  } else if (period === 'week') {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    query = query.gte('booking_date', startOfWeek.toISOString().split('T')[0]);
  } else if (period === 'month') {
    query = query.gte('booking_date', `${now.getFullYear()}-${now.getMonth() + 1}-01`);
  } else if (period === 'year') {
    query = query.gte('booking_date', `${now.getFullYear()}-01-01`);
  }

  const { data: bookings, error: bookingsError } = await query
    .order('created_at', { ascending: false })
    .limit(100);

  // Get partner statistics
  const { data: partners, error: partnersError } = await supabaseAdmin
    .from('partners')
    .select(`
      id,
      business_name,
      partner_code,
      is_active,
      partner_tiers (
        year,
        total_bookings,
        tier,
        discount_percentage,
        voucher_generated
      )
    `)
    .eq('is_active', true)
    .order('business_name');

  // Calculate totals
  const { data: totals, error: totalsError } = await supabaseAdmin
    .from('bookings')
    .select('participants, total_price, status')
    .eq('booking_date', now.toISOString().split('T')[0]);

  // Get experience popularity
  const { data: experienceStats, error: expError } = await supabaseAdmin
    .from('bookings')
    .select(`
      experience_id,
      experiences (title),
      count: bookings (id)
    `)
    .eq('status', 'confirmed')
    .gte('booking_date', `${now.getFullYear()}-01-01`);

  // Get tier distribution
  const tierCounts = (partners || []).reduce((acc, p) => {
    const tier = p.partner_tiers?.find((t: any) => t.year === now.getFullYear())?.tier || 'none';
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json({
    bookings: bookings || [],
    partners: partners?.map(p => ({
      id: p.id,
      business_name: p.business_name,
      partner_code: p.partner_code,
      tier: p.partner_tiers?.find((t: any) => t.year === now.getFullYear())?.tier || 'none',
      total_bookings: p.partner_tiers?.find((t: any) => t.year === now.getFullYear())?.total_bookings || 0
    })) || [],
    stats: {
      total_bookings_today: totals?.length || 0,
      total_passengers: totals?.reduce((sum, b) => sum + b.participants, 0) || 0,
      total_revenue: totals?.reduce((sum, b) => sum + b.total_price, 0) || 0,
      active_partners: partners?.length || 0
    },
    tier_distribution: tierCounts
  });
}