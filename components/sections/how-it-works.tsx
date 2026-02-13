'use client'

import { motion } from 'framer-motion'
import { Zap, Target, TrendingUp } from 'lucide-react'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'

const steps = [
  {
    icon: Zap,
    number: '01',
    title: 'Connect',
    description: 'Join our platform and get instantly connected with founders, investors, and mentors.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Collaborate',
    description: 'Access resources, funding opportunities, and partnerships tailored to your stage.',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Scale',
    description: 'Leverage regional insights and global networks to accelerate your growth.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
            How It Works
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            From joining to scaling, we guide you through every step of your journey.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-16 sm:top-24 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent hidden lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2 }}
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Card background glow */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-orange-500/5 to-orange-500/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  {/* Number circle */}
                  <div className="relative mb-6 sm:mb-8 z-10">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-orange-500/25 to-orange-600/15 border border-orange-500/40 flex items-center justify-center shadow-lg shadow-orange-500/10"
                      whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(255, 91, 35, 0.3)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                      />
                      <span className="relative text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500">{step.number}</span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-2xl flex items-center justify-center border border-orange-500/40 shadow-md shadow-orange-500/10"
                      animate={{ y: [0, -6, 0], x: [0, 2, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.25, ease: 'easeInOut' }}
                    >
                      <Icon className="w-6 h-6 text-orange-300" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{step.description}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
