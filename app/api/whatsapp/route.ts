import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, phone } = body

    if (!firstName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase
      .from('whatsapp_signups')
      .insert([
        {
          first_name: firstName,
          phone,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      if (process.env.NODE_ENV !== 'production') {
        try {
          await appendLocalRecord('whatsapp_signups.json', { firstName, phone, _savedAt: new Date().toISOString() })
        } catch (e) {
          console.error('Local persist failed:', e)
        }
      }

      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (process.env.NODE_ENV !== 'production') {
      try {
        await appendLocalRecord('whatsapp_signups.json', { firstName, phone, _savedAt: new Date().toISOString() })
      } catch (e) {
        console.error('Local persist failed:', e)
      }
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    console.error('WhatsApp API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
