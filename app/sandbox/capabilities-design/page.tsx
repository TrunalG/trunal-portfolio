'use client'

import React from 'react'
import { CapabilitiesDesignReel } from '@/components/sandbox/CapabilitiesDesignReel'

export default function CapabilitiesDesignSandboxPage() {
  return (
    <main className="min-h-screen bg-[#eeeae2] text-[#171715] relative">
      {/* Sandbox Header Bar */}
      <div className="fixed top-4 right-4 z-50 bg-[#171715]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-[#eeeae2]">
        Sandbox: Capabilities UI Design
      </div>

      <CapabilitiesDesignReel />
    </main>
  )
}
