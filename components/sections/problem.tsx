'use client'

import { motion } from 'framer-motion'
import { AlertCircle, TrendingDown, Users } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
}

const problems = [
  {
    icon: Users,
    title: 'Fragmented Ecosystem',
    description: 'Founders, investors, and resources scattered across multiple platforms with no central hub.',
  },
  {
    icon: TrendingDown,
    title: 'Limited Capital Access',
    description: 'Difficulty connecting with regional investors and accessing Gulf-specific funding opportunities.',
  },
  {
    icon: AlertCircle,
    title: 'Knowledge Gaps',
    description: 'Lack of curated insights on regional market dynamics and ecosystem best practices.',
  },
]

export function ProblemSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
            The Challenge
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            Gulf founders face fragmentation and barriers that slow growth. We're changing that.
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={index}
                className="glass glass-hover group p-4 sm:p-6 lg:p-8"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-orange-500/30 group-hover:to-orange-600/20 transition-all"
                  whileHover={{ rotate: 10 }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                </motion.div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 text-white" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)' }}>{problem.title}</h3>
                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{problem.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
