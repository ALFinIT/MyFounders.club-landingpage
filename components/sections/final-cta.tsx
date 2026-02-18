'use client'

import { motion } from 'framer-motion'

export function FinalCTASection() {
  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/10 to-orange-600/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Access Gulf Opportunities?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Submit your application now. Decision in 48-72 hours.
          </p>

          <motion.button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 mb-8"
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(255, 91, 35, 0.4)', transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.96 }}
          >
            Apply Now
          </motion.button>

          <motion.div
            className="text-white/80 text-sm space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>📧 Questions? Email: apply@myfounders.club</p>
            <p>💬 WhatsApp: +971-XX-XXX-XXXX</p>
            <p>📅 Book a Call: [Calendly link] (for qualified prospects only)</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
