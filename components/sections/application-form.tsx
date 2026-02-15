'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

export function ApplicationFormSection() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    onePitchSentence: '',
    proofOfWork: '',
    commitmentAmount: 'AED 500',
    agreeCommitment: false,
    agreeTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Check if user is authenticated
    if (!user) {
      setStatusMessage('Please log in to submit your application')
      setStatusType('error')
      // Redirect to auth page with return URL
      setTimeout(() => {
        router.push(`/auth?returnUrl=${encodeURIComponent(window.location.pathname + '#application')}`)
      }, 1000)
      return
    }

    if (!formData.agreeCommitment) {
      setStatusMessage('Please agree to the commitment fee terms')
      setStatusType('error')
      return
    }

    if (!formData.agreeTerms) {
      setStatusMessage('Please accept the Terms and Conditions')
      setStatusType('error')
      return
    }
    // Optimistic UI: show immediate feedback to reduce perceived latency
    setSubmitted(true)
    setIsLoading(true)
    setStatusMessage('Submitting...')
    setStatusType('info')

    // Use fetch with keepalive where possible to avoid blocking on navigation
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        keepalive: true,
      })

      // Try to parse JSON only if response has content-type
      let data: any = {}
      try {
        data = await res.json()
      } catch (e) {
        // ignore parse errors
      }

      if (!res.ok) {
        // rollback optimistic state on error
        setSubmitted(false)
        if (res.status === 409) {
          setStatusMessage(data.error || 'Application already submitted with this email or phone')
          setStatusType('error')
        } else {
          setStatusMessage(data.error || 'Failed to submit application')
          setStatusType('error')
        }
        setIsLoading(false)
        return
      }

      // Success: keep submitted state and show success message
      setStatusMessage('✓ Application submitted successfully!')
      setStatusType('success')

      // Reset form fields (without removing submitted indicator immediately)
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        onePitchSentence: '',
        proofOfWork: '',
        commitmentAmount: 'AED 500',
        agreeCommitment: false,
        agreeTerms: false,
      })

      // Clear messages after a short moment but keep 'submitted' briefly to show confirmation
      setTimeout(() => {
        setSubmitted(false)
        setStatusMessage('')
      }, 2500)
    } catch (err) {
      console.error('Application submit error:', err)
      setSubmitted(false)
      setStatusMessage('Network error submitting application. Please try again.')
      setStatusType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)' }}>
            Secure Your Spot
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            The shortlist closes when it's full.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 lg:p-12 rounded-2xl glass border border-orange-500/20 space-y-5 sm:space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-500/20 text-white placeholder-muted-foreground focus:border-orange-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Your name"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-500/20 text-white placeholder-muted-foreground focus:border-orange-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Your company"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-500/20 text-white placeholder-muted-foreground focus:border-orange-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-500/20 text-white placeholder-muted-foreground focus:border-orange-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="+971 XX XXX XXXX"
            />
          </div>

          {/* One-sentence pitch */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">What does your company do? (One sentence) *</label>
            <textarea
              name="onePitchSentence"
              value={formData.onePitchSentence}
              onChange={handleChange}
              required
              disabled={isLoading}
              rows={2}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-500/20 text-white placeholder-muted-foreground focus:border-orange-500 focus:outline-none transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Be clear and concise..."
            />
          </div>

          {/* Proof of Work */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Proof of Work
              <span className="text-xs text-muted-foreground font-light ml-1">(Optional but recommended)</span>
            </label>
            <input
              type="url"
              name="proofOfWork"
              value={formData.proofOfWork}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-orange-500/20 text-white placeholder-muted-foreground focus:border-orange-500 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Link to website, product, or news"
            />
          </div>

          {/* Commitment amount info */}
          <motion.div
            className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-white font-medium mb-1">Commitment Fee: AED 500</p>
                <p className="text-muted-foreground text-xs font-light">
                  Refundable—shows serious intent. You'll be refunded if not accepted into the shortlist.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Agreement checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeCommitment"
              checked={formData.agreeCommitment}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-5 h-5 mt-1 rounded border-white/20 bg-white/10 accent-orange-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-sm text-muted-foreground font-light">
              I understand and agree to the AED 500 commitment fee (refundable if not accepted).
            </span>
          </label>

          {/* Terms and Conditions checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-5 h-5 mt-1 rounded border-white/20 bg-white/10 accent-orange-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-sm text-muted-foreground font-light">
              I accept the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors no-underline">Terms and Conditions</a>.
            </span>
          </label>

          {/* Status message */}
          {statusMessage && (
            <motion.div
              className={`p-3 rounded-lg flex items-start gap-3 ${
                statusType === 'error'
                  ? 'bg-red-500/10 border border-red-500/30'
                  : statusType === 'success'
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-blue-500/10 border border-blue-500/30'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {statusType === 'error' ? (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              ) : statusType === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm font-medium ${
                  statusType === 'error'
                    ? 'text-red-300'
                    : statusType === 'success'
                      ? 'text-green-300'
                      : 'text-blue-300'
                }`}
              >
                {statusMessage}
              </p>
            </motion.div>
          )}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading || submitted}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Submitting...
              </>
            ) : submitted ? (
              'Application Submitted!'
            ) : (
              'Join the Shortlist'
            )}
          </motion.button>

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground text-center font-light">
            Your data is secure and will not be shared. We respect your privacy.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
