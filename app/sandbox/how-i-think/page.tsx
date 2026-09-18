'use client'

import { HowIThinkReel } from '@/components/sandbox/HowIThinkReel'
import { Navbar } from '@/components/layout/Navbar'

export default function HowIThinkSandboxPage() {
  return (
    <main className="site-shell bg-[#131316]">
      <Navbar />

      {/* Intro spacer to simulate scrolling into the section */}
      <section className="min-h-screen flex items-center justify-center bg-[#EEEAE2] text-[#1a1a1a] px-6 text-center">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/50 mb-4 font-mono">
            Sandbox Environment
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            "How I Think" Reel Sandbox
          </h1>
          <p className="text-lg text-[#1a1a1a]/70 font-mono">
            Scroll down into the dark #131316 section to preview the 3D statement roll animation and full-screen image zoom.
          </p>
        </div>
      </section>

      {/* How I Think Reel Section */}
      <HowIThinkReel />

      {/* Outro section to simulate section unpinning */}
      <section className="min-h-screen flex items-center justify-center bg-[#0F0F0E] text-[#EEEAE2] px-6 text-center">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Next Section Content</h2>
          <p className="text-sm opacity-60 font-mono">
            Normal vertical scrolling resumes here after the full-screen image reveal completes.
          </p>
        </div>
      </section>
    </main>
  )
}
