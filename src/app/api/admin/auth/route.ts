// API endpoint for admin authentication
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Admin login with email/password
export async function POST(request: NextRequest) {
  const { email, password, action } = await request.json();

  if (action === 'create-admin') {
    // Create admin user (one-time setup)
    const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: {
        role: 'admin'
      },
      user_metadata: {
        full_name: 'Ian - Blue Pineapple Admin'
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user_id: user?.id });
  }

  if (action === 'magic-link') {
    // Generate magic link for admin sign-in
    const { data: linkData, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard`
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      magic_link: linkData?.properties?.action_link
    });
  }

  // Regular admin sign-in - use Supabase client sign-in
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    redirect_to: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/login`
  });
}

// Validate admin session
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Verify admin role
  if (user.app_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  return NextResponse.json({
    success: true,
    admin: {
      id: user.id,
      email: user.email
    }
  });
}