import { type NextRequest, NextResponse } from 'next/server'

// Use experimental edge runtime to match Next's expectations
export const runtime = 'experimental-edge'

/**
 * Production-safe middleware for Vercel Edge Runtime.
 * This middleware is intentionally minimal and defensive:
 * - avoids Node-only APIs
 * - checks environment variables before using them
 * - uses optional chaining when accessing headers/cookies
 * - fails open (allows the request) on unexpected errors
 */
export async function middleware(request: NextRequest) {
  try {
    // Minimal guard: ensure headers/cookies access won't throw
    const headers = request?.headers
    const cookies = request?.cookies

    // Check critical environment variables; if missing, skip any third-party init
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
    if (!supabaseUrl || !supabaseKey) {
      // No env configured — do not attempt to initialize server SDKs in the Edge runtime
      return NextResponse.next()
    }

    // If you have an Edge-compatible Supabase helper, initialize it here safely.
    // Avoid synchronous or Node-specific operations.

    // Example: simply forward request in middleware for now.
    return NextResponse.next()
  } catch (err) {
    // Always fail open in middleware: let the request proceed if middleware fails
    // Log the error so it can be observed in Vercel logs
    // eslint-disable-next-line no-console
    console.error('Middleware error (safe):', err)
    return NextResponse.next()
  }
}

// Exclude static assets, Next internals and API routes from middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
