// API endpoint for admin to generate year-end vouchers
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/admin/vouchers/generate - Generate vouchers for all partners
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const { year, partner_id } = await request.json();
  const targetYear = year || new Date().getFullYear();
  const validFrom = `${targetYear + 1}-01-01`;
  const validTo = `${targetYear + 2}-01-31`;

  // Need to select partner_code for voucher generation
  let partnersQuery = supabaseAdmin
    .from('partners')
    .select(`
      id,
      business_name,
      partner_code,
      partner_tiers (
        tier,
        total_bookings,
        discount_percentage,
        voucher_generated
      )
    `);

  if (partner_id) {
    partnersQuery = partnersQuery.eq('id', partner_id);
  }

  const { data: partners, error } = await partnersQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];
  const alreadyGenerated = [];

  for (const partner of partners || []) {
    const tier = partner.partner_tiers?.find((t: any) => t.year === targetYear);

    if (!tier || tier.voucher_generated) {
      alreadyGenerated.push(partner.business_name);
      continue;
    }

    // Generate unique voucher code
    const voucherCode = `BP-${targetYear}-${partner.partner_code}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const { error: insertError } = await supabaseAdmin
      .from('discount_vouchers')
      .insert({
        partner_id: partner.id,
        voucher_code: voucherCode,
        discount_percentage: tier.discount_percentage,
        valid_from: validFrom,
        valid_to: validTo,
        is_used: false
      });

    if (!insertError) {
      // Mark tier as voucher generated
      await supabaseAdmin
        .from('partner_tiers')
        .update({ voucher_generated: true })
        .eq('partner_id', partner.id)
        .eq('year', targetYear);

      // Log audit
      await supabaseAdmin
        .from('audit_log')
        .insert({
          table_name: 'discount_vouchers',
          operation: 'INSERT',
          performed_by: user.id,
          details: { voucher_code: voucherCode, partner_id: partner.id }
        });

      results.push({ partner: partner.business_name, voucher_code: voucherCode });
    }
  }

  return NextResponse.json({
    success: true,
    generated: results.length,
    already_generated: alreadyGenerated.length,
    vouchers: results,
    note: alreadyGenerated.length ? `${alreadyGenerated.length} partners already had vouchers generated` : undefined
  });
}

// GET /api/admin/vouchers - List all vouchers
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
  const year = searchParams.get('year') || new Date().getFullYear().toString();
  const status = searchParams.get('status') || 'all';

  let query = supabaseAdmin
    .from('discount_vouchers')
    .select(`
      *,
      partners (business_name, partner_code)
    `);

  if (status === 'used') {
    query = query.eq('is_used', true);
  } else if (status === 'unused') {
    query = query.eq('is_used', false);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ vouchers: data });
}