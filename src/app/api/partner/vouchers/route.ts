// API endpoint for partner to view their vouchers
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/partner/vouchers - Get partner's vouchers
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
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

  const { data: vouchers, error } = await supabase
    .from('discount_vouchers')
    .select('*')
    .eq('partner_id', partnerUser.partner_id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ vouchers });
}