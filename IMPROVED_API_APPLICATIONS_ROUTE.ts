/**
 * IMPROVED API ENDPOINT: Application Form Submission
 * 
 * This is an improved version of /api/applications/route.ts with:
 * - Better error handling and distinction
 * - Clear feedback when Supabase fails but local storage succeeds  
 * - Better logging for debugging
 * - Proper HTTP status codes (202 Accepted for async processing)
 * - Comprehensive field validation
 * 
 * Installation:
 * 1. Replace the current content of: app/api/applications/route.ts
 * 2. Test with curl or Postman
 * 3. Monitor console logs for any errors
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'

interface ApplicationRequest {
  fullName: string
  companyName: string
  email: string
  phone: string
  onePitchSentence: string
  proofOfWork?: string
  commitmentAmount?: string
  agreeCommitment?: boolean
}

interface ApplicationResponse {
  success: boolean
  message: string
  synced: boolean
  fallback: boolean
  data?: any
  error?: string
  missingFields?: string[]
  timestamp: string
}

export async function POST(req: Request): Promise<NextResponse<ApplicationResponse>> {
  const requestId = Math.random().toString(36).substring(7)
  const timestamp = new Date().toISOString()

  try {
    console.log(`[${requestId}] Application submission request received at ${timestamp}`)

    // Parse request body
    const body: ApplicationRequest = await req.json()
    const {
      fullName,
      companyName,
      email,
      phone,
      onePitchSentence,
      proofOfWork,
      commitmentAmount = 'AED 500',
      agreeCommitment = false,
    } = body

    // Validate required fields
    const missingFields: string[] = []

    if (!fullName || !fullName.trim()) missingFields.push('fullName')
    if (!companyName || !companyName.trim()) missingFields.push('companyName')
    if (!email || !email.trim()) missingFields.push('email')
    if (!phone || !phone.trim()) missingFields.push('phone')
    if (!onePitchSentence || !onePitchSentence.trim()) missingFields.push('onePitchSentence')

    if (missingFields.length > 0) {
      console.log(`[${requestId}] Validation failed. Missing fields: ${missingFields.join(', ')}`)
      
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          synced: false,
          fallback: false,
          error: 'VALIDATION_ERROR',
          missingFields,
          timestamp,
        },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      console.log(`[${requestId}] Validation failed: Invalid email format`)
      
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
          synced: false,
          fallback: false,
          error: 'INVALID_EMAIL',
          timestamp,
        },
        { status: 400 }
      )
    }

    // Attempt Supabase insert
    console.log(`[${requestId}] Attempting Supabase insert for ${fullName}`)
    
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          full_name: fullName.trim(),
          company_name: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          one_pitch_sentence: onePitchSentence.trim(),
          proof_of_work: proofOfWork || null,
          commitment_amount: commitmentAmount || 'AED 500',
          agree_commitment: !!agreeCommitment,
        },
      ])
      .select()

    if (error) {
      console.error(`[${requestId}] Supabase error:`, error)
      
      // Attempt local fallback
      console.log(`[${requestId}] Attempting local database fallback`)
      try {
        await appendLocalRecord('applications.json', {
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          onePitchSentence: onePitchSentence.trim(),
          proofOfWork: proofOfWork || null,
          commitmentAmount: commitmentAmount || 'AED 500',
          agreeCommitment: !!agreeCommitment,
          _savedAt: timestamp,
          _requestId: requestId,
        })
        
        console.log(`[${requestId}] Local fallback succeeded`)
        
        return NextResponse.json(
          {
            success: true,
            message: 'Application saved locally. Server sync pending. Please note: Supabase tables may not be created yet.',
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
            message: `Failed to submit application: ${error.message}. Local backup also failed.`,
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
        await appendLocalRecord('applications.json', {
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          onePitchSentence: onePitchSentence.trim(),
          proofOfWork: proofOfWork || null,
          commitmentAmount: commitmentAmount || 'AED 500',
          agreeCommitment: !!agreeCommitment,
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
        message: 'Application submitted successfully! Check your email for next steps.',
        synced: true,
        fallback: false,
        data: data?.[0],
        timestamp,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error(`[${requestId}] Unexpected error in Applications API:`, err)
    
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
