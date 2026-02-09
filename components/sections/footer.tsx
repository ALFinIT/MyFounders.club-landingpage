"use client"

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'

const leftLinks = [
  { label: 'Platform', links: ['Explore Network', 'Opportunities'] },
]

const midLinks = [
  { label: 'Privacy', links: ['Privacy Policy', 'Data Usage'] },
]

const rightLinks = [
  { label: 'About', links: ['About Us'] },
]

const socialLinks = [
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

        {/* PART 2: Content grid with office details + links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 pb-8 border-b border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Platform text + Office details */}
            <div className="flex flex-col">
              <p className="text-sm font-light text-white/80 mb-6">Platform · Explore Network · Opportunities</p>
              
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

            {/* Right: 4 columns grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {leftLinks.map((sec, i) => (
                <div key={i}>
                  <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
                  <ul className="space-y-2">
                    {sec.links.map((l, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {midLinks.map((sec, i) => (
                <div key={i}>
                  <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
                  <ul className="space-y-2">
                    {sec.links.map((l, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {rightLinks.map((sec, i) => (
                <div key={i}>
                  <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
                  <ul className="space-y-2">
                    {sec.links.map((l, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {socialLinks.map((sec, i) => (
                <div key={i}>
                  <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
                  <ul className="space-y-2">
                    {sec.links.map((l, idx) => (
                      <li key={idx}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PART 3: Footer bottom */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 tracking-wider">
          <p className="font-light">© 2026 My Founders Club. All rights reserved.</p>
          <p className="font-light text-orange-500">Made by ALFINIT</p>
        </motion.div>
      </div>
    </footer>
  )
}
