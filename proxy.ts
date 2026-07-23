import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Proxy to ensure krpano static assets respond with permissive CORS
// and to answer preflight OPTIONS requests with the proper headers.
export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/krpano/')) {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Range,Content-Type,Accept');
    headers.set('Access-Control-Expose-Headers', 'Content-Length,Accept-Ranges,Content-Range');
    headers.set('X-Krpano-CORS', 'applied');

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 200, headers });
    }

    const res = NextResponse.next();
    headers.forEach((value, key) => res.headers.set(key, value));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/krpano/:path*'],
};
