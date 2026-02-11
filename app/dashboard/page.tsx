'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/logo'
import RoleBasedDashboard from '@/components/dashboard/RoleBasedDashboard'
import { Footer } from '@/components/sections/footer'
import SocialHomeButtons from '@/components/social-home-buttons'
import { useRouter } from 'next/navigation'
import { LogOut, Trash2, Edit3, User, Mail, Lock, Home, Zap } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const { user, logout, deleteAccount } = useAuth()
  const router = useRouter()
  const [isEditingProfile, setIsEditingProfile] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Hero Background Elements - MFC Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-orange-500/20 bg-black/40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/')}
          >
            <Logo />
            <div className="h-6 sm:h-8 w-px bg-orange-500/30 hidden sm:block" />
            <div className="text-xs sm:text-sm hidden sm:block">
              <p className="text-orange-400 font-semibold">User Dashboard</p>
              <p className="text-white/60 text-xs">My Founders Club</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <motion.button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-white/10 rounded-lg transition-all text-white hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Go to home"
            >
              <Home size={18} />
            </motion.button>
            <motion.button
              onClick={() => {
                if (confirm('Delete your account? This action is permanent.')) {
                  deleteAccount?.()
                  router.push('/')
                }
              }}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg transition-all text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Delete account"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Welcome Hero Section */}
          <motion.div
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-orange-500/30 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 sm:p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] border-t border-white/10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 break-words">
                  Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{user.name}</span>
                </h1>
                <p className="text-orange-300/80 text-sm sm:text-base md:text-lg font-light">
                  You're now part of the My Founders Club community
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Account Information */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="group relative rounded-2xl overflow-hidden border border-orange-500/30 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
                      <div className="p-2 sm:p-3 rounded-lg bg-orange-500/20 border border-orange-500/50">
                        <User size={18} className="sm:size-5" />
                      </div>
                      <span className="text-orange-400">Account Info</span>
                    </h2>
                    <motion.button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="p-2 hover:bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-400 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Edit profile"
                    >
                      <Edit3 size={18} />
                    </motion.button>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Name */}
                    <motion.div
                      className="group/item p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">Full Name</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white break-words">{user.name}</p>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      className="group/item p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Mail size={14} className="sm:size-4 text-orange-400" />
                        <p className="text-white/50 text-xs font-medium uppercase tracking-wide">Email</p>
                      </div>
                      <p className="text-white font-medium text-xs sm:text-sm md:text-base break-all">{user.email}</p>
                    </motion.div>

                    {/* User ID */}
                    <motion.div
                      className="group/item p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">User ID</p>
                      <p className="text-xs font-mono text-orange-400 break-all">{user.id}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Status Panel */}
            <motion.div
              className="space-y-3 sm:space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Status Card */}
              <div className="group relative rounded-2xl overflow-hidden border border-orange-500/30 backdrop-blur-xl p-6 bg-gradient-to-br from-white/5 to-white/[0.02] h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/30 to-orange-600/20 border border-orange-500/50">
                    <p className="text-orange-300/70 text-xs md:text-sm font-medium uppercase tracking-wide">Account Status</p>
                    <div className="flex items-center gap-2 mt-2">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-lg md:text-xl font-bold text-orange-400">Active</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all">
                    <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-wide">Member Since</p>
                    <p className="text-lg md:text-xl font-semibold text-white mt-2">2026</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all flex items-center gap-2">
                    <Zap size={18} className="text-orange-400" />
                    <div>
                      <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-wide">Status</p>
                      <p className="text-white font-semibold">Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile/Investor Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <RoleBasedDashboard userId={user.id} />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Social Buttons */}
      <SocialHomeButtons />
    </div>
  )
}
