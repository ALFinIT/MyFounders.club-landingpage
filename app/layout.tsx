import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono, Montserrat } from 'next/font/google'

import './globals.css'
import { SmoothScrollProvider } from '@/providers/smooth-scroll'
import { AuthProvider } from '@/context/auth-context'
import { ProfileProvider } from '@/context/profile-context'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '800', '900'], variable: '--font-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'My Founders Club - Build Locally. Champion Regionally. Scale Globally.',
  description: 'Platform connecting founders, capital, and opportunity across the Gulf startup ecosystem.',
  generator: 'vite',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className={`${inter.variable} ${spaceMono.variable} ${montserrat.variable} dark scroll-smooth`}>
        <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <AuthProvider>
          <ProfileProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
