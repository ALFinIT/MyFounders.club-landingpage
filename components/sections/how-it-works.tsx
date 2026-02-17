'use client'

import { motion } from 'framer-motion'
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'

const steps = [
  {
    icon: FileText,
    key: 'apply',
    title: 'Apply',
    description: 'Two minutes. Tell us who you are, where you are based, and what you are building. We review every application with care.',
  },
  {
    icon: UserCheck,
    key: 'profile',
    title: 'Profile & Next Step',
    description: 'If accepted, your founder profile goes live and we suggest the best next step tailored to your stage and goals.',
  },
  {
    icon: Users,
    key: 'connect',
    title: 'Join The Room',
    description: 'Attend matched circles, events, and deal rooms — local track or GCC expansion depending on your plans.',
  },
  {
    icon: TrendingUp,
    key: 'grow',
    title: 'Build, Expand, Raise',
    description: 'Leverage community, intelligence, and corridors to grow in the Gulf and reach the right capital at the right time.',
  },
]

interface TiltState {
  rotateX: number
  rotateY: number
}

function StepCard({ step }: { step: typeof steps[0] }) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const Icon = step.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    const rotateX = (y / centerY) * 8
    const rotateY = (x / centerX) * -8

    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovering(false)
  }

  return (
    <motion.div
      className="h-full perspective"
      style={{
        perspective: '1200px',
      }}
      variants={animationVariants.staggerItem}
    >
      <motion.article
        className="group h-full rounded-2xl p-6 sm:p-8 border border-white/8 bg-black/40 backdrop-blur-sm cursor-pointer will-change-transform"
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
          y: -8,
          boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className="flex items-start gap-4 relative z-10">
          <div className="flex-none">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-orange-500/8 border border-white/6 group-hover:from-orange-500/30 group-hover:to-orange-500/15 transition-colors duration-300">
              <Icon className="w-6 h-6 text-orange-300" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-sm sm:text-sm text-white/75 leading-relaxed group-hover:text-white/85 transition-colors duration-300">{step.description}</p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14 lg:mb-16"
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">How It Works</h2>
          <p className="text-sm sm:text-base text-white/95 max-w-2xl mx-auto">Four premium steps — clear, deliberate, and designed for founders.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          variants={animationVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          {steps.map((step) => (
            <StepCard key={step.key} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
