// Bootstrap endpoint for initial setup (no auth required - for first run only)
// DELETE THIS FILE after initial setup
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  const { action } = await request.json();

  if (action === 'create-partners') {
    const count = await supabaseAdmin
      .from('partners')
      .select('id', { count: 'exact' })
      .limit(1);

    if (count.count && count.count > 0) {
      return NextResponse.json({ message: 'Partners already exist' });
    }

    // Create sample partners for testing
    const samplePartners = [
      { business_name: 'Serena Beach Hotel', partner_code: '1001' },
      { business_name: 'Prison Island Resort', partner_code: '1002' },
      { business_name: 'Mombasa Yacht Club', partner_code: '1003' },
      { business_name: 'Bamburi Beach Lodge', partner_code: '1004' }
    ];

    const { error } = await supabaseAdmin
      .from('partners')
      .insert(samplePartners);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: samplePartners.length });
  }

  if (action === 'check-tables') {
    const { data: tables } = await supabaseAdmin.rpc('get_table_names');
    return NextResponse.json({ tables });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}