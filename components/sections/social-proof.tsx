'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'

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
  return (
    <section className="relative w-full py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by founders from the leading Gulf companies
        </motion.p>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex gap-8"
            animate={{ x: [0, '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* First set */}
            {founders.map((founder, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-64 h-80 rounded-2xl overflow-hidden relative group-hover:border-orange-500/50 transition-all duration-300 shadow-lg flex flex-col border border-white/10"
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                >
                  {/* Image Container - Takes majority of space */}
                  <div className="relative w-full flex-1 bg-black overflow-hidden">
                    <HighQualityImage
                      src={founder.image}
                      alt={founder.name}
                      fill
                      objectFit="cover"
                      className="object-cover object-top"
                      quality={100}
                    />
                  </div>

                  {/* Name Bar - Simple black background, minimal height */}
                  <div className="w-full bg-black px-4 py-3 text-center">
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
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-64 h-80 rounded-2xl overflow-hidden relative group-hover:border-orange-500/50 transition-all duration-300 shadow-lg flex flex-col border border-white/10"
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                >
                  {/* Image Container - Takes majority of space */}
                    <div className="relative w-full flex-1 bg-black overflow-hidden">
                    <HighQualityImage
                      src={founder.image}
                      alt={founder.name}
                      fill
                      objectFit="cover"
                      className="object-cover object-top"
                      quality={100}
                    />
                  </div>

                  {/* Name Bar - Simple black background, minimal height */}
                  <div className="w-full bg-black px-4 py-3 text-center">
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

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {[
            { value: '500+', label: 'Active Founders' },
            { value: '150+', label: 'Investors' },
            { value: '1000+', label: 'Opportunities' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
