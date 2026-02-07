'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20 lg:pt-32 px-4 sm:px-6 lg:px-8">
      {/* Background image removed - using MFC theme from globals.css */}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl text-left flex flex-col items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <div className="space-y-6 mb-12">
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
              <span className="block text-white">Build Locally.</span>
              <span className="block">Champion Regionally.</span>
              <span className="block gradient-text">Scale Globally.</span>
            </h1>
          </motion.div>

          {/* Divider line - thick to thin */}
          <motion.div
            className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent rounded-full"
            style={{
              width: '100%',
              backgroundImage: 'linear-gradient(to right, #FF5B23 0%, #FF5B23 20%, transparent 100%)',
              filter: 'drop-shadow(0 0 8px rgba(255, 91, 35, 0.3))',
            }}
            variants={lineVariants}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light"
          variants={itemVariants}
        >
          Platform connecting founders, capital, and opportunity across the Gulf startup ecosystem.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          variants={itemVariants}
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
              Join the Ecosystem
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
          <motion.button
            className="group relative inline-flex items-center justify-center px-10 py-4 glass glass-hover font-semibold text-white rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex items-center">
              Explore the Platform
              <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
  className="flex items-center gap-6 text-sm"
  variants={itemVariants}
>
  <div className="flex -space-x-2">
    {[
      "/public/user1.jpg",
      "/public/user2.jpg",
      "/public/user3.jpg",
      "/public/user4.jpg",
    ].map((src, i) => (
      <motion.div
        key={i}
        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background bg-muted"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, zIndex: 10 }}
      >
        <Image
          src={src}
          alt={`Founder ${i + 1}`}
          fill
          className="object-cover"
          sizes="40px"
        />
      </motion.div>
    ))}
  </div>

  <p className="text-muted-foreground">
    Join <span className="text-white font-light">500+</span> founders in the Gulf ecosystem
  </p>
</motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mt-16"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</p>
        <div className="w-[2px] h-8 bg-gradient-to-b from-orange-500 to-transparent rounded-full" />
      </motion.div>
    </section>
  )
}
