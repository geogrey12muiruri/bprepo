// API endpoint for experiences catalog
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/experiences - List all active experiences
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const date = searchParams.get('date');

  if (slug) {
    // Get single experience with availability
    const { data: experience, error } = await supabase
      .from('experiences')
      .select(`
        *,
        availability_slots (
          slot_date,
          start_time,
          end_time,
          max_capacity,
          current_bookings,
          status
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    // If date specified, filter availability
    if (date && experience.availability_slots) {
      experience.availability_slots = experience.availability_slots.filter(
        (slot: any) => slot.slot_date === date
      );
    }

    return NextResponse.json({ experience });
  }

  // List all active experiences
  const { data: experiences, error } = await supabase
    .from('experiences')
    .select('id, slug, title, description, duration_hours, price, capacity_per_slot')
    .eq('is_active', true)
    .order('price');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ experiences });
}