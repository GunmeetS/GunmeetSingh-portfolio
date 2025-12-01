import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  // Add compression headers
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Content-Encoding', 'gzip')
  }
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
