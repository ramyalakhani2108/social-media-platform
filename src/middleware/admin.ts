import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated and has admin role
  const token = request.cookies.get('auth_token');
  const isAdmin = request.cookies.get('role') === 'admin';

  if (!token || !isAdmin) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
