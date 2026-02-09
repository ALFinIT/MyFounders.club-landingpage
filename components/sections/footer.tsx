"use client"

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { useState } from 'react'

function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/beehiv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      console.error('Newsletter error', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex items-center gap-3' : 'flex flex-col sm:flex-row gap-2 items-center'}>
      {compact && <span className="text-xs font-semibold text-white/80">NEWSLETTER :</span>}
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={compact ? 'enter your professional email' : 'you@domain.com'}
        required
        className="w-full sm:w-auto px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-orange-500/50 transition"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'sending' ? 'Joining...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-xs text-red-400 mt-1 w-full sm:w-auto">Error subscribing.</p>}
    </form>
  )
}

const allLinks = [
  { label: 'Platform', links: ['Explore Network', 'Opportunities'] },
  { label: 'Privacy', links: ['Privacy Policy', 'Data Usage'] },
  { label: 'About', links: ['About Us'] },
  { label: 'Social', links: [
    { text: 'LinkedIn', url: 'https://www.linkedin.com/company/myfoundersclub-global' },
    { text: 'Instagram', url: 'https://www.instagram.com/myfoundersclub.global/' },
    { text: 'YouTube', url: 'https://www.youtube.com/@myfoundersclub.global' }
  ] },
]

export function Footer() {
  return (
    <footer id="site-footer" className="w-full bg-black pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* PART 1: Logo + Branding */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 pb-8 border-b border-white/10"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
              <HighQualityImage
                src="/App Icon Orange.svg"
                alt="My Founders Club Logo"
                width={80}
                height={80}
                className="object-contain p-2"
                quality={100}
              />
            </div>

            <div>
              <p className="text-2xl md:text-3xl font-bold tracking-wide text-white">MY FOUNDER CLUBS</p>
              <p className="mt-1 text-sm md:text-base text-muted-foreground font-light">Build Locally. Champion Regionally. Scale Globally.</p>
            </div>
          </div>
        </motion.div>

        {/* PART 2: Newsletter (top-left) + Office Details (left) + Links (right columns) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 pb-8 border-b border-white/10"
        >
          {/* Top-left: Newsletter above separator */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">Newsletter</h3>
            <NewsletterForm compact />
          </div>

          {/* Below: Main grid with office details (left) + link columns (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Left: single-line row + office details */}
            <div className="lg:col-span-2 border-r border-white/10 pr-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-4">
                <span className="inline-flex items-center"><a href="#" className="hover:text-white">Platform</a><span className="mx-2 text-white/30">·</span></span>
                <span className="inline-flex items-center"><a href="#" className="hover:text-white">Explore Network</a><span className="mx-2 text-white/30">·</span></span>
                <span className="inline-flex items-center"><a href="#" className="hover:text-white">Opportunities</a></span>
              </div>

              <div className="text-sm text-white/70 space-y-1">
                <div>Office 1003, Latifa Tower, Sheikh Zayed Road (north)</div>
                <div>Sector, Dubai, United Arab Emirates</div>
                <div>Mon — 9:00 am — 6:00 pm</div>
                <div className="mt-3">
                  <a href="mailto:katerina@khgroup7.com" className="text-white/80 hover:text-white">katerina@khgroup7.com</a>
                </div>
                <div>
                  <a href="https://khgroup7.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">khgroup7.com</a>
                </div>
              </div>
            </div>

            {/* Right: Link columns */}
            {allLinks.map((sec, i) => (
              <div key={i} className="lg:col-span-1">
                <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
                <ul className="space-y-2">
                  {Array.isArray(sec.links[0]) ? (
                    sec.links.map((l: any, idx: number) => (
                      <li key={idx}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l.text}</a>
                      </li>
                    ))
                  ) : (
                    sec.links.map((l: any, idx: number) => (
                      <li key={idx}>
                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{typeof l === 'string' ? l : l.text}</a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PART 4: Footer bottom with Platform links in middle */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 tracking-wider">
          <p className="font-light">© 2026 My Founders Club. All rights reserved.</p>
          <p className="font-light text-center">Platform · Explore Network · Opportunities</p>
          <a href="https://alfinit.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-light text-white hover:text-orange-500 transition-colors duration-300">Made by ALFINIT</a>
        </motion.div>
      </div>
    </footer>
  )
}
