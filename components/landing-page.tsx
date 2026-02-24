'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import ChatWidget from '@/components/ChatWidget'

export default function LandingPage() {
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState('gulf')
  const [chatOpen, setChatOpen] = useState(false)

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      <LanguageSwitcher />

      {/* NAV - REDESIGNED WITH HOT ORANGE FRAME */}
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[95vw] max-w-7xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hot Orange Neon Frame */}
        <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-orange-500/50 
                        shadow-[0_0_20px_rgba(255,90,0,0.4),inset_0_0_20px_rgba(255,90,0,0.1)]
                        before:absolute before:inset-0 before:rounded-2xl 
                        before:bg-gradient-to-r before:from-orange-500 before:via-transparent before:to-orange-500
                        before:p-[1px] before:opacity-0 before:animate-pulse
                        after:absolute after:inset-0 after:rounded-2xl
                        after:bg-[linear-gradient(90deg,transparent,rgba(255,90,0,0.6),transparent)]
                        after:-z-10 after:blur-lg after:opacity-40">
          
          <div className="flex items-center justify-between px-8 py-4 relative z-10">
            
            {/* LEFT: LOGO */}
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
              <div className="grid place-items-center w-8 h-8">
                <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                  <path d="M14 4L24 10V18L14 24L4 18V10L14 4Z" fill="none" stroke="#FF5B23" strokeWidth="1.5"/>
                  <path d="M8 12L14 8L20 12" stroke="#FF5B23" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 16L14 20L20 16" stroke="#FF5B23" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M14 8V20" stroke="#FF5B23" strokeWidth="1" strokeDasharray="2 2"/>
                </svg>
              </div>
              <span className="hidden sm:inline font-syne font-bold text-white text-lg">MFC</span>
            </a>

            {/* CENTER: NAVIGATION LINKS */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <a href="#founders" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium">
                {t('nav.founders')}
              </a>
              <a href="#international" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium">
                {t('nav.international')}
              </a>
              <a href="#how" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium">
                {t('nav.how')}
              </a>
              <Link href="/survey" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium no-underline">
                Survey
              </Link>
            </div>

            {/* RIGHT: LANGUAGE TOGGLE + CTA BUTTON */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Language Toggle */}
              <div className="hidden md:flex items-center gap-1 border-l border-orange-500/30 pl-3">
                <button
                  onClick={() => router.push(`/${locale === 'ar' ? 'en' : 'ar'}`)}
                  className="px-2 py-1 rounded text-xs uppercase font-semibold transition-all"
                  style={{
                    backgroundColor: locale === 'ar' ? 'rgba(255, 90, 0, 0.2)' : 'transparent',
                    color: locale === 'ar' ? '#FF5B23' : '#9CA3AF',
                  }}
                >
                  عربي
                </button>
                <span className="text-white/20">/</span>
                <button
                  onClick={() => router.push(`/${locale === 'en' ? 'ar' : 'en'}`)}
                  className="px-2 py-1 rounded text-xs uppercase font-semibold transition-all"
                  style={{
                    backgroundColor: locale === 'en' ? 'rgba(255, 90, 0, 0.2)' : 'transparent',
                    color: locale === 'en' ? '#FF5B23' : '#9CA3AF',
                  }}
                >
                  EN
                </button>
              </div>

              {/* CTA Button */}
              <Link
                href="/auth?mode=signup"
                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,90,0,0.6)] transition-all no-underline flex-shrink-0"
              >
                Join Beta
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-[4vw] pb-6 pt-24 relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(rgba(255,91,35,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,91,35,0.04)_1px,transparent_1px)] bg-[60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,black_20%,transparent_100%)]"></div>
        <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-radial-[circle_at_center,rgba(255,91,35,0.18)_0%,transparent_70%] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            className="font-dm-sans text-orange-500 text-base font-medium uppercase tracking-wider mb-4"
            {...fadeInUp}
          >
            Welcome to the future of founders
          </motion.div>

          <motion.h1
            className="font-syne text-[4.5rem] md:text-[5.5rem] font-black leading-[1.1] mb-6 text-white"
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build in the Gulf.<br/>
            <span className="text-orange-500">Wired to the World.</span>
          </motion.h1>

          <motion.p
            className="font-dm-sans text-xl text-gray-400 max-w-[600px] leading-8 mb-10"
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            One platform. Every program, grant, free zone, accelerator, and investor across six GCC countries AI-powered, free for founders, built from inside the Gulf.
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap mb-20"
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="#beta" className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-8 py-4 hover:bg-orange-600 transition-all transform hover:scale-105 no-underline">
              Get Early Access — Free

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="#how" className="text-white text-base font-medium hover:text-orange-500 transition-colors no-underline">
              See how it works 
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline ml-2"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>

         <motion.div
  className="grid grid-cols-4 gap-12 items-center"
  variants={staggerContainer}
  initial="initial"
  animate="animate"
>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-6">
              <div className="font-syne text-4xl font-black text-orange-500 leading-none mb-2">63K+</div>
              <div className="font-dm-sans text-base text-gray-400 uppercase tracking-wider">GCC Startups</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-6">
              <div className="font-syne text-4xl font-black text-orange-500 leading-none mb-2">400+</div>
              <div className="font-dm-sans text-base text-gray-400 uppercase tracking-wider">Programs & Grants</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-6">
              <div className="font-syne text-4xl font-black text-orange-500 leading-none mb-2">$4.5B</div>
              <div className="font-dm-sans text-base text-gray-400 uppercase tracking-wider">Raised Q3 2025</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-6">
              <div className="font-syne text-4xl font-black text-orange-500 leading-none mb-2">6</div>
              <div className="font-dm-sans text-base text-gray-400 uppercase tracking-wider">Countries. One Platform.</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER STORY */}
<section className="py-12 lg:py-14 px-[4vw] bg-black border-t border-white/10 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >

      {/* LEFT SIDE */}
      <div>
        <motion.div
          className="font-dm-sans text-orange-500 text-sm font-medium uppercase tracking-wider mb-3"
          {...fadeInUp}
        >
          Why MFC Exists
        </motion.div>

        <motion.blockquote
          className="font-syne text-2xl md:text-3xl font-black leading-tight mb-6 text-white"
          {...fadeInUp}
          transition={{ delay: 0.1 }}
        >
          "I built and failed in the UK. I arrived in Riyadh in 2022 — and saw everything that was missing."
        </motion.blockquote>

        <motion.p
          className="font-dm-sans text-gray-400 text-lg leading-7 mb-6"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Laws changing weekly. No single source of truth. Founders arriving with genuine ambition but zero map. And almost no women in the room.
        </motion.p>

        <motion.p
          className="font-dm-sans text-gray-400 text-lg leading-7 mb-6"
          {...fadeInUp}
          transition={{ delay: 0.25 }}
        >
          After building ventures in the UK — including ones that failed — Katerina Hayes landed in Saudi Arabia and saw the gap clearly. Founders were stuck. International companies were lost. Everyone needed a trusted, verified, always-on intelligence layer for the Gulf.
        </motion.p>

        <motion.p
          className="font-dm-sans text-gray-400 text-lg leading-7 mb-8"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          MFC is the platform she wished existed. Not a directory. Not a matchmaker. The operating system for Gulf founders — free to use, impossible to replace.
        </motion.p>

        {/* FOUNDER SIGNATURE BLOCK */}
        <motion.div
          className="flex items-center gap-4"
          {...fadeInUp}
          transition={{ delay: 0.35 }}
        >
          <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center font-syne font-bold text-white text-lg rounded-full">
            KH
          </div>

          <div>
            <div className="font-syne font-bold text-white text-base">
              Katerina Hayes
            </div>
            <div className="font-dm-sans text-gray-400 text-xs">
              Founder & CEO, MyFounders.Club · Riyadh, Saudi Arabia
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE GRADIENT INTELLIGENCE CARD */}
      <motion.div
       className="relative mt-6 lg:mt-10"
        {...fadeInUp}
        transition={{ delay: 0.4 }}
      >

      {/* Floating Tags */}

    {/* Top Right */}
    <div className="absolute top-10 right-10 bg-black/80 border border-white/10 
    px-5 py-3 text-xs backdrop-blur-md rounded-lg
    animate-float transition-transform duration-300 hover:scale-105 hover:border-orange-500/50 cursor-pointer">
      <div className="text-orange-500 font-bold text-lg">80%</div>
      <div className="text-gray-400 text-[12px]">of Gulf founders build alone</div>
    </div>

    {/* Left Center */}
    <div className="absolute top-1/2 left-10 -translate-y-1/2 bg-black/80 border border-white/10 
    px-5 py-3 text-xs backdrop-blur-md rounded-lg
    animate-float-slow transition-transform duration-300 hover:scale-105 hover:border-orange-500/50 cursor-pointer">
      <div className="text-orange-500 font-bold text-lg">1</div>
      <div className="text-gray-400 text-[12px]">clear next step</div>
    </div>

    {/* Bottom Right */}
    <div className="absolute bottom-10 right-16 bg-black/80 border border-white/10 
    px-5 py-3 text-xs backdrop-blur-md rounded-lg
    animate-float transition-transform duration-300 hover:scale-105 hover:border-orange-500/50 cursor-pointer">
      <div className="text-orange-500 font-bold text-lg">Free</div>
      <div className="text-gray-400 text-[12px]">for every founder</div>
    </div>

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent 
border border-orange-500/20 h-[420px] lg:h-[480px] 
px-10 py-12 flex flex-col justify-between overflow-hidden rounded-xl">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,115,0,0.3),_transparent_60%)] opacity-40"></div>

          <div className="relative z-10">
            <div className="text-orange-500 text-[11px] tracking-widest uppercase mb-3">
              Founded in Riyadh, 2022
            </div>

            <div className="font-syne text-2xl font-bold text-white mb-3">
              MyFounders.Club
            </div>

            <p className="text-gray-300 text-base leading-6">
              The room that matters. Built in the Gulf. Wired to the world.
            </p>
          </div>

        </div>
      </motion.div>

    </motion.div>
  </div>
</section>

    {/* PROBLEMS */}
<section className="py-20 px-[4vw] bg-black border-t border-white/10 relative">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="mb-16">
      <div className="text-orange-500 text-xs tracking-[0.25em] uppercase mb-4">
        — The Problem We Solve
      </div>

      <h2 className="font-syne text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white max-w-3xl">
        The Gulf has the capital.
        <br />
        Founders just can’t find the door.
      </h2>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-white/10">

      {[
        {
          number: "01",
          title: "Fragmented Intelligence",
          desc: "400+ accelerators, grants, and programs across six countries — each with different rules and deadlines."
        },
        {
          number: "02",
          title: "Laws That Move Fast",
          desc: "Regulations evolve fast. Most founders act on outdated information."
        },
        {
          number: "03",
          title: "No Map for Entry",
          desc: "Startups struggle to choose the right free zone, jurisdiction, or banking partner."
        },
        {
          number: "04",
          title: "Wrong Rooms",
          desc: "Founders attend events and pitch investors that don’t match their stage."
        },
        {
          number: "05",
          title: "Isolation at Scale",
          desc: "80% of MENA founders report building alone."
        },
        {
          number: "06",
          title: "The Diversity Gap",
          desc: "Female-led startups raised just $17.6M in H1 2025."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="group relative p-6 md:p-7 border-r border-b border-white/10 
          hover:bg-orange-500/5 transition-all duration-300 overflow-hidden"
        >
          {/* Top Hover Line */}
          <div className="absolute top-0 left-0 h-[2px] w-0 bg-orange-500 
          group-hover:w-full transition-all duration-300"></div>

          {/* Number */}
          <div className="text-orange-500/40 text-2xl font-bold mb-4">
            {item.number}
          </div>

          {/* Title */}
          <h3 className="text-white text-base font-semibold mb-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>


      {/* AUDIENCE */}
<section className="py-28 px-[4vw] bg-black border-t border-white/10" id="audience">
  <div className="max-w-7xl mx-auto">

    {/* Section Label */}
    <div className="text-orange-500 text-xs tracking-[0.3em] uppercase mb-6">
      — Who MFC Is Built For
    </div>

    {/* Main Heading */}
    <h2 className="font-syne text-3xl md:text-5xl font-black leading-tight text-white mb-14 max-w-3xl">
      The right room for the right builder.
    </h2>

    {/* Tabs */}
    <div className="flex gap-8 border-b border-white/10 mb-16">
      {[
        { key: "gulf", label: "Gulf Founders" },
        { key: "intl", label: "International Startups" },
        { key: "investors", label: "Investors" }
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`pb-4 text-sm transition-all ${
            activeTab === tab.key
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* LEFT CONTENT */}
      <div>

        {/* Dynamic Headline */}
        <h3 className="font-syne text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
          {activeTab === "gulf" && (
            <>
              Local roots.<br />
              Regional scale.<br />
              Global ambition.
            </>
          )}
          {activeTab === "intl" && (
            <>
              Expanding to the Gulf?<br />
              Skip the two-year<br />
              cold start.
            </>
          )}
          {activeTab === "investors" && (
            <>
              Signal before noise.<br />
              See deals before<br />
              the market.
            </>
          )}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-8 max-w-xl">
          {activeTab === "gulf" &&
            "You're building something real in the Gulf. MFC helps you find the right program, investor, and network — without wasting cycles."}

          {activeTab === "intl" &&
            "Six countries. Multiple frameworks. MFC helps you enter as an insider — not a tourist."}

          {activeTab === "investors" &&
            "Access AI-scored deal flow from real builders — not just pitch decks."}
        </p>

        {/* Bullet Points */}
        <div className="space-y-4 text-sm">
          {activeTab === "gulf" && (
            <>
              <p className="text-gray-300">→ AI Next-Step Engine</p>
              <p className="text-gray-300">→ Grant & Program Matcher</p>
              <p className="text-gray-300">→ Investor Matching</p>
              <p className="text-gray-300">→ Curated Mastermind Groups</p>
              <p className="text-gray-300">→ Demo Day Access</p>
            </>
          )}

          {activeTab === "intl" && (
            <>
              <p className="text-gray-300">→ Gulf Entry Navigator</p>
              <p className="text-gray-300">→ Jurisdiction Matching</p>
              <p className="text-gray-300">→ Trusted Supplier Network</p>
              <p className="text-gray-300">→ Regulatory Intelligence</p>
              <p className="text-gray-300">→ Local Founder Community</p>
            </>
          )}

          {activeTab === "investors" && (
            <>
              <p className="text-gray-300">→ AI-Scored Deal Flow</p>
              <p className="text-gray-300">→ Private Deal Rooms</p>
              <p className="text-gray-300">→ Due Diligence Packs</p>
              <p className="text-gray-300">→ Gulf Startup Pulse</p>
              <p className="text-gray-300">→ Demo Day Priority Access</p>
            </>
          )}
        </div>
      </div>

      {/* RIGHT FEATURE CARDS */}
      <div className="space-y-6">

        {activeTab === "gulf" && (
          <>
            {["AI Next-Step Engine", "Grant & Program Matcher", "Investor Matching", "Global Expansion Corridors"].map((item, i) => (
              <div
                key={i}
                className="group border border-white/10 p-6 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/40"
              >
                <h4 className="text-white font-semibold mb-2">{item}</h4>
                <p className="text-gray-400 text-sm">
                  Clear, curated access aligned to your stage and ambition.
                </p>
              </div>
            ))}
          </>
        )}

        {activeTab === "intl" && (
          <>
            {["Gulf Entry Navigator", "Regulatory Intelligence", "Trusted Supplier Network", "Local Founder Community"].map((item, i) => (
              <div
                key={i}
                className="group border border-white/10 p-6 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/40"
              >
                <h4 className="text-white font-semibold mb-2">{item}</h4>
                <p className="text-gray-400 text-sm">
                  Enter the Gulf ecosystem with confidence and clarity.
                </p>
              </div>
            ))}
          </>
        )}

        {activeTab === "investors" && (
          <>
            {["AI-Scored Deal Flow", "Private Deal Rooms", "Due Diligence Packs", "Gulf Startup Pulse"].map((item, i) => (
              <div
                key={i}
                className="group border border-white/10 p-6 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/40"
              >
                <h4 className="text-white font-semibold mb-2">{item}</h4>
                <p className="text-gray-400 text-sm">
                  Curated visibility into the Gulf's most promising founders.
                </p>
              </div>
            ))}
          </>
        )}

      </div>

    </div>
  </div>
</section>


{/* HOW IT WORKS */}

<section className="py-28 px-[4vw] bg-black border-t border-white/10" id="how">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 text-orange-500 text-sm uppercase tracking-[0.2em] mb-6">
        <span className="w-8 h-[1px] bg-orange-500"></span>
        How it works
      </div>

      <h2 className="text-[3rem] md:text-[4.5rem] font-black leading-[1.05] text-white max-w-4xl">
        One platform.<br />
        One clear next step.
      </h2>
    </motion.div>

    {/* Steps Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {[
        {
          step: 'STEP 01',
          title: 'Build Your Profile',
          desc: '5 questions. Stage, sector, geography, funding status, and goal. Under two minutes. Instantly useful.'
        },
        {
          step: 'STEP 02',
          title: 'Get Your Next Step',
          desc: 'The AI engine scans every GCC program, grant, investor, and free zone — and gives you one clear recommendation.'
        },
        {
          step: 'STEP 03',
          title: 'Connect & Apply',
          desc: 'Match with the right accelerator, apply to the right grant, get a warm introduction to the right investor — all inside the platform.'
        },
        {
          step: 'STEP 04',
          title: 'Scale With the Room',
          desc: 'Join masterminds, attend events, go on ecosystem trips. Your next step updates automatically as your milestones evolve.'
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className="group p-8 bg-white/5 border border-white/10 
                     hover:bg-orange-500/10 transition-all duration-300 rounded-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-widest text-orange-500 font-semibold">
              {item.step}
            </span>

            <span className="text-white/40 text-sm transition-colors duration-300 group-hover:text-orange-500">
              →
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">
            {item.title}
          </h3>

          <p className="text-gray-400 text-sm leading-6">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

      {/* BETA FORM */}
<section className="py-28 px-[4vw] bg-black border-t border-white/10 relative" id="beta">
  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 border border-orange-500/40 text-orange-500 
                      text-xs uppercase tracking-widest px-5 py-2 rounded-full mb-8">
        • Now accepting beta applications
      </div>

      <h2 className="text-[3rem] md:text-[4.5rem] font-black leading-[1.05] text-white mb-6">
        Get early access.<br />
        Build with us.
      </h2>

      <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
        We're opening the platform to a first cohort of Gulf founders and
        international companies expanding to the Gulf. Free. No credit card. Just signal.
      </p>
    </motion.div>

    {/* Form */}
    <motion.form
      className="space-y-6 border border-white/10 p-10 md:p-14 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >

      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-400">First Name</label>
          <input
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                       focus:border-orange-500 outline-none transition-colors"
            type="text"
            placeholder="Katerina"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-400">Last Name</label>
          <input
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                       focus:border-orange-500 outline-none transition-colors"
            type="text"
            placeholder="Hayes"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-gray-400">Email Address</label>
        <input
          className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                     focus:border-orange-500 outline-none transition-colors"
          type="email"
          placeholder="you@company.com"
          required
        />
      </div>

      {/* Company + Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-400">Company / Startup Name</label>
          <input
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                       focus:border-orange-500 outline-none transition-colors"
            type="text"
            placeholder="Your startup"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gray-400">Based In</label>
          <select
            className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                       focus:border-orange-500 outline-none transition-colors cursor-pointer"
          >
            <option value="" disabled selected>Select your country</option>
            <option>UAE</option>
            <option>Saudi Arabia</option>
            <option>Qatar</option>
            <option>Kuwait</option>
            <option>Bahrain</option>
            <option>Oman</option>
            <option>UK</option>
            <option>USA</option>
            <option>India</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Stage */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-gray-400">Startup Stage</label>
        <select
          className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                     focus:border-orange-500 outline-none transition-colors cursor-pointer"
        >
          <option value="" disabled selected>Select your stage</option>
          <option>Pre-idea</option>
          <option>Idea Stage</option>
          <option>MVP / Prototype</option>
          <option>Early Revenue</option>
          <option>Growth Stage</option>
        </select>
      </div>

      {/* Challenge */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-gray-400">
          What's your biggest challenge right now? (Optional)
        </label>
        <textarea
          rows={4}
          className="w-full bg-transparent border border-white/10 text-white px-4 py-3 
                     focus:border-orange-500 outline-none transition-colors resize-none"
          placeholder="e.g. Finding the right free zone, connecting with Saudi investors..."
        />
      </div>

      {/* CTA */}
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white 
                   font-semibold uppercase tracking-wider py-4 transition-colors"
      >
        Join the Beta — Free Access
      </button>

      <p className="text-center text-xs text-gray-500 pt-4">
        By submitting you agree to our{' '}
        <Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors no-underline">
          Privacy Policy
        </Link>
        {' '}and{' '}
        <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors no-underline">
          Terms & Conditions
        </Link>
        .
      </p>

    </motion.form>
  </div>
</section>

      {/* NEWSLETTER */}
      <section className="py-20 px-[4vw] bg-gradient-to-r from-teal-900/20 to-teal-800/20 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-orange-500 text-sm font-medium uppercase tracking-wider mb-2">Weekly newsletter</div>
              <h3 className="text-2xl font-bold text-white leading-tight mb-3">The Gulf Pulse</h3>
              <p className="text-gray-400 text-sm">Weekly insights on regional startups, capital movements, and founder stories. Every Tuesday.</p>
            </div>
            <form className="flex gap-3">
              <input
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 focus:border-orange-500 focus:bg-white/15 outline-none transition-colors"
                type="email"
                placeholder="Enter your email"
                required
              />
              <button
                className="bg-orange-500 text-white font-semibold uppercase tracking-wider px-8 py-3 hover:bg-orange-600 transition-colors whitespace-nowrap"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-16 px-[4vw]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <a className="inline-flex items-center gap-3 font-bold text-lg text-white mb-6 no-underline" href="#">
                <div className="grid place-items-center w-7 h-7">
                  <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                    <path d="M14 4L24 10V18L14 24L4 18V10L14 4Z" fill="none" stroke="#FF5B23" strokeWidth="1.5"/>
                    <path d="M8 12L14 8L20 12" stroke="#FF5B23" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 16L14 20L20 16" stroke="#FF5B23" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                MyFounders.Club
              </a>
              <p className="text-gray-500 text-sm leading-6 mb-6">The Gulf's ecosystem operating system connecting founders, capital, and opportunity.</p>
              <div className="flex gap-3">
                <a className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors text-sm" href="https://linkedin.com" target="_blank" rel="noopener">
                  in
                </a>
                <a className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors" href="https://instagram.com" target="_blank" rel="noopener">
                  📷
                </a>
                <a className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors" href="https://x.com" target="_blank" rel="noopener">
                  𝕏
                </a>
                <a className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors" href="https://youtube.com" target="_blank" rel="noopener">
                  ▶️
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-white font-bold mb-6">Platform</div>
              <ul className="space-y-3">
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#features">For Founders</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#investors">For Investors</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#programs">Programs</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#community">Community</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-white font-bold mb-6">Company</div>
              <ul className="space-y-3">
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#about">About</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#blog">Blog</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#careers">Careers</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#contact">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-white font-bold mb-6">Legal</div>
              <ul className="space-y-3">
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="/privacy">Privacy Policy</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="/terms">Terms of Service</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-sm" href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </motion.div>

          <div className="flex items-center justify-between flex-wrap gap-4 border-t border-white/10 pt-8">
            <p className="text-gray-600 text-sm">© 2026 MyFounders.Club. All rights reserved.</p>
            <div className="flex gap-6 flex-wrap">
              <a className="text-gray-600 hover:text-orange-500 transition-colors text-sm" href="/privacy">Privacy</a>
              <a className="text-gray-600 hover:text-orange-500 transition-colors text-sm" href="/terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT WIDGET */}
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* FLOATING CHAT BUTTON */}
      <motion.button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {chatOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </motion.button>
    </>
  )
}