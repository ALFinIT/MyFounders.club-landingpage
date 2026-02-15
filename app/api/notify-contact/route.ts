import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const nodemailer = require('nodemailer')

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const page = body.page || '/' 

    // Prepare transporter from env if available
    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD

    const to = 'katerina@khgroup7.com'

    if (!host || !port || !user || !pass) {
      // Log and return success so frontend flow continues even without SMTP
      console.log('Notify contact:', { page, to, message: 'SMTP not configured' })
      return NextResponse.json({ ok: true, message: 'SMTP not configured; logged' })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    })

    const site = process.env.NEXT_PUBLIC_SITE_URL || 'MYFOUNDERSCLUB'

    await transporter.sendMail({
      from: process.env.NOTIFY_FROM_EMAIL || user,
      to,
      subject: `Contact request from ${site}`,
      text: `A user clicked Contact/Setup on page: ${page} at ${new Date().toISOString()}`,
      html: `<p>A user clicked <strong>Contact / Setup</strong> on page: <code>${page}</code></p><p>Time: ${new Date().toISOString()}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('notify-contact error', err)
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'unknown' }, { status: 500 })
  }
}
