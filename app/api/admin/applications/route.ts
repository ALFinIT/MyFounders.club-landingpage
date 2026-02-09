import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data || [], { status: 200 })
  } catch (err) {
    console.error('Admin applications error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
