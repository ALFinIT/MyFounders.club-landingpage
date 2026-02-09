'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

export default function SocialHomeButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 hover:bg-white/10 transition-all">
        <Link href="/">
          <motion.button
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Back to Home"
          >
            <Home size={18} />
          </motion.button>
        </Link>

        <motion.a
          href="https://twitter.com/my_founders_club"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="Follow us on X"
        >
          <Twitter size={18} />
        </motion.a>

        <motion.a
          href="https://linkedin.com/company/my-founders-club"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="Connect on LinkedIn"
        >
          <Linkedin size={18} />
        </motion.a>

        <motion.a
          href="https://instagram.com/my_founders_club"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="Instagram"
        >
          <Instagram size={18} />
        </motion.a>

        <motion.a
          href="https://www.youtube.com/@myfoundersclub.global"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="YouTube"
        >
          <Youtube size={18} />
        </motion.a>
      </div>
    </div>
  )
}
