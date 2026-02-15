'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { PaymentModal } from '@/components/PaymentModal'

const plans = [
  {
    name: 'Founder Access Pass',
    price: 'AED 25',
    period: '/month',
    description: 'WhatsApp-only access',
    features: [
      'Private WhatsApp founder channel',
      'Early access to programs & invites',
      'Monthly ecosystem updates',
      'Founder network directory',
    ],
    popular: false,
    cta: 'Get Access',
  },
  {
    name: 'Scale Plan',
    price: 'Custom',
    description: 'Suite of services, form-based',
    buckets: [
      {
        title: 'Market Entry & Ops',
        items: [
          'Company registration',
          'Accounting & audit',
          'Digital transformation',
        ],
      },
      {
        title: 'Growth & Capital',
        items: [
          'Go-to-market strategy',
          'Fundraising advisory',
          'M&A sourcing',
          'Business development',
        ],
      },
      {
        title: 'Visibility & Influence',
        items: [
          'Trade missions',
          'Media & PR',
          'Marketing & positioning',
          'Reputation management',
        ],
      },
    ],
    popular: true,
    cta: 'Inquire',
  },
  {
    name: 'Partner Networks',
    price: 'Custom',
    description: 'Private channel for institutional players',
    features: [
      'Curated founder deal flow',
      'Investment signals & insights',
      'Event co-hosting',
      'Custom reporting',
    ],
    popular: false,
    cta: 'Learn More',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For institutions seeking signal—not noise',
    features: [
      'Sponsorship packages',
      'Proprietary data & insights',
      'Dedicated relationship manager',
      'Custom integrations',
      'Sector-specific reporting',
      'Priority support 24/7',
    ],
    popular: false,
    cta: 'Contact',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function PricingSectionUpdated() {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    tier?: string
    billingCycle?: 'monthly' | 'annual'
    amount?: number
  }>({ isOpen: false })

  const handlePlan = (tier: string, amount: number) => {
    // For Founder Access Pass
    if (tier === 'founder-pass') {
      setPaymentModal({
        isOpen: true,
        tier,
        billingCycle: 'monthly',
        amount,
      })
    } else {
      // For other plans, show inquiry form or external link
      alert(`Contact us for ${tier} pricing: support@myfounders.club`)
    }
  }

  return (
    <section id="pricing" className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Plans & Access
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            Choose your entry point into the Gulf ecosystem.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? 'glass border-orange-500/50 bg-black/60 ring-1 ring-orange-500/20'
                    : 'glass border-teal-500/20 bg-black/50 hover:border-teal-500/40 hover:bg-black/60'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow-lg z-30"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Popular
                  </motion.div>
                )}

                {/* Plan name and price */}
                <h3 className="text-2xl font-light text-white mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 font-light">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-light text-white">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>}
                </div>

                {/* CTA button */}
                <motion.button
                  onClick={() => {
                    // Founder Access Pass = $25
                    if (plan.name === 'Founder Access Pass') {
                      handlePlan('founder-pass', 25)
                    } else {
                      handlePlan(plan.name.toLowerCase(), 0)
                    }
                  }}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-orange-500/50'
                      : 'glass glass-hover'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {/* Features list */}
                <div className="space-y-4">
                  {plan.features && plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + featureIndex * 0.05 }}
                    >
                      <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}

                  {plan.buckets && plan.buckets.map((bucket, bucketIndex) => (
                    <div key={bucketIndex} className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-3">{bucket.title}</h4>
                      <ul className="space-y-2">
                        {bucket.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow effect for popular */}
              {plan.popular && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 91, 35, 0.1)',
                      '0 0 40px rgba(255, 91, 35, 0.2)',
                      '0 0 20px rgba(255, 91, 35, 0.1)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false })}
        tier={paymentModal.tier || 'founder-pass'}
        billingCycle={paymentModal.billingCycle || 'monthly'}
        amount={paymentModal.amount || 25}
      />
    </section>
  )
}
