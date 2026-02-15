"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactFooter() {
  const [sending, setSending] = useState(false)
  const router = useRouter()

  const handleContact = async () => {
    setSending(true)
    try {
      await fetch('/api/notify-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname }),
      })
      alert('Notification sent. Redirecting to setup...')
      router.push('/setup-profile')
    } catch (e) {
      alert('Failed to send notification')
    } finally {
      setSending(false)
    }
  }

  return (
    <footer className="w-full border-t border-gray-800 bg-transparent py-3 px-4 fixed bottom-0 left-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-300">
        <div>© {new Date().getFullYear()} MYFOUNDERSCLUB</div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleContact}
            disabled={sending}
            className="px-3 py-1 bg-orange-600/90 hover:bg-orange-600 rounded-md text-white text-sm"
          >
            {sending ? 'Sending...' : 'Contact / Setup'}
          </button>
        </div>
      </div>
    </footer>
  )
}
