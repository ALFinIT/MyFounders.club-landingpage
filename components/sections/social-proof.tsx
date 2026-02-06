'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Gulf startup ecosystem companies
const companies = [
  { name: 'Zain', color: 'from-blue-600 to-blue-400' },
  { name: 'Aramco', color: 'from-green-600 to-green-400' },
  { name: 'ADIB', color: 'from-red-600 to-red-400' },
  { name: 'Noon', color: 'from-yellow-600 to-yellow-400' },
  { name: 'Careem', color: 'from-purple-600 to-purple-400' },
  { name: 'Talabat', color: 'from-orange-600 to-orange-400' },
  { name: 'Namshi', color: 'from-pink-600 to-pink-400' },
  { name: 'Fetchr', color: 'from-indigo-600 to-indigo-400' },
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
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* First set */}
            {companies.map((company, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`w-40 h-32 rounded-2xl glass backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center group-hover:border-orange-500/50 transition-all duration-300 shadow-lg`}
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full overflow-hidden mb-3 shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <img
                      src={`https://source.unsplash.com/160x160/?portrait,${encodeURIComponent(company.name)}`}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <p className="text-sm font-semibold text-white">{company.name}</p>
                </motion.div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`w-40 h-32 rounded-2xl glass backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center group-hover:border-orange-500/50 transition-all duration-300 shadow-lg`}
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full overflow-hidden mb-3 shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <img
                      src={`https://source.unsplash.com/160x160/?portrait,${encodeURIComponent(company.name)}`}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <p className="text-sm font-semibold text-white">{company.name}</p>
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
