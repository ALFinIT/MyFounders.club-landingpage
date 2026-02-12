'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { Compass, Users, Zap, TrendingUp, Award, Globe } from 'lucide-react'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'

const features = [
  {
    icon: Compass,
    title: 'Founder Network',
    description: 'Connect with like-minded entrepreneurs, share experiences, and build lasting partnerships.',
    image: '/images/founders-hub.jpeg',
  },
  {
    icon: Users,
    title: 'Investor Directory',
    description: 'Access curated investor profiles and funding opportunities tailored to your stage.',
    image: '/images/investor-directory.JPG',
  },
  {
    icon: Zap,
    title: 'Market Insights',
    description: 'Real-time data on Gulf startup trends, competitive landscape, and growth strategies.',
    image: '/images/marketInsights.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Growth Tools',
    description: 'Resources, templates, and frameworks to accelerate your business development.',
    image: '/images/growth-tools.JPG',
  },
  {
    icon: Award,
    title: 'Mentorship Hub',
    description: 'Learn from seasoned founders and industry experts through curated programs.',
    image: '/images/mentorship.jpeg',
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    description: 'Connect with international networks to scale your business beyond the region.',
    image: '/images/ecosystem.jpeg',
  },
]

// Use imported variants instead of local definitions

export function FeaturesSection() {
  return (
    <section id="features" className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Comprehensive tools and community designed for the Gulf startup ecosystem.
          </p>
        </motion.div>

        {/* Features grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={animationVariants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealConfig}
          >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative rounded-2xl overflow-hidden"
                variants={animationVariants.staggerItem}
                whileHover={{ y: -8 }}
              >
                {/* Image backdrop */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <HighQualityImage
                    src={feature.image || '/placeholder.svg'}
                    alt={feature.title}
                    fill
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500"
                    quality={100}
                  />
                </div>

                {/* Content */}
                <div className="bg-black/60 p-6 rounded-b-2xl">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-transparent"
                    whileHover={{ rotate: 0, scale: 1.02 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-light mb-2 text-white">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
