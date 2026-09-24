'use client'

import React from 'react'
import { SectionKicker } from '@/components/SectionKicker'

export function FooterReel() {
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
      id="contact"
      className="relative z-30 bg-[#0f0f0e] text-[#eeeae2] pt-20 md:pt-28 pb-12 px-6 md:px-16 lg:px-24 flex flex-col justify-between min-h-screen"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Top Header / Kicker */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-12 md:mb-16">
          <SectionKicker title="Contact" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#77746d] font-mono">
            Have a good one.
          </span>
        </div>

        {/* Descending Typographic Headline Stack */}
        <div className="mb-12 md:mb-16 select-none">
          {/* Line 1: Have something (Large bold display sans-serif) */}
          <h2 className="text-[clamp(52px,9vw,140px)] font-extrabold leading-[0.85] tracking-tight uppercase text-white block">
            Have something
          </h2>

          {/* Line 2 (Red Box): worth building? (Italic serif Playfair Display font, scaled slightly smaller) */}
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[clamp(42px,7.5vw,112px)] font-normal italic leading-[0.92] text-[#eeeae2] block mt-2 sm:mt-3 md:mt-4"
          >
            worth building?
          </span>
        </div>

        {/* Content Row: Subheadline + Email CTA (Left) & Right-Side Directories (Pink Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
          {/* Left Column (Green Box + Blue Box): Subheadline & Interactive Email CTA */}
          <div className="lg:col-span-7 space-y-8">
            {/* Subheadline (Green Box) */}
            <p className="text-lg md:text-xl text-[#eeeae2]/85 max-w-xl leading-relaxed font-normal">
              Whether you have a product idea, an existing product that needs work, or you&apos;re looking for someone who can design and build, I&apos;d like to hear about it.
            </p>

            {/* Direct Interactive Email Link (Blue Box) */}
            <div className="pt-2">
              <a
                href="mailto:dsgnclave@gmail.com"
                className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#eeeae2] hover:text-[#cbbd8a] transition-colors duration-300 relative"
              >
                <span className="relative border-b-2 border-[#eeeae2]/40 group-hover:border-[#cbbd8a] pb-1 transition-colors duration-300">
                  dsgnclave@gmail.com
                </span>
                <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-2xl">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Column (Pink Boxes): Quick Navigation Directory & Social Links */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-12 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
            {/* Quick Directory (Pink Box 1) */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#77746d] font-semibold block mb-4">
                Navigation
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

            {/* Social Links (Pink Box 2) */}
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

        {/* Baseline Copyright Bar */}
        <div className="flex justify-between items-center border-t border-white/10 pt-6 text-xs text-[#77746d] uppercase tracking-[0.15em] w-full">
          <span>© TRUNAL 2026</span>
          <a href="#top" className="hover:text-white transition-colors duration-200">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
