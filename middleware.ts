import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // This middleware refreshes user sessions and is optional.
  // It helps to keep the user logged in if they navigate between pages.
  return createClient(request)
}

// Ensure the middleware only runs on internal routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/ (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
