'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function FOMOSection() {
  const qualifications = [
    'Founder-led company (tech-agnostic)',
    'Revenue or funding traction',
    'Team in place or building',
    'Vision for MENA expansion or regional impact',
    'Coachable and committed long-term',
  ]

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="space-y-8 text-left"
        >
          {/* First paragraph */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
              This isn't a waitlist.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              It's a <span className="text-orange-400 font-semibold">shortlist</span>. We're building the Gulf's most selective founder community not for gatekeeping, but for signal. Every member has been vetted, qualified, and committed to moving fast.
            </p>
          </div>

          {/* Second paragraph */}
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            The founders in this shortlist don't wait for announcements. They get the advantage: first access to capital, strategic partners, and opportunities before they're public knowledge.
          </p>
        </motion.div>

        {/* Qualification checklist */}
        <motion.div
          className="mt-16 p-8 rounded-2xl glass border border-orange-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-light text-white mb-8">You Should Apply If...</h3>
          <div className="space-y-4">
            {qualifications.map((qualification, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-base text-muted-foreground leading-relaxed">{qualification}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who shouldn't apply */}
        <motion.div
          className="mt-8 p-8 rounded-2xl glass border border-orange-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            You Should Not Apply If...
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li>• You're still in the ideation phase</li>
            <li>• You're looking for validation, not execution</li>
            <li>• You're not ready to commit 12+ months</li>
            <li>• You're just looking for a discount or "status"</li>
          </ul>
        </motion.div>

        {/* Closing statement */}
        <motion.p
          className="text-lg text-white font-light text-center mt-12 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          The shortlist closes when it's full. <span className="text-orange-400 font-semibold">Don't wait.</span>
        </motion.p>
      </div>
    </section>
  )
}
