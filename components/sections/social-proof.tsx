'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { useState } from 'react'

// Gulf startup ecosystem companies
const founders = [
  {
    name: 'Ahmed Al Zahrani',
    company: 'Careem',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Omar Hassan',
    company: 'Noon',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Sara Al Mansoori',
    company: 'Talabat',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Faisal Khan',
    company: 'Namshi',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Yousef Ali',
    company: 'ADIB',
    image: '/founders/founder1.jpg',
  },
]

export function SocialProofSection() {
  const [dragX, setDragX] = useState(0)

  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Premium scroll reveal heading */}
        <motion.p
          className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by founders from the leading Gulf companies
        </motion.p>

        {/* Scrolling logos - Fast and draggable */}
        <div className="relative overflow-hidden py-8 cursor-grab active:cursor-grabbing">
          <motion.div
            className="flex gap-8"
            animate={{ x: dragX }}
            drag="x"
            dragElastic={0.2}
            dragMomentum={true}
            onDragEnd={(event, info) => {
              // Reset to normal scrolling position when drag ends
              setDragX(0)
            }}
            transition={{
              x: { duration: 0 }, // instant drag response
            }}
            style={{
              animation: dragX === 0 ? 'scroll 12s linear infinite' : 'none',
            }}
          >
            {/* First set */}
            {founders.map((founder, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="w-64 h-80 rounded-2xl overflow-hidden relative group-hover:border-orange-500/50 transition-all duration-300 shadow-lg flex flex-col border border-white/10 backdrop-blur-sm"
                  whileHover={{ 
                    boxShadow: '0 0 40px rgba(255, 91, 35, 0.4), 0 0 80px rgba(255, 91, 35, 0.2)',
                    borderColor: 'rgba(255, 91, 35, 0.8)'
                  }}
                >
                  {/* Image Container - Takes majority of space */}
                  <div className="relative w-full flex-1 bg-gradient-to-br from-orange-500/10 to-black overflow-hidden">
                    <HighQualityImage
                      src={founder.image}
                      alt={founder.name}
                      fill
                      objectFit="cover"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      quality={100}
                    />
                    {/* Premium gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Name Bar - Premium styling */}
                  <div className="w-full bg-gradient-to-r from-black to-black/80 px-4 py-3 text-center backdrop-blur-md border-t border-white/10">
                    <p className="text-white font-semibold text-sm">{founder.name}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {founders.map((founder, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: (founders.length + index) * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="w-64 h-80 rounded-2xl overflow-hidden relative group-hover:border-orange-500/50 transition-all duration-300 shadow-lg flex flex-col border border-white/10 backdrop-blur-sm"
                  whileHover={{ 
                    boxShadow: '0 0 40px rgba(255, 91, 35, 0.4), 0 0 80px rgba(255, 91, 35, 0.2)',
                    borderColor: 'rgba(255, 91, 35, 0.8)'
                  }}
                >
                  {/* Image Container - Takes majority of space */}
                  <div className="relative w-full flex-1 bg-gradient-to-br from-orange-500/10 to-black overflow-hidden">
                    <HighQualityImage
                      src={founder.image}
                      alt={founder.name}
                      fill
                      objectFit="cover"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      quality={100}
                    />
                    {/* Premium gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Name Bar - Premium styling */}
                  <div className="w-full bg-gradient-to-r from-black to-black/80 px-4 py-3 text-center backdrop-blur-md border-t border-white/10">
                    <p className="text-white font-semibold text-sm">{founder.name}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* CSS animation for continuous scroll */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>

        {/* Stats with premium scroll reveal */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {[
            { value: '500+', label: 'Active Founders' },
            { value: '150+', label: 'Investors' },
            { value: '1000+', label: 'Opportunities' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-orange-500">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
