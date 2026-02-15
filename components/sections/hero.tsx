'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import HighQualityImage from '../HighQualityImage'
import { ArrowRight, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}
export function HeroSection() {
  return (
      <section id="hero" className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style={{ minHeight: '100vh', paddingTop: '40px' }}>
        {/* Full-width banner placed at top of hero only */}
      <div className="w-full mt-12 relative -top-6">

  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex justify-center">
    <img 
      src="/Full_logo_mfc.png" 
      alt="MyFoundersClub Banner"
      className="w-64 sm:w-80 md:w-[600px] lg:w-[750px] h-auto object-contain"
    />
  </div>
</div>


      <motion.div
        className="relative z-10 max-w-6xl text-center flex flex-col items-center -mt-6 px-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-6 mb-6">

          <motion.div className="space-y-4" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] hero-heading font-extrabold drop-shadow-lg" style={{
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
            }}>
              <span className="block">Build Locally</span>
              <span className="block text-[#FF5B23]">Champion Regionally</span>
              <span className="block">Scale Globally</span>
            </h1>

            <p className="mt-4 mx-auto hero-subheading neon-subheading max-w-[900px] text-center text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-lg" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              The Gulf's ecosystem operating system connecting founders, capital, and opportunity across MENA and beyond.
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center w-full px-2" variants={itemVariants}>
            <HeroCTA />
            {/* Example secondary CTA - commented out for now */}
            {/* <motion.button className="group relative inline-flex items-center justify-center px-10 py-4 glass glass-hover font-semibold text-white rounded-2xl overflow-hidden" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <span className="relative flex items-center">Explore the Platform<Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" /></span>
            </motion.button> */}
          </motion.div>
        </div>

        <SocialProof />
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}

function HeroCTA() {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push('/coming-soon')}
      className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-semibold text-white transition-all duration-300 shadow-xl shadow-orange-500/40 w-full sm:w-auto max-w-[340px]"
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Join the Ecosystem"
      type="button"
    >
      <span className="relative flex items-center">
        Join the Ecosystem
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowRight className="ml-2 w-5 h-5" />
        </motion.div>
      </span>
    </motion.button>
  )
}

function SocialProof() {
  const avatars = [
    '/founders/user1.jpg',
    '/founders/user2.jpg',
    '/founders/user3.jpg',
    '/founders/user4.jpg',
  ]

  return (
    <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm -mt-2" variants={itemVariants}>
      <div className="flex -space-x-2 items-center">
        {avatars.map((src, i) => (
          <motion.div key={i} className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-background bg-muted" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }} whileHover={{ scale: 1.1, zIndex: 10 }}>
            <HighQualityImage src={src} alt={`Founder ${i + 1}`} fill className="object-cover" sizes="32px" />
          </motion.div>
        ))}
      </div>

      <p className="neon-subheading font-semibold text-center">Join <span className="font-semibold">500+</span> founders in the Gulf ecosystem</p>
    </motion.div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div className="relative w-full flex flex-col items-center gap-2 mt-8" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
      <p className="text-xs slow-blink text-muted-foreground uppercase tracking-widest">Scroll to explore</p>
      <div className="w-[2px] h-8 bg-gradient-to-b from-orange-500 to-transparent rounded-full" />
    </motion.div>
  )
}
