import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero'
import { ProblemSection } from '@/components/sections/problem'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { FeaturesSection } from '@/components/sections/features'
import { SocialProofSection } from '@/components/sections/social-proof'
import { PricingSectionUpdated } from '@/components/sections/pricing-updated'
import { JoinCommunitySection } from '@/components/sections/join-community'
import { CommunityShowcase } from '@/components/sections/community-showcase'
import { WhatsAppCTASection } from '@/components/sections/whatsapp-cta'
import { ApplicationFormSection } from '@/components/sections/application-form'
import { FAQSection } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
import { FinalCTASection } from '@/components/sections/final-cta'
import { WhosInTheRoomSection } from '@/components/sections/whos-in-the-room'
import { GCCCountriesSection } from '@/components/sections/gcc-countries'
import { WhyJoinSection } from '@/components/sections/why-join'
import SocialHomeButtons from '@/components/social-home-buttons'

export default function Home() {
  return (
    <>
      <Navbar />
      <SocialHomeButtons />
      <main className="w-full">
        <HeroSection />
        <GCCCountriesSection />
        <JoinCommunitySection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WhyJoinSection />
        <WhosInTheRoomSection />
        <CommunityShowcase />
        <WhatsAppCTASection />
        <SocialProofSection />
        <PricingSectionUpdated />
        <ApplicationFormSection />
        <FAQSection />
        {/* <FinalCTASection /> */}
        <Footer />
      </main>
    </>
  )
}
