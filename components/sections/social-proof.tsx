'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
    <section className="relative w-full py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8"
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
                  className="w-40 h-32 rounded-2xl glass backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center group-hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                >
                  <motion.div
  className="relative w-16 h-16 rounded-full overflow-hidden mb-3 shadow-lg"
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
>
  <Image
    src={founder.image}
    alt={founder.name}
    fill
    sizes="64px"
    className="object-cover"
  />
</motion.div>

                  </motion.div>
                  <p className="text-sm font-semibold text-white">{founder.name}</p>
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
                  className="w-40 h-32 rounded-2xl glass backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center group-hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                >
                  <motion.div
                    className="relative w-16 h-16 rounded-full overflow-hidden mb-3 shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                   <Image
  src={founder.image}
  alt={founder.name}
  fill
  sizes="64px"
  className="object-cover"
/>

                  </motion.div>
                  <p className="text-sm font-semibold text-white">{founder.name}</p>
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
              <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
