import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono, Montserrat, Cairo, Syne, DM_Sans } from 'next/font/google'
import 'flag-icons/css/flag-icons.min.css'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import './globals.css'
import { SmoothScrollProvider } from '@/providers/smooth-scroll'
import { MotionProvider } from '@/providers/motion-provider'
import { AuthProvider } from '@/context/auth-context'
import { ProfileProvider } from '@/context/profile-context'
import { GridGlow } from '@/components/grid-glow'
import GridBackground from '@/components/GridBackground'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '800', '900'], variable: '--font-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700', '800', '900'], variable: '--font-cairo' })
const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-syne' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://myfoundersclub.com'),
  title: 'MY FOUNDERS CLUB',
  description:
    "Build Locally. Champion Regionally. Scale Globally. The Gulf's ecosystem operating system connecting founders, capital, and opportunity globally.",
  generator: 'vite',
  openGraph: {
    title: 'MY FOUNDERS CLUB',
    description:
      "Build Locally. Champion Regionally. Scale Globally. The Gulf's ecosystem operating system connecting founders, capital, and opportunity globally.",
    images: [
      {
        url: '/Main Logo Icon.svg',
        width: 800,
        height: 600,
        alt: 'MY FOUNDERS CLUB Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MY FOUNDERS CLUB',
    description:
      "Build Locally. Champion Regionally. Scale Globally. The Gulf's ecosystem operating system connecting founders, capital, and opportunity globally.",
    images: ['/Main Logo Icon.svg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#050505',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
      <html lang="en" className={`${inter.variable} ${spaceMono.variable} ${montserrat.variable} ${syne.variable} ${dmSans.variable} dark scroll-smooth`}>
        <body className={`antialiased bg-background text-foreground [font-family:var(--font-dm-sans)]`} suppressHydrationWarning>
        <GridBackground />
        <GridGlow />
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ProfileProvider>
              <MotionProvider>
                <SmoothScrollProvider>
                  <div className="bg-page relative min-h-screen">
                    <div className="relative z-10 bg-transparent">{children}</div>
                  </div>
                </SmoothScrollProvider>
              </MotionProvider>
            </ProfileProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
