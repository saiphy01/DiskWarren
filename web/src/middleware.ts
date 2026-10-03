import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Ignore static assets, next internals, and api routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Windows Subdomain
  if (host.startsWith('windows.diskwarren.com') || host.startsWith('windows.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/windows', request.url));
    }
  }

  // Android Subdomain
  if (host.startsWith('android.diskwarren.com') || host.startsWith('android.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/android', request.url));
    }
  }

  // iOS Subdomain
  if (host.startsWith('ios.diskwarren.com') || host.startsWith('ios.localhost')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/ios', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
