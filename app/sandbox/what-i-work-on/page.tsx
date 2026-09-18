'use client'

import React from 'react'
import { HowIThinkReel } from '@/components/sandbox/HowIThinkReel'
import { CapabilitiesDesignReel } from '@/components/sandbox/CapabilitiesDesignReel'

export default function WhatIWorkOnSandboxPage() {
  return (
    <main className="min-h-screen bg-[#131316] text-[#EEEAE2] relative overflow-x-clip">
      {/* Sandbox Header Bar */}
      <div className="fixed top-4 right-4 z-50 bg-[#171715]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-[#eeeae2]">
        Sandbox: What I Work On
      </div>

      {/* How I Think -> What I Work On Card Stack Wrapper */}
      <div className="sticky-thinking-wrapper relative w-full h-[calc(200vh+2400px)]">
        <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
          <HowIThinkReel />
        </div>
      </div>

      {/* What I Work On Stack Wrapper (z-index: 30, slides UP over How I Think) */}
      <div className="what-i-work-on-wrapper relative z-30 bg-[#eeeae2] min-h-screen -mt-[100vh] shadow-2xl">
        <CapabilitiesDesignReel />
      </div>
    </main>
  )
}
