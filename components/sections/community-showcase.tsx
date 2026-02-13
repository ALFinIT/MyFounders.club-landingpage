'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Users, Zap, Globe, Check } from 'lucide-react'
import HighQualityImage from '@/components/HighQualityImage'

const stats = [
  { number: '500+', label: 'Active Founders', icon: Users },
  { number: '200+', label: 'Investors Connected', icon: Zap },
  { number: '50+', label: 'Countries Reached', icon: Globe },
]

export function CommunityShowcase() {
  return (
    <section id="community" className="relative min-h-screen w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#0a0a0a] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)' }}>
            Join{' '}
            <span className="text-orange-500">
              500+ Founders
            </span>
            {' '}in the Gulf Ecosystem
          </h2> 
          <p className="text-xl text-gray-300 max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            Be part of a thriving community revolutionizing the startup landscape across the Middle East
          </p>
        </motion.div>

        {/* Main image grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Left side - Large image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden h-96 lg:h-full min-h-[500px] group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <HighQualityImage
              src="/images/MFC-community.png"
              alt="500+ founders in Gulf ecosystem"
              fill
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500"
              quality={100}
              priority
            />
            <motion.div
              className="absolute inset-0 border-2 border-orange-500/20 rounded-3xl"
              animate={{ borderColor: ['rgba(255, 91, 35, 0.2)', 'rgba(255, 91, 35, 0.5)', 'rgba(255, 91, 35, 0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Right side - Stats and content */}
          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Stats cards */}
            <div className="space-y-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    className="glass rounded-2xl p-6 group hover:border-orange-500/50 transition-all duration-300"
                    whileHover={{ x: 8, boxShadow: '0 0 30px rgba(255, 91, 35, 0.2)' }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-7 h-7 text-orange-400" />
                      </motion.div>
                      <div>
                        <p className="text-3xl font-bold text-white">{stat.number}</p>
                        <p className="text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Features list */}
            <motion.div
              className="glass rounded-2xl p-8 space-y-4"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">What You Get</h3>
              {[
                'Direct access to 200+ angel investors and VCs',
                'Monthly networking events and founder meetups',
                'Exclusive market insights and opportunities',
                'Mentorship from successful Gulf entrepreneurs',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Testimonials */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.2 }}
        >
          {[
            {
              image: '/images/Ahmed.JPG',
              quote: 'Best platform to connect with investors',
              author: 'Ahmed Al-Mansouri',
              role: 'Founder, TechVenture',
            },
            {
              image: '/images/Fatima.JPG',
              quote: 'Transformed our business growth trajectory',
              author: 'Fatima Al-Zahra',
              role: 'CEO, InnovateME',
            },
            {
              image: '/images/Mohammed.JPG',
              quote: 'Found the perfect mentor for our startup',
              author: 'Mohammed Al-Qassim',
              role: 'Founder, FutureScale',
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative rounded-2xl overflow-hidden h-64 mb-4 group">
                <HighQualityImage
                  src={testimonial.image || '/placeholder.svg'}
                  alt={testimonial.author}
                  fill
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                  quality={100}
                />
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-muted-foreground italic mb-3">"{testimonial.quote}"</p>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <CommunityCTA />
        </motion.div>
      </div>
    </section>
  )
}

function CommunityCTA() {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push('/auth')}
      className="inline-block px-10 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg shadow-orange-500/40 transition-all"
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      Join the 500+ Community Today
    </motion.button>
  )
}
