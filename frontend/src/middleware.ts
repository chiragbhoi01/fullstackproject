// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function base64UrlDecode(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString();
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(token.split('.')[1]));
  } catch (e) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
