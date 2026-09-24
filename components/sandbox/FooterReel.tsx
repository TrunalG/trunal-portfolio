'use client'

import React from 'react'

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
      className="relative z-30 bg-[#0f0f0e] text-[#eeeae2] py-20 md:py-28 lg:py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">

        {/* Descending Typographic Headline Stack: Relaxed letter tracking on Line 1 */}
        <div className="mb-10 md:mb-14 select-none">
          {/* Line 1: Have something (Loosened tracking from -0.07em to -0.03em) */}
          <h2 className="text-[clamp(44px,7.5vw,110px)] font-bold leading-[0.88] tracking-[-0.03em] uppercase text-white whitespace-nowrap block">
            Have something
          </h2>

          {/* Line 2: worth building? */}
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[clamp(36px,6vw,88px)] font-normal italic leading-[0.88] text-[#eeeae2] block mt-1 sm:mt-2 md:mt-3 whitespace-nowrap"
          >
            worth building?
          </span>
        </div>

        {/* Content Row: Subheadline + Email CTA (Left) & Symmetrically Aligned Directories (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16 md:mb-24">
          {/* Left Column: Subheadline & Interactive Email CTA guiding the eye */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Subheadline */}
            <p className="text-base md:text-lg lg:text-[19px] text-[#eeeae2]/80 max-w-xl leading-relaxed font-normal mb-8 md:mb-10">
              Whether you have a product idea, an existing product that needs work, or you&apos;re looking for someone who can design and build, I&apos;d like to hear about it.
            </p>

            {/* Direct Interactive Email Link CTA with progressive left-to-right underline hover animation */}
            <div>
              <a
                href="mailto:dsgnclave@gmail.com"
                className="group relative inline-block text-xl sm:text-2xl md:text-3xl font-medium text-[#eeeae2] hover:text-[#cbbd8a] transition-colors duration-300 pb-1"
              >
                <span>dsgnclave@gmail.com</span>
                {/* Subtle static guide line */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#eeeae2]/25" />
                {/* Progressive active underline filling left-to-right on hover */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#cbbd8a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-350 ease-out" />
              </a>
            </div>
          </div>

          {/* Right Column: Navigation & Socials with healthy padding & shifted slightly left */}
          <div className="lg:col-span-5 flex items-stretch justify-start gap-6 sm:gap-8 border-t lg:border-t-0 pt-8 lg:pt-0 lg:pl-4">
            {/* Quick Navigation Box with healthy padding */}
            <div className="space-y-4 pr-6 sm:pr-8 md:pr-10">
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

            {/* Thin Vertical Line (Positioned dead-center between padded boxes) */}
            <div className="w-[1px] bg-white/10 self-stretch flex-shrink-0" />

            {/* Social Links Box with healthy padding */}
            <div className="space-y-4 pl-6 sm:pl-8 md:pl-10">
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
        <div className="border-t border-white/10 pt-6 text-xs text-[#77746d] uppercase tracking-[0.15em] w-full">
          <span>© TRUNAL 2026</span>
        </div>
      </div>
    </footer>
  )
}
