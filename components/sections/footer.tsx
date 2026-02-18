"use client"

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'
import { useState } from 'react'
import Link from 'next/link'

function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'duplicate'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    
    try {
      const res = await fetch('/api/beehiv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Email already exists
        setStatus('duplicate')
        setErrorMessage('This email is already subscribed')
        setTimeout(() => setStatus('idle'), 1000)
        return
      }

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Error subscribing. Please try again.')
        setTimeout(() => setStatus('idle'), 1000)
        return
      }

      // Success - show message for 1 second then reset
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 1000)
    } catch (err) {
      console.error('Newsletter error', err)
      setStatus('error')
      setErrorMessage('Error subscribing. Please try again.')
      setTimeout(() => setStatus('idle'), 1000)
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
          disabled={status === 'sending'}
          className="flex-[2] min-w-[180px] sm:min-w-[280px] px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:border-orange-500/50 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-3 sm:px-5 py-2 sm:py-3 rounded-lg bg-orange-500 text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50 whitespace-nowrap w-full sm:w-auto"
        >
          {status === 'sending' ? 'Joining...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
        </button>
      </form>

      {/* Success message in hot orange */}
      {status === 'success' && (
        <motion.p 
          className="text-sm mt-2 text-center font-semibold text-[#FF5B23]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ✓ Subscribed successfully!
        </motion.p>
      )}

      {/* Error message */}
      {status === 'error' && (
        <motion.p 
          className="text-xs text-red-400 mt-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Duplicate email message */}
      {status === 'duplicate' && (
        <motion.p 
          className="text-xs text-yellow-500 mt-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  )
}

const allLinks = [
  { label: 'Platform', links: [
    { text: 'Explore Network', href: '/platform/explore-network' },
    { text: 'Opportunities', href: '/platform/opportunities' },
  ] },
  { label: 'Privacy', links: [
    { text: 'Privacy Policy', href: '/privacy/privacy-policy' },
    { text: 'Data Usage', href: '/privacy/data-usage' },
    { text: 'Terms and Conditions', href: '/terms' },
  ] },
  { label: 'About', links: [
    { text: 'About Us', href: '/about/about-us' },
  ] },
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
              <p className="text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>MY FOUNDER CLUBS</p>
              <p className="mt-1 text-sm md:text-base text-gray-300 font-light" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>Build Locally. Champion Regionally. Scale Globally.</p>
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
              <div className="text-xs sm:text-sm text-white/80 space-y-1" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>
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
                <h3 className="text-xs uppercase tracking-widest text-white/80 font-semibold mb-3 drop-shadow-lg" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{sec.label}</h3>
                <ul className="space-y-2">
                  {sec.links.map((l: any, idx: number) => (
                    <li key={idx}>
                      {l.url ? (
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/70 hover:text-orange-400 transition-colors font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)' }}>{l.text}</a>
                      ) : (
                        <Link href={l.href} onMouseEnter={() => typeof window !== 'undefined' && (window as any).__next_prefetch && (window as any).__next_prefetch(l.href)} className="text-xs sm:text-sm text-white/70 hover:text-orange-400 transition-colors font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)' }}>{l.text}</Link>
                      )}
                    </li>
                  ))}
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
        <motion.div className="text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">My Founders Club</h3>
            <p className="text-white/80 text-sm">Your Gateway to Gulf Opportunities</p>
          </div>
          <div className="mb-4 text-lg">
            🇸🇦 Vision 2030 | 🇦🇪 Centennial 2071 | 🇶🇦 QNV 2030 | 🇴🇲 Vision 2040 | 🇰🇼 Vision 2035 | 🇧🇭 EV 2030
          </div>
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link href="/about" className="text-white/70 hover:text-orange-400 transition-colors">About</Link>
            <Link href="/privacy" className="text-white/70 hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/70 hover:text-orange-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-white/70 hover:text-orange-400 transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-white/50">© 2025 My Founders Club. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
