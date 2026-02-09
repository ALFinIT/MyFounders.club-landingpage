import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero'
import { ProblemSection } from '@/components/sections/problem'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { FeaturesSection } from '@/components/sections/features'
import { SocialProofSection } from '@/components/sections/social-proof'
import { CommunityShowcase } from '@/components/sections/community-showcase'
import { WhatsAppCTASection } from '@/components/sections/whatsapp-cta'
import { StatsSection } from '@/components/sections/stats'
import { PricingSectionUpdated } from '@/components/sections/pricing-updated'
import { FOMOSection } from '@/components/sections/fomo'
import { ProgramAnnouncementSection } from '@/components/sections/program-announcement'
import { ApplicationFormSection } from '@/components/sections/application-form'
import { FAQSection } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
import SocialHomeButtons from '@/components/social-home-buttons'

export default function Home() {
  return (
    <>
      <Navbar />
      <SocialHomeButtons />
      <main className="w-full">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <SocialProofSection />
        <CommunityShowcase />
        <WhatsAppCTASection />
        <StatsSection />
        <PricingSectionUpdated />
        <FOMOSection />
        <ProgramAnnouncementSection />
        <ApplicationFormSection />
        <FAQSection />
        <Footer />
      </main>
    </>
  )
}
