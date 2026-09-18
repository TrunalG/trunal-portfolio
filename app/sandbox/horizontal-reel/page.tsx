'use client'

import React from 'react'
import { StackedWorkReel } from '@/components/sandbox/StackedWorkReel'

export default function HorizontalReelSandboxPage() {
  return (
    <main className="w-full bg-[#EEEAE2] text-[#1a1a1a] min-h-screen">
      {/* Intro Test Section above the Stacked Reel (matching #EEEAE2) */}
      <section className="w-full min-h-[80vh] flex flex-col justify-center items-center px-6 text-center border-b border-black/10 bg-[#EEEAE2]">
        <span className="text-xs uppercase tracking-widest text-black/50 mb-3">
          Sandbox Test Environment
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#1a1a1a]">
          Vertical Card Stacking Test
        </h1>
        <p className="max-w-xl text-base text-black/60">
          Scroll down vertically into the Selected Work section. The section will pin with the big title, then project cards will slide up from the bottom to stack over each other.
        </p>
        <div className="mt-8 flex items-center gap-2 text-xs text-black/50 animate-bounce">
          <span>Scroll down</span> ↓
        </div>
      </section>

      {/* Vertical Stacked Work Reel Component */}
      <StackedWorkReel />

      {/* Next Section below the Reel */}
      <section className="w-full min-h-[100vh] flex flex-col justify-center items-center px-6 text-center border-t border-black/10 bg-[#EEEAE2]">
        <span className="text-xs uppercase tracking-widest text-black/50 mb-3">
          Next Section
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-[#1a1a1a]">
          Normal Vertical Scroll Resumes
        </h2>
        <p className="max-w-lg text-base text-black/60">
          Once the final project card stacks over the previous ones, the section unpins seamlessly and vertical scrolling continues down the page.
        </p>
      </section>
    </main>
  )
}
