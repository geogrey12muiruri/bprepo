import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip static files, API routes, and login pages
  const skipPaths = [
    '/_next', '/images', '/favicon.ico',
    '/admin/login', '/portal/login', '/portal/register'
  ];
  
  if (skipPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session
  const { data: { user } } = await supabase.auth.getUser();

  // Admin routes protection
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const role = user.app_metadata?.role;
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Partner portal routes protection
  if (path.startsWith('/portal') && !path.startsWith('/portal/login') && !path.startsWith('/portal/register')) {
    if (!user) {
      return NextResponse.redirect(new URL('/portal/login', request.url));
    }

    const { data: partnerUser } = await supabase
      .from('partner_users')
      .select('partner_id')
      .eq('user_id', user.id)
      .single();

    if (!partnerUser) {
      return NextResponse.redirect(new URL('/portal/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};