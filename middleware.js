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

  console.log(`🚦 Incoming request to ${pathname} + + ${isProtectedRoute}`);

  const adminToken = request.cookies.get('adminToken');

  console.log(`🔑 Admin Token Present: ${adminToken}`);
  
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

  // if (isProtectedRoute && !adminToken) {

  //   console.log(` if case triggered - redirecting to login`);
   
  //   const loginUrl = new URL('/login', request.url);
  //   return NextResponse.redirect(loginUrl);
  // }
  
 // if these conditions match, redirect to dashboard
 
  if (pathname === '/login2' && adminToken) {
    const dashboardUrl = new URL('/', request.url);
    return NextResponse.redirect(dashboardUrl);
}
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