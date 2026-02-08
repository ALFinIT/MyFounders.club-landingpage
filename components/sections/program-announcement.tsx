'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function ProgramAnnouncementSection() {
  const sectors = [
    'FinTech',
    'SaaS',
    'Health Tech',
    'E-Commerce',
    'EdTech',
    'Media & Content',
    'Supply Chain',
    'Sector-agnostic tech founders also considered',
  ]

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main heading */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          Don't Wait for the Announcement.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg text-muted-foreground text-center mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Get the advantage. Access programs, partners, and capital <span className="text-white">before they're public</span>.
        </motion.p>

        {/* Sector pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              className="px-4 py-2 rounded-full glass border border-teal-500/30 text-sm text-muted-foreground hover:border-orange-500/50 hover:text-orange-400 transition-all"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + index * 0.03 }}
            >
              {sector}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-semibold text-white transition-all duration-300 shadow-xl shadow-orange-500/40 overflow-hidden"
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(255, 91, 35, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center">
              Secure My Early Access
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
