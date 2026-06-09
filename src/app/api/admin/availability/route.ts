// API endpoint for admin to manage availability slots
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/admin/availability - Update or create availability slot
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

  const { experience_id, slot_date, start_time, end_time, max_capacity, status } = await request.json();

  if (!experience_id || !slot_date || !start_time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('availability_slots')
    .upsert({
      experience_id,
      slot_date,
      start_time,
      end_time,
      max_capacity,
      current_bookings: 0,
      status: status || 'available'
    }, { onConflict: 'experience_id,slot_date,start_time' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Log audit
  if (data) {
    await supabaseAdmin
      .from('audit_log')
      .insert({
        table_name: 'availability_slots',
        record_id: data.id,
        operation: 'UPSERT',
        performed_by: user.id,
        details: { experience_id, slot_date, start_time }
      });
  }

  return NextResponse.json({ success: true, slot: data });
}

// DELETE /api/admin/availability - Remove availability slot
export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);

  if (!user || user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  const { id } = await request.json();

  const { error } = await supabaseAdmin
    .from('availability_slots')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// GET /api/admin/availability - List availability with filters
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
  const experienceId = searchParams.get('experience_id');
  const dateFrom = searchParams.get('date_from');
  const dateTo = searchParams.get('date_to');

  let query = supabaseAdmin
    .from('availability_slots')
    .select(`
      *,
      experiences (title, slug)
    `);

  if (experienceId) {
    query = query.eq('experience_id', experienceId);
  }
  if (dateFrom) {
    query = query.gte('slot_date', dateFrom);
  }
  if (dateTo) {
    query = query.lte('slot_date', dateTo);
  }

  const { data, error } = await query
    .order('slot_date')
    .order('start_time');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slots: data });
}