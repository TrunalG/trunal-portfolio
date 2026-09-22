'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function FooterReel() {
  const footerRef = useRef<HTMLElement | null>(null)
  const giantTextRef = useRef<HTMLDivElement | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')

  // Live IST / India Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST')
    }

    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

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
          scaleY: 0.18,
          opacity: 0.4,
          transformOrigin: 'bottom center',
        },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 85%',
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
      className="relative z-30 bg-[#0f0f0e] text-[#eeeae2] pt-20 md:pt-32 pb-8 px-6 md:px-16 lg:px-24 overflow-hidden flex flex-col justify-between min-h-screen"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Header Stack / Top Line */}
        <div className="flex justify-between items-center border-b border-white/15 pb-6 mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#77746d] font-semibold">
            GET IN TOUCH
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#cbbd8a] font-mono">
            {currentTime || 'INDIA / IST'}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
          {/* Left Column: Personalized Hook, Subheadline & Direct Interactive Email */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.1] text-white">
              Got a project in mind, an idea, or just want to chat?
            </h2>
            
            <p className="text-base md:text-lg text-[#eeeae2]/75 max-w-xl leading-relaxed font-normal">
              I’m always open to discussing new opportunities, creative product design, or full-stack development collaborations. Drop me a message and let’s turn your vision into something real.
            </p>

            {/* Interactive Email Link (Triggers default mail client with pre-filled address) */}
            <div className="pt-4">
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

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="flex justify-between items-center border-t border-white/10 pt-6 pb-4 text-xs text-[#77746d] uppercase tracking-[0.15em]">
          <span>© TRUNAL 2026</span>
          <a href="#top" className="hover:text-white transition-colors duration-200">
            BACK TO TOP ↑
          </a>
        </div>
      </div>

      {/* Bottom Giant Expanding Typography ("TRUNAL") */}
      <div className="w-full overflow-hidden pt-4 pointer-events-none select-none">
        <div
          ref={giantTextRef}
          className="w-full text-center leading-[0.75] font-black tracking-tight uppercase text-[#eeeae2] text-[20vw] sm:text-[21vw] md:text-[22vw] lg:text-[23vw] will-change-transform"
        >
          TRUNAL
        </div>
      </div>
    </footer>
  )
}
