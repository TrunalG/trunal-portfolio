'use client'

import React from 'react'

function Arrow() {
  return <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
}

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
      className="relative z-30 bg-[#0f0f0e] text-[#eeeae2] pt-16 md:pt-24 lg:pt-32 pb-8 px-6 md:px-16 lg:px-24 flex flex-col justify-between min-h-[85vh]"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Main 12-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
          {/* Left Column (7 cols): Tiered Visual Hierarchy Headline, Subheadline & Email CTA */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Top Section Kicker */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#cbbd8a]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#77746d] font-semibold">
                CONTACT
              </span>
            </div>

            {/* Tiered Headline Stack */}
            <div className="space-y-1">
              {/* Tier 1 (Largest): Have something */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-white leading-none">
                Have something
              </h2>

              {/* Tier 2 (Medium, single line): worth building? */}
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-[#eeeae2]/85 tracking-tight leading-tight block pt-1">
                worth building?
              </span>
            </div>

            {/* Tier 3 (Subheadline copy) */}
            <p className="text-base md:text-lg text-[#eeeae2]/70 leading-relaxed max-w-xl pt-2 font-normal">
              Whether you have a product idea, an existing product that needs work, or you're looking for someone who can design and build, I'd like to hear about it.
            </p>

            {/* Interactive Email CTA with Hover Animation */}
            <div className="pt-4 space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#77746d] font-semibold block">
                Start a conversation
              </span>
              <div>
                <a
                  href="mailto:dsgnclave@gmail.com"
                  className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#eeeae2] hover:text-[#cbbd8a] transition-colors duration-300 relative"
                >
                  <span className="relative border-b-2 border-[#eeeae2]/40 group-hover:border-[#cbbd8a] pb-1 transition-colors duration-300">
                    dsgnclave@gmail.com
                  </span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Directory Navigation & Socials */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-12 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
            {/* Quick Directory */}
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

        {/* Copyright Bar at the end of the section */}
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
