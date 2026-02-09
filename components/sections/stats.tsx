'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatCounter {
  value: number
  label: string
  suffix?: string
}

const stats: StatCounter[] = [
  { value: 500, label: 'Active Founders', suffix: '+' },
  { value: 150, label: 'Angel Investors', suffix: '+' },
  { value: 25, label: 'Venture Funds', suffix: '+' },
  { value: 1000, label: 'Monthly Opportunities', suffix: '+' },
]

function Counter({ value, label, suffix }: StatCounter) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let currentValue = 0
          const increment = Math.ceil(value / 50)
          const timer = setInterval(() => {
            currentValue += increment
            if (currentValue >= value) {
              setDisplayValue(value)
              clearInterval(timer)
            } else {
              setDisplayValue(currentValue)
            }
          }, 30)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${label}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [value, label])

  return (
    <motion.div
      id={`counter-${label}`}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-4xl sm:text-5xl lg:text-6xl font-light gradient-text mb-3">
        {displayValue}
        {suffix}
      </p>
      <p className="text-muted-foreground text-sm sm:text-base font-light">{label}</p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            By the Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A growing ecosystem of innovators, investors, and opportunities.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-6">
            Join thousands of builders in the Gulf startup ecosystem
          </p>
          {/* <motion.button
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  )
}
