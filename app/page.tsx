'use client'

import React, { useRef } from 'react'
import { Hero } from '@/components/Hero'
import { PageLoader } from '@/components/layout/PageLoader'
import { StickyIntro } from '@/components/StickyIntro'
import { WorkSection } from '@/components/sections/WorkSection'
import { ThinkingSection } from '@/components/sections/ThinkingSection'
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CurrentlySection } from '@/components/sections/CurrentlySection'
import { ArchiveSection } from '@/components/sections/ArchiveSection'
import { PlaygroundSection } from '@/components/sections/PlaygroundSection'
import dynamic from 'next/dynamic'

const FooterReel = dynamic(
  () => import('@/components/sandbox/FooterReel').then((mod) => mod.FooterReel),
  { ssr: false }
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
        {/*
        <CurrentlySection />
        <ArchiveSection />
        <PlaygroundSection />
        */}
        <FooterReel />
      </div>
    </main>
  )
}

