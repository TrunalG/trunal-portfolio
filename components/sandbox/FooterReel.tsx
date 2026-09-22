'use client'

import React, { useRef, useEffect } from 'react'
import { The_Nautigal } from 'next/font/google'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const nautigalFont = The_Nautigal({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export function FooterReel() {
  const footerRef = useRef<HTMLElement | null>(null)
  const giantTextRef = useRef<HTMLDivElement | null>(null)

  // GSAP ScrollTrigger for vertical expansion of giant "TRUNAL" text
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const footerEl = footerRef.current
    const textEl = giantTextRef.current
    if (!footerEl || !textEl) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textEl,
        {
          scaleY: 0.15,
          opacity: 0.35,
          transformOrigin: 'bottom center',
        },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 75%',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        }
      )
    }, footerEl)

    return () => ctx.revert()
  }, [])

  const navLinks = [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Playground', href: '/#playground' },
    { label: 'Contact', href: '/#contact' },
  ]

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X / Twitter', href: 'https://x.com' },
  ]

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-30 bg-[#0f0f0e] text-[#eeeae2] pt-16 md:pt-24 lg:pt-32 pb-6 px-6 md:px-16 lg:px-24 overflow-hidden flex flex-col justify-between min-h-screen"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Main Content Grid starting cleanly without top thin border line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-12 md:mb-20">
          {/* Left Column: Overlapping Calligraphic Kicker + Headline + Interactive Email Link */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="relative pt-2">
              {/* Calligraphic Script Kicker Overlapping the Headline below */}
              <span
                style={{ fontFamily: "'The Nautigal', cursive, sans-serif" }}
                className={`font-signature-nautigal ${nautigalFont.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#cbbd8a] font-normal block -mb-4 sm:-mb-5 md:-mb-6 relative z-10 select-none tracking-normal leading-none pl-1`}
              >
                HAVE AN IDEA?
              </span>

              {/* Bold Section Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.96] uppercase text-white relative z-0">
                LET’S MAKE SOMETHING REAL.
              </h2>
            </div>

            {/* Direct Interactive Email Link (Triggers default mail client with pre-filled address) */}
            <div className="pt-2">
              <a
                href="mailto:dsgnclave@gmail.com"
                className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#eeeae2] hover:text-[#cbbd8a] transition-colors duration-300 relative"
              >
                <span className="relative">
                  dsgnclave@gmail.com
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#cbbd8a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Directory Navigation & Socials */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-12 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
            {/* Quick Directory */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#77746d] font-semibold block mb-4">
                Directory
              </span>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm md:text-base text-[#eeeae2]/80 hover:text-white transition-colors duration-200 block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect / Socials */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#77746d] font-semibold block mb-4">
                Socials
              </span>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-[#eeeae2]/80 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Expanding Typography ("TRUNAL") directly below content grid across an invisible baseline */}
      <div className="w-full overflow-hidden pt-2 pointer-events-none select-none">
        <div
          ref={giantTextRef}
          className="w-full text-center leading-[0.72] font-black tracking-tighter uppercase text-[#eeeae2] text-[21vw] sm:text-[22vw] md:text-[23vw] lg:text-[24vw] will-change-transform"
        >
          TRUNAL
        </div>
      </div>

      {/* Copyright Bar placed at the VERY BOTTOM underneath everything */}
      <div className="flex justify-between items-center border-t border-white/10 pt-4 text-xs text-[#77746d] uppercase tracking-[0.15em] max-w-7xl mx-auto w-full mt-4">
        <span>© TRUNAL 2026</span>
        <a href="#top" className="hover:text-white transition-colors duration-200">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  )
}
