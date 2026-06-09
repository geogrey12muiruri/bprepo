// API endpoint to seed initial experiences (one-time setup)
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// POST /api/admin/seed/experiences - Seed initial experiences (one-time setup)
export async function POST(request: NextRequest) {
  // Allow one-time setup without auth (check if experiences already exist)
  const { data: existingCount } = await supabaseAdmin
    .from('experiences')
    .select('id', { count: 'exact' })
    .limit(1);

  if (existingCount && existingCount.length > 0) {
    return NextResponse.json({ 
      success: true, 
      message: 'Experiences already seeded' 
    });
  }

  const experiences = [
    { slug: 'fort-jesus-trip', title: 'Fort Jesus Hop-on Hop-off', description: 'Historical tour of Fort Jesus UNESCO World Heritage site', duration_hours: 8.0, price: 500.00, capacity_per_slot: 20 },
    { slug: 'creek-safaris-mangrove', title: 'Creek Safaris Mangrove', description: 'Glide through tranquil estuaries aboard a glass-bottomed boat', duration_hours: 3.0, price: 4000.00, capacity_per_slot: 12 },
    { slug: 'sunset-sailing', title: 'Sunset Sailing', description: 'Romantic sunset cruise along the Mombasa coast with Swahili snacks', duration_hours: 2.5, price: 3000.00, capacity_per_slot: 16 },
    { slug: 'birthdays-anniversaries', title: 'Birthdays & Anniversaries', description: 'Private charter for celebrations on the Indian Ocean', duration_hours: 2.0, price: 2000.00, capacity_per_slot: 20 },
    { slug: 'snorkelling-reef', title: 'Snorkelling Reef', description: 'Float above vibrant coral gardens with tropical fish', duration_hours: 2.0, price: 2000.00, capacity_per_slot: 16 }
  ];

  const { error } = await supabaseAdmin
    .from('experiences')
    .upsert(experiences, { onConflict: 'slug' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: experiences.length });
}