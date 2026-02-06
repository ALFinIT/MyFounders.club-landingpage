'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/logo'
import RoleBasedDashboard from '@/components/dashboard/RoleBasedDashboard'
import { Footer } from '@/components/sections/footer'
import SocialHomeButtons from '@/components/social-home-buttons'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, logout, deleteAccount } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-white mb-4">Redirecting to login...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <Logo />
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (confirm('Delete your account? This is irreversible.')) {
                    deleteAccount && deleteAccount()
                    router.push('/')
                  }
                }}
                className="px-4 py-2 bg-red-600/20 text-red-200 rounded-full font-light hover:bg-red-600/30 transition-all"
                title="Delete account"
              >
                Delete
              </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="glass rounded-2xl p-8">
            <h1 className="text-4xl font-light text-white mb-4">Welcome, {user.name}</h1>
            <p className="text-muted-foreground text-lg">
              You're now part of the My Founders Club community
            </p>
          </div>

          {/* User Info Card */}
          <motion.div
            className="glass rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-muted-foreground">Name:</span>
                <span className="text-white font-semibold">{user.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-white font-semibold">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">User ID:</span>
                <span className="text-white font-semibold text-sm">{user.id}</span>
              </div>
            </div>
          </motion.div>

          {/* Role-based dashboard rendering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Load profile and render founder/investor specific dashboard */}
            <RoleBasedDashboard userId={user.id} />
          </motion.div>
        </motion.div>
      </div>
      {/* Footer */}
      <Footer />

      {/* Social Home + Social Buttons (shared) */}
      <SocialHomeButtons />
    </div>
  )
}

