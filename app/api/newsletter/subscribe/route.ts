import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_signups')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Already subscribed', message: 'This email is already on our newsletter list' },
        { status: 409 }
      )
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('newsletter_signups')
      .insert({
        email: email.toLowerCase(),
        subscribed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Newsletter subscription error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        data 
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
