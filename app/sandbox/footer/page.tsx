import React from 'react'
import { FooterReel } from '@/components/sandbox/FooterReel'
import { Navbar } from '@/components/layout/Navbar'

export default function FooterSandboxPage() {
  return (
    <main className="min-h-screen bg-[#eeeae2]">
      <Navbar variant="dark" />
      <div className="pt-24 min-h-[70vh] flex flex-col justify-end">
        <div className="px-6 md:px-16 py-12 text-center text-[#171715]/60 font-mono text-xs uppercase tracking-wider">
          ↓ Scroll down to preview the Footer & Inline TRUNAL Scroll Expansion ↓
        </div>
      </div>
      <FooterReel />
    </main>
  )
}

