import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

async function getStoredEmails() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'newsletter_signups.json')
    const data = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(data).map((item: any) => item.email)
  } catch {
    return []
  }
}

async function saveEmail(email: string) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'newsletter_signups.json')
    let existing = []
    try {
      const data = await fs.readFile(dataPath, 'utf-8')
      existing = JSON.parse(data)
    } catch {
      existing = []
    }

    existing.push({ email, subscribedAt: new Date().toISOString() })
    await fs.writeFile(dataPath, JSON.stringify(existing, null, 2))
  } catch (err) {
    console.error('Error saving to file:', err)
  }
}

export async function POST(req: Request) {
  try {
    let body
    try {
      body = await req.json()
    } catch (parseErr) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { email } = body

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const trimmedEmail = email.trim().toLowerCase()

    // Check if email already exists in our file storage
    const storedEmails = await getStoredEmails()
    if (storedEmails.includes(trimmedEmail)) {
      return NextResponse.json(
        { error: 'This email is already subscribed', type: 'duplicate' },
        { status: 409 }
      )
    }

    // Save to local file IMMEDIATELY
    await saveEmail(trimmedEmail)

    // Return success immediately - don't wait for Supabase or Beehiv
    // These will be handled in the background
    const response = NextResponse.json(
      { data: { email: trimmedEmail, saved_locally: true }, status: 'success' },
      { status: 200 }
    )

    // Background sync with Supabase and Beehiv (non-blocking)
    ;(async () => {
      try {
        const cookieStore = await cookies()
        const supabase = await createClient(cookieStore)
        await supabase
          .from('newsletter_signups')
          .insert([{ email: trimmedEmail, subscribed_at: new Date().toISOString() }])
      } catch (dbErr) {
        console.warn('Background Supabase sync failed (non-blocking):', dbErr)
      }

      try {
        const apiKey = process.env.BEEHIV_API_KEY
        const newsletterId = process.env.BEEHIV_NEWSLETTER_ID
        const apiUrl =
          process.env.BEEHIV_API_URL ||
          (newsletterId ? `https://api.beehiiv.com/v1/newsletters/${newsletterId}/subscribers` : null)

        if (!apiKey || !apiUrl) {
          console.warn('Beehiv config missing - skipping background sync')
          return
        }

        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ email: trimmedEmail }),
        })
      } catch (beehivErr) {
        console.warn('Background Beehiv sync failed (non-blocking):', beehivErr)
      }
    })()

    return response
  } catch (err) {
    console.error('Newsletter route error', err)
    return NextResponse.json({ error: 'Internal server error', type: 'server_error' }, { status: 500 })
  }
}
