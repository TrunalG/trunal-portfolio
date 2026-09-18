'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const capabilitiesData = [
  {
    group: 'DESIGN',
    items: ['PRODUCT DESIGN', 'UX / UI', 'DESIGN SYSTEMS'],
  },
  {
    group: 'BUILD',
    items: ['WEB DEVELOPMENT', 'FULL-STACK DEVELOPMENT', 'WEB APPLICATIONS'],
  },
  {
    group: 'PRODUCT',
    items: ['SAAS', 'DASHBOARDS', 'MVP DEVELOPMENT'],
  },
]

export function WhatIWorkOnReel() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const ctx = gsap.context(() => {
      // Header Entrance Animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 80%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="what-i-work-on-section bg-[#eeeae2] text-[#171715] min-h-screen py-20 px-6 md:px-16 relative z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Kicker Line */}
        <div className="border-t border-[#171715]/15 pt-4 mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#77746d] uppercase block">
            WHAT I WORK ON
          </span>
        </div>

        {/* Section Header Row */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between pb-12 mb-16 border-b border-[#171715]/15 gap-6">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#171715] margin-0">
            What I work <em className="font-serif italic font-normal text-[#171715]">on</em>
          </h2>
          <p className="max-w-xs text-sm md:text-base text-[#77746d] leading-relaxed mb-1">
            Thinking, making, and shipping without a handoff.
          </p>
        </div>

        {/* Main Website Capabilities List */}
        <div className="space-y-16">
          {capabilitiesData.map((cap, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-[#171715]/15 first:border-t-0"
            >
              {/* Group Category Tag */}
              <div className="md:col-span-3">
                <span className="text-xs font-bold tracking-widest text-[#92745d] uppercase block">
                  {cap.group}
                </span>
              </div>

              {/* Items List */}
              <div className="md:col-span-8 space-y-4">
                {cap.items.map((item, iIdx) => (
                  <h3
                    key={iIdx}
                    className="text-3xl md:text-6xl font-bold tracking-tight text-[#171715] hover:text-[#92745d] transition-colors cursor-pointer"
                  >
                    {item}
                  </h3>
                ))}
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-end items-start pt-2">
                <span className="w-10 h-10 rounded-full border border-[#171715]/20 flex items-center justify-center text-lg text-[#171715] hover:bg-[#171715] hover:text-[#eeeae2] transition-all">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
