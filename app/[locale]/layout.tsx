import React from "react"
import type { Metadata } from 'next'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import { SmoothScrollProvider } from '@/providers/smooth-scroll'
import { MotionProvider } from '@/providers/motion-provider'
import { AuthProvider } from '@/context/auth-context'
import { ProfileProvider } from '@/context/profile-context'

export const metadata: Metadata = {
  title: 'MY FOUNDERS CLUB',
  description:
    "Build Locally. Champion Regionally. Scale Globally. The Gulf's ecosystem operating system connecting founders, capital, and opportunity globally.",
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
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
  )
}
