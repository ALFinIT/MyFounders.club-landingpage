'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { scrollRevealConfig } from '@/lib/animation-variants'

const faqs = [
  {
    question: 'Is acceptance into the shortlist guaranteed?',
    answer: "No. We're selective by design. We receive more applications than we can accommodate, and we carefully vet each founder. However, if you meet our core criteria (founder-led, traction, coachable), your chances are strong.",
  },
  {
    question: 'What happens after I apply?',
    answer: "We review your application within 3-5 business days. If you're a fit, one of our team members will reach out to schedule a brief call. We'll discuss your goals, answer questions, and either welcome you to the shortlist or provide feedback.",
  },
  {
    question: 'Who should not apply?',
    answer: "If you're in the ideation phase, looking only for validation, not ready to commit 12+ months, or just seeking a discount this isn't for you. We prioritize founders who are execution driven.",
  },
  {
    question: 'Is the AED 500 commitment fee refundable?',
    answer: "Yes, it's fully refundable if you're not accepted. This isn't a payment it's a signal of serious intent. If you don't make the shortlist, you get your money back.",
  },
  {
    question: 'Can I apply if I\'m outside the Gulf?',
    answer: "Short answer: Yes. We're Gulf-based, globally open. If you're building for the Gulf market or expanding regionally, we support you.",
  },
  {
    question: 'How long is my access valid?',
    answer: 'Founder Access Pass (WhatsApp) is month to month with no lock in contract. Scale and Enterprise plans are project based and customized to your needs.',
  },
  {
    question: 'Do you offer money back guarantees?',
    answer: "We don't promise outcomes, but we do promise transparency. If we're not delivering value within the first 30 days, we'll refund 100% of your fee.",
  },
  {
    question: 'How is this different from other founder communities?',
    answer: "We're not a large, open community. We're a curated shortlist designed for signal not noise. Every member is vetted. Your network here is smaller, higher quality, and more actionable.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Questions?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/85 font-light drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            Get clarity before joining.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-orange-500/20 overflow-hidden"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              viewport={scrollRevealConfig}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-sm sm:text-base lg:text-lg font-medium text-white drop-shadow-lg" style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-white/70" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-white/85 leading-relaxed font-light drop-shadow-lg" style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/85 mb-4 font-light">Still have questions?</p>
          <a href="mailto:hello@myfounderclub.com" className="text-orange-400 hover:text-orange-300 font-medium transition">
            Get in touch with our team
          </a>
        </motion.div>
      </div>
    </section>
  )
}
