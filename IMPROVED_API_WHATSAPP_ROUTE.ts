/**
 * IMPROVED API ENDPOINT: WhatsApp Signup
 * 
 * This is an improved version of /api/whatsapp/route.ts with:
 * - Better error handling and distinction
 * - Clear feedback when Supabase fails but local storage succeeds
 * - Better logging for debugging
 * - Proper HTTP status codes (202 Accepted for async processing)
 * 
 * Installation:
 * 1. Replace the current content of: app/api/whatsapp/route.ts
 * 2. Test with curl or Postman
 * 3. Monitor console logs for any errors
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'

interface WhatsAppSignupRequest {
  firstName: string
  phone: string
}

interface WhatsAppSignupResponse {
  success: boolean
  message: string
  synced: boolean
  fallback: boolean
  data?: any
  error?: string
  timestamp: string
}

export async function POST(req: Request): Promise<NextResponse<WhatsAppSignupResponse>> {
  const requestId = Math.random().toString(36).substring(7)
  const timestamp = new Date().toISOString()

  try {
    console.log(`[${requestId}] WhatsApp signup request received at ${timestamp}`)

    // Parse request body
    const body: WhatsAppSignupRequest = await req.json()
    const { firstName, phone } = body

    // Validate required fields
    if (!firstName || !firstName.trim()) {
      console.log(`[${requestId}] Validation failed: Missing firstName`)
      return NextResponse.json(
        {
          success: false,
          message: 'First name is required',
          synced: false,
          fallback: false,
          error: 'VALIDATION_ERROR',
          timestamp,
        },
        { status: 400 }
      )
    }

    if (!phone || !phone.trim()) {
      console.log(`[${requestId}] Validation failed: Missing phone`)
      return NextResponse.json(
        {
          success: false,
          message: 'Phone number is required',
          synced: false,
          fallback: false,
          error: 'VALIDATION_ERROR',
          timestamp,
        },
        { status: 400 }
      )
    }

    // Attempt Supabase insert
    console.log(`[${requestId}] Attempting Supabase insert for ${firstName}`)
    
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase
      .from('whatsapp_signups')
      .insert([
        {
          first_name: firstName.trim(),
          phone: phone.trim(),
        },
      ])
      .select()

    if (error) {
      console.error(`[${requestId}] Supabase error:`, error)
      
      // Attempt local fallback
      console.log(`[${requestId}] Attempting local database fallback`)
      try {
        await appendLocalRecord('whatsapp_signups.json', {
          firstName: firstName.trim(),
          phone: phone.trim(),
          _savedAt: timestamp,
          _requestId: requestId,
        })
        
        console.log(`[${requestId}] Local fallback succeeded`)
        
        return NextResponse.json(
          {
            success: true,
            message: 'Data saved locally. Server sync pending. Please note: Supabase tables may not be created yet.',
            synced: false,
            fallback: true,
            error: error.message,
            timestamp,
          },
          { status: 202 } // 202 Accepted - async processing
        )
      } catch (fallbackError) {
        console.error(`[${requestId}] Local fallback failed:`, fallbackError)
        
        return NextResponse.json(
          {
            success: false,
            message: `Failed to save data: ${error.message}. Local backup also failed.`,
            synced: false,
            fallback: false,
            error: `SUPABASE_AND_LOCAL_FAILURE: ${error.message}`,
            timestamp,
          },
          { status: 500 }
        )
      }
    }

    // Supabase success
    console.log(`[${requestId}] Supabase insert successful`, data)
    
    // Also save to local for redundancy
    if (process.env.NODE_ENV !== 'production') {
      try {
        await appendLocalRecord('whatsapp_signups.json', {
          firstName: firstName.trim(),
          phone: phone.trim(),
          _savedAt: timestamp,
          _requestId: requestId,
          _supabaseId: data?.[0]?.id,
        })
      } catch (e) {
        console.warn(`[${requestId}] Local backup write failed (non-fatal):`, e)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the WhatsApp community!',
        synced: true,
        fallback: false,
        data: data?.[0],
        timestamp,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error(`[${requestId}] Unexpected error in WhatsApp API:`, err)
    
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
        synced: false,
        fallback: false,
        error: err instanceof Error ? err.message : 'UNKNOWN_ERROR',
        timestamp,
      },
      { status: 500 }
    )
  }
}
