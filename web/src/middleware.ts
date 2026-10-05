import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Ignore static assets, next internals, and api routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/downloads') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Helper to rewrite paths for subdomains
  const getSubdomainRewrite = (platformPrefix: 'windows' | 'android' | 'ios' | 'recovery') => {
    // If the path already has the prefix (e.g., /windows or /windows/download), don't double-prefix
    if (pathname.startsWith(`/${platformPrefix}`)) {
      return NextResponse.next();
    }
    
    // Rewrite root to platform root
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/${platformPrefix}`, request.url));
    }

    // Rewrite subpages (e.g., /download -> /windows/download)
    return NextResponse.rewrite(new URL(`/${platformPrefix}${pathname}`, request.url));
  };

  // Recovery Subdomain: recovery.diskwarren.com
  if (host.startsWith('recovery.diskwarren.com') || host.startsWith('recovery.localhost')) {
    return getSubdomainRewrite('recovery');
  }

  // Windows Subdomain: windows.diskwarren.com
  if (host.startsWith('windows.diskwarren.com') || host.startsWith('windows.localhost')) {
    return getSubdomainRewrite('windows');
  }

  // Android Subdomain: android.diskwarren.com
  if (host.startsWith('android.diskwarren.com') || host.startsWith('android.localhost')) {
    return getSubdomainRewrite('android');
  }

  // iOS Subdomain: ios.diskwarren.com
  if (host.startsWith('ios.diskwarren.com') || host.startsWith('ios.localhost')) {
    return getSubdomainRewrite('ios');
  }

  // Mac Subdomain (optional alias: mac.diskwarren.com)
  if (host.startsWith('mac.diskwarren.com') || host.startsWith('mac.localhost')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
