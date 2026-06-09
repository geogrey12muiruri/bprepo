// API endpoint for admin to import partners from spreadsheet
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/admin/partners/import - Bulk import partners
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

  const { partners } = await request.json();

  if (!Array.isArray(partners)) {
    return NextResponse.json({ error: 'partners array required' }, { status: 400 });
  }

  // Validate and format partner data
  const formattedPartners = partners.map((p: any) => ({
    business_name: p.business_name || p.name,
    contact_person: p.contact_person || p.contact_name,
    email: p.email,
    phone: p.phone || p.telephone,
    partner_code: p.partner_code || p.code || String(Math.floor(1000 + Math.random() * 9000)),
    is_active: p.is_active !== false
  }));

  // Bulk insert with upsert to handle duplicates
  const { data, error } = await supabaseAdmin
    .from('partners')
    .upsert(formattedPartners, { 
      onConflict: 'partner_code'
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log audit
  await supabaseAdmin
    .from('audit_log')
    .insert({
      table_name: 'partners',
      operation: 'INSERT',
      performed_by: user.id,
      details: { count: formattedPartners.length }
    });

  return NextResponse.json({ 
    success: true, 
    count: formattedPartners.length 
  });
}

// GET /api/admin/partners - List all partners
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: { user } } = await supabaseAdmin.auth.getUser(token);

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const isActive = searchParams.get('active') !== 'false';

  const { data: partners, error } = await supabaseAdmin
    .from('partners')
    .select('*')
    .eq('is_active', isActive)
    .order('business_name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partners });
}