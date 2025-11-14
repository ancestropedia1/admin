// middleware.js - UPDATED VERSION
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const protectedRoutes = [
    '/', '/user-management', '/AddUser', '/blogs-management', 
    '/order', '/heritage', '/profile', '/settings/account', 
    '/myorders', '/blogs', '/help'
  ];
  
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const adminToken = request.cookies.get('adminToken');
  
  /**
   * ONLY PROTECT ROUTES - DON'T REDIRECT FROM LOGIN
   * 
   * Why remove the login redirect?
   * 1. handleLogin already redirects after successful login
   * 2. User might want to see login page for branding/logout confirmation
   * 3. Less intrusive - doesn't force redirect if user manually types /login
   * 4. Cleaner flow - single source of truth for post-login redirect
   */
  
  // SCENARIO 1: Block access to protected routes without token
  if (isProtectedRoute && !adminToken) {
   
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // SCENARIO 2: Allow access to login page regardless of auth status
  // (Removed the redirect for /login with token)
  
  console.log(`✅ Allowing access to ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', '/login', '/user-management', '/AddUser', '/blogs-management',
    '/order', '/heritage', '/profile', '/settings/account', '/myorders',
    '/blogs', '/help'
  ]
};