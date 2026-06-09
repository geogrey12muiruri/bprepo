// API endpoint for partner authentication using 4-digit code
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Partner login - generates magic link or returns existing user
export async function POST(request: NextRequest) {
  const { code, action, email } = await request.json();

  if (!code || !/^\d{4}$/.test(code)) {
    return NextResponse.json({ error: 'Invalid partner code format' }, { status: 400 });
  }

  // Find partner by code
  const { data: partner, error } = await supabaseAdmin
    .from('partners')
    .select('id, business_name, partner_code, is_active, email')
    .eq('partner_code', code)
    .single();

  if (error || !partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }

  if (!partner.is_active) {
    return NextResponse.json({ error: 'Partner account is inactive' }, { status: 403 });
  }

  // Check if user already exists for this partner
  const { data: existingLink } = await supabaseAdmin
    .from('partner_users')
    .select('user_id')
    .eq('partner_id', partner.id)
    .single();

  // Action: signin - generate magic link or OTP
  if (action === 'signin') {
    if (!existingLink?.user_id) {
      // First time - create user and sign in
      const partnerEmail = email || `${code}@partner.bluepineapple.local`;
      
      const { data: { user }, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: partnerEmail,
        email_confirm: true,
        user_metadata: {
          partner_id: partner.id,
          partner_code: code,
          business_name: partner.business_name
        },
        app_metadata: {
          role: 'partner',
          partner_id: partner.id
        }
      });

      if (authError && authError.message !== 'User already exists') {
        return NextResponse.json({ error: authError.message }, { status: 400 });
      }

      // Ensure partner_users link exists
      if (user) {
        await supabaseAdmin
          .from('partner_users')
          .upsert({
            user_id: user.id,
            partner_id: partner.id
          }, { onConflict: 'partner_id' });
      }

      // Generate magic link
      const { data: magicLinkData, error: magicError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: partnerEmail,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/dashboard`
        }
      });

      if (magicError) {
        // Fallback to OTP
        const { data: otpData, error: otpError } = await supabaseAdmin.auth.admin.generateLink({
          type: 'signup',
          email: partnerEmail,
          password: code // Use code as temporary password
        });

        return NextResponse.json({ 
          success: true,
          partner: { id: partner.id, business_name: partner.business_name, partner_code: partner.partner_code },
          message: 'Use the 4-digit code as password for first login'
        });
      }

      return NextResponse.json({
        success: true,
        partner: { id: partner.id, business_name: partner.business_name, partner_code: partner.partner_code },
        magic_link: magicLinkData?.properties?.action_link
      });
    }

    // Existing user - generate magic link
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(existingLink.user_id);
    
    const { data: magicLinkData, error: magicError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: userData?.user?.email || `${code}@partner.bluepineapple.local`,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal/dashboard`
      }
    });

    return NextResponse.json({
      success: true,
      partner: { id: partner.id, business_name: partner.business_name, partner_code: partner.partner_code },
      magic_link: magicLinkData?.properties?.action_link
    });
  }

  // Action: verify - validate partner code exists
  if (action === 'verify') {
    return NextResponse.json({
      success: true,
      valid: true,
      partner: {
        id: partner.id,
        business_name: partner.business_name,
        partner_code: partner.partner_code
      }
    });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// Validate session and return partner info
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');

  // Verify token
  const { data: { user }, error } = await supabaseClient.auth.getUser(token);
  if (error || !user) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  // Check if partner
  const { data: partnerUser } = await supabaseAdmin
    .from('partner_users')
    .select('partner_id')
    .eq('user_id', user.id)
    .single();

  if (!partnerUser) {
    return NextResponse.json({ error: 'User not linked to partner account' }, { status: 403 });
  }

  const { data: partner } = await supabaseAdmin
    .from('partners')
    .select('id, business_name, partner_code, email, phone')
    .eq('id', partnerUser.partner_id)
    .single();

  // Get current tier info
  const { data: tier } = await supabaseAdmin
    .from('partner_tiers')
    .select('tier, total_bookings, discount_percentage')
    .eq('partner_id', partner?.id)
    .eq('year', new Date().getFullYear())
    .single();

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email
    },
    partner,
    tier: tier || { tier: 'bronze', total_bookings: 0, discount_percentage: 5 }
  });
}