import React from 'react'
import { AboutMeReel } from '@/components/sandbox/AboutMeReel'
import { Navbar } from '@/components/layout/Navbar'

export default function AboutMeSandboxPage() {
  return (
    <main className="min-h-screen bg-[#eeeae2]">
      <Navbar />
      <div className="pt-24">
        <AboutMeReel />
      </div>
    </main>
  )
}
