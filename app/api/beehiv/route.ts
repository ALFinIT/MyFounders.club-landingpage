import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    // Save to Supabase locally
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { error: dbError } = await supabase
      .from('newsletter_signups')
      .insert([{ email, subscribed_at: new Date().toISOString() }])

    if (dbError) {
      console.error('Supabase error:', dbError)
    }

    // Post to Beehiv API
    const apiKey = process.env.BEEHIV_API_KEY
    const newsletterId = process.env.BEEHIV_NEWSLETTER_ID
    const apiUrl = process.env.BEEHIV_API_URL || (newsletterId ? `https://api.beehiiv.com/v1/newsletters/${newsletterId}/subscribers` : null)

    if (!apiKey || !apiUrl) {
      console.warn('Beehiv config missing - saved locally only')
      return NextResponse.json({ data: { email, saved_locally: true } }, { status: 200 })
    }

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Beehiv API error', data)
      return NextResponse.json(
        { data: { email, saved_locally: true, beehiv_error: data.message } },
        { status: 200 }
      )
    }

    return NextResponse.json({ data: { email, saved_locally: true, beehiv_synced: true } }, { status: 200 })
  } catch (err) {
    console.error('Newsletter route error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
