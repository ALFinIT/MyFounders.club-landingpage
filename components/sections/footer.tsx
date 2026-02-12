"use client"

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'
import { useState } from 'react'

function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Save to localStorage
      const existing = typeof window !== 'undefined' ? localStorage.getItem('newsletters') : null
      const arr = existing ? JSON.parse(existing as string) : []
      arr.push({ email, subscribedAt: new Date().toISOString() })
      if (typeof window !== 'undefined') localStorage.setItem('newsletters', JSON.stringify(arr))

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
    <div className="w-full">
      <form onSubmit={handleSubmit} className={compact ? 'flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3' : 'flex flex-col sm:flex-row gap-2 items-center'}>
        {compact && <span className="text-xs font-semibold text-white/80 whitespace-nowrap">NEWSLETTER </span>}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={compact ? 'enter your professional email' : 'you@domain.com'}
          required
          className="flex-[2] min-w-[220px] sm:min-w-[320px] px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:border-orange-500/50 transition"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-orange-500 text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
        >
          {status === 'sending' ? 'Joining...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
        </button>
        {status === 'error' && <p className="text-xs text-red-400 mt-1 w-full sm:w-auto">Error subscribing.</p>}
      </form>

      {/* Short centered success message below the newsletter column */}
      {status === 'success' && (
        <p className="text-sm mt-2 text-center text-[#FF5B23]">Subscribed</p>
      )}
    </div>
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
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
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

        {/* PART 2: Office Details (left) + Links (right columns) */}
        <motion.div
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
          className="mb-12 pb-8 border-b border-white/10"
        >
          {/* Main grid with office details (left) + link columns (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
            {/* Left: office details */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="text-xs sm:text-sm text-white/70 space-y-1">
                <div>Office 1003, Latifa Tower,</div>
                <div>Sheikh Zayed Road (north)</div>
                <div>Sector, Dubai, UAE</div>
               
                <div className="mt-3">
                  <a href="mailto:katerina@khgroup7.com" className="text-white/80 hover:text-white break-all">katerina@khgroup7.com</a>
                </div>
                <div>
                  <a href="https://khgroup7.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">khgroup7.com</a>
                </div>
              </div>
            </div>

            {/* Right: Link columns */}
            {allLinks.map((sec, i) => (
              <div key={i} className="sm:col-span-1 lg:col-span-1">
                <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-3">{sec.label}</h3>
                <ul className="space-y-2">
                  {Array.isArray(sec.links[0]) ? (
                    sec.links.map((l: any, idx: number) => (
                      <li key={idx}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors font-light">{l.text}</a>
                      </li>
                    ))
                  ) : (
                    sec.links.map((l: any, idx: number) => (
                      <li key={idx}>
                        <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors font-light">{typeof l === 'string' ? l : l.text}</a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter - Right side below links / Full width on mobile */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 items-center">
  
              {/* Empty space (left) */}
          <div className="hidden lg:block lg:col-span-6" />
        {/* Newsletter */}
        <div className="col-span-1 lg:col-span-6 lg:pl-20">

          <NewsletterForm compact />
         </div>
        </div>
        </motion.div>

        {/* PART 4: Footer bottom - 3 column layout */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 tracking-wider">
          <p className="font-light">© 2026 My Founders Club. All rights reserved.</p>
          <p className="font-light hidden sm:block">Platform · Explore Network · Opportunities</p>
          <a href="https://alfinit.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-light text-white hover:text-orange-500 transition-colors duration-300">Made by ALFINIT</a>
        </motion.div>
      </div>
    </footer>
  )
}
