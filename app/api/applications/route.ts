import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      fullName,
      companyName,
      email,
      phone,
      onePitchSentence,
      proofOfWork,
      commitmentAmount,
      agreeCommitment,
    } = body

    if (!fullName || !companyName || !email || !phone || !onePitchSentence) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          full_name: fullName,
          company_name: companyName,
          email,
          phone,
          one_pitch_sentence: onePitchSentence,
          proof_of_work: proofOfWork || null,
          commitment_amount: commitmentAmount || 'AED 500',
          agree_commitment: !!agreeCommitment,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      // still attempt to persist locally for debugging
      if (process.env.NODE_ENV !== 'production') {
        try {
          await appendLocalRecord('applications.json', { fullName, companyName, email, phone, onePitchSentence, proofOfWork, commitmentAmount, agreeCommitment, _savedAt: new Date().toISOString() })
        } catch (e) {
          console.error('Local persist failed:', e)
        }
      }

      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // persist a local copy in non-production for quick local DB access
    if (process.env.NODE_ENV !== 'production') {
      try {
        await appendLocalRecord('applications.json', { fullName, companyName, email, phone, onePitchSentence, proofOfWork, commitmentAmount, agreeCommitment, _savedAt: new Date().toISOString() })
      } catch (e) {
        console.error('Local persist failed:', e)
      }
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    console.error('Applications API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
