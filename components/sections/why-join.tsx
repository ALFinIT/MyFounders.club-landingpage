'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { scrollRevealConfig } from '@/lib/animation-variants'

const reasons = [
  {
    title: 'Gulf-Based Founders',
    points: [
      'Stop spending months on programmes, grants, and investors that were never right for your stage',
      'Find founders who understand the actual texture of building here, including Saudization, Emirates ID, hiring in a city of expats, and selling to government entities',
      'Get into rooms where the conversation is about real numbers. Not vision.'
    ]
  },
  {
    title: 'International Founders',
    points: [
      'Skip 12–18 months of wandering conferences and cold coffee chats',
      'Land with a clear sequence of moves and the warm introductions that make them real',
      'Build trust faster in a region where relationships are the infrastructure'
    ]
  }
]

interface TiltState {
  rotateX: number
  rotateY: number
}

function WhyJoinCard({ reason }: { reason: typeof reasons[0] }) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    const rotateX = (y / centerY) * 10
    const rotateY = (x / centerX) * -10

    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovering(false)
  }

  return (
    <motion.div
      className="h-full perspective"
      style={{ perspective: '1200px' }}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 32, scale: 0.95 }}
      viewport={scrollRevealConfig}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="group h-full rounded-2xl p-8 border border-white/10 bg-[#0b0b0b] cursor-pointer will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovering ? tilt.rotateX : 0,
          rotateY: isHovering ? tilt.rotateY : 0,
        }}
        transition={{
          rotateX: { duration: 0.2, ease: 'easeOut' },
          rotateY: { duration: 0.2, ease: 'easeOut' },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
        whileHover={{
          y: -12,
          boxShadow: '0 32px 64px rgba(0,0,0,0.7)',
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <h3 className="text-2xl font-bold text-white mb-6">{reason.title}</h3>
        
        <ul className="space-y-4">
          {reason.points.map((point, idx) => (
            <motion.li
              key={idx}
              className="flex gap-4 text-white/95"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={scrollRevealConfig}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-sm font-bold">
                ✓
              </span>
              <span className="leading-relaxed">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export function WhyJoinSection() {
  return (
    <section className="relative w-full py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Why Founders Join
          </h2>
          <p className="text-sm lg:text-base text-white/95 max-w-2xl mx-auto font-light">
            Two paths. Same destination. Clarity.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={scrollRevealConfig}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {reasons.map((reason, index) => (
            <WhyJoinCard key={index} reason={reason} />
          ))}
        </motion.div>

        {/* Stats Section Below Cards */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 pt-16 sm:pt-20 lg:pt-24 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-14">
            {[
              { number: '500+', label: 'Active Founders' },
              { number: '150+', label: 'Angel Investors' },
              { number: '25+', label: 'Venture Funds' },
              { number: '1000+', label: 'Monthly Opportunities' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-orange-400 mb-2 drop-shadow-lg" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                }}>
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium drop-shadow-lg" style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-base sm:text-lg text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-lg"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Join thousands of builders in the Gulf startup ecosystem
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
