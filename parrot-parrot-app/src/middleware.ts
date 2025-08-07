import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import {REFRESH_TOKEN_SECRET } from './lib/env';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('jwt')?.value;

  let currentPath = req.nextUrl.pathname + req.nextUrl.search;
  if (!currentPath.startsWith('/')) currentPath = '/';

  const redirectUrl = new URL('/login', req.url);
  redirectUrl.searchParams.set('from', currentPath); 

  if (!token) return NextResponse.redirect(redirectUrl);

  try {
    const secret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(redirectUrl);
  }
}
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/test/:path*'], // Apply middleware to these paths
};