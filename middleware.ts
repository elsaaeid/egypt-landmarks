import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to ensure krpano static assets respond with permissive CORS
// and to answer preflight OPTIONS requests with the proper headers.
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/krpano/')) {
    // Build headers
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Range,Content-Type,Accept');
  // Expose length and range headers to the browser
  headers.set('Access-Control-Expose-Headers', 'Content-Length,Accept-Ranges,Content-Range');
  // Helpful debug header so we can confirm the middleware ran
  headers.set('X-Krpano-CORS', 'applied');
    // Reply to OPTIONS preflight immediately
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers });
    }
    // For other requests, continue and append CORS headers via response
  const res = NextResponse.next();
  headers.forEach((v, k) => res.headers.set(k, v));
  return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/krpano/:path*'],
};
