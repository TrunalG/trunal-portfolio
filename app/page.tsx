import React from 'react'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/Hero'
import { PageLoader } from '@/components/layout/PageLoader'
import { StickyIntro } from '@/components/StickyIntro'
import { WorkSection } from '@/components/sections/WorkSection'

// Dynamically split below-the-fold sections into separate lightweight JS chunks
const ThinkingSection = dynamic(
  () => import('@/components/sections/ThinkingSection').then((mod) => mod.ThinkingSection),
  { ssr: true }
)

const CapabilitiesSection = dynamic(
  () => import('@/components/sections/CapabilitiesSection').then((mod) => mod.CapabilitiesSection),
  { ssr: true }
)

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((mod) => mod.AboutSection),
  { ssr: true }
)

const FooterReel = dynamic(
  () => import('@/components/sections/FooterReel').then((mod) => mod.FooterReel),
  { ssr: true }
)

export default function Page() {
  return (
    <main className="site-shell">
      <PageLoader />
      <Hero />

      <div className="main-content-relative">
        <StickyIntro />
        
        <WorkSection />

        {/* How I Think -> What I Work On Card Stack Wrapper */}
        <div className="sticky-thinking-wrapper relative w-full h-[calc(200vh+2400px)]">
          <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
            <ThinkingSection />
          </div>
        </div>

        {/* CapabilitiesSection ("What I work on", z-index: 30, slides UP over How I Think) */}
        <div className="what-i-work-on-wrapper relative z-30 bg-[#eeeae2] min-h-screen -mt-[100vh] shadow-2xl">
          <CapabilitiesSection className="capabilities section-pad bg-[#eeeae2]" />
        </div>

        <AboutSection />
        <FooterReel />
      </div>
    </main>
  )
}
