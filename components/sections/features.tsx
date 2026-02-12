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
    <section id="features" className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 font-sans">
            Everything You Need to Succeed
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Comprehensive tools and community designed for the Gulf startup ecosystem.
          </p>
        </motion.div>

        {/* Features grid - responsive for all screen sizes */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
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
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden flex flex-col"
                variants={animationVariants.staggerItem}
                whileHover={{ y: -4 }}
              >
                {/* Image backdrop - responsive height */}
                <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden rounded-t-xl sm:rounded-t-2xl bg-gray-800">
                  <HighQualityImage
                    src={feature.image || '/placeholder.svg'}
                    alt={feature.title}
                    fill
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500"
                    quality={100}
                  />
                </div>

                {/* Content - responsive padding and text */}
                <div className="bg-black/60 p-4 sm:p-5 lg:p-6 rounded-b-xl sm:rounded-b-2xl flex-grow flex flex-col">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4 bg-transparent flex-shrink-0"
                    whileHover={{ rotate: 0, scale: 1.02 }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>

                  <h3 className="text-base sm:text-lg lg:text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
