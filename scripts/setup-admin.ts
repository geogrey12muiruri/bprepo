// Setup script to initialize admin user
// Run: node --env-file=.env.local --eval "$(cat scripts/setup-admin.mjs)"

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminEmail = process.env.ADMIN_EMAIL || 'ian@bluepineappleholdings.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

async function main() {
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  console.log(`Creating admin user: ${adminEmail}`);

  // Create admin user
  const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    app_metadata: { role: 'admin' },
    user_metadata: { full_name: 'Ian - Blue Pineapple Admin' }
  });

  if (error && error.message !== 'User already exists') {
    console.error('Error creating admin:', error.message);
    return;
  }

  console.log(`Admin user created: ${user?.id || 'Already exists'}`);
  console.log('Next steps:');
  console.log('1. Log in at /admin/login');
  console.log('2. Seed experiences via /api/admin/seed/experiences');
  console.log('3. Import partners via /api/admin/partners');
}

main();