'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { AnimatedCTA } from '@/components/AnimatedCTA'
import { ScrollText } from '@/components/ScrollText'

export function FooterReel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLElement | null>(null)

  const [fadeInProgress, setFadeInProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll on footerRef as its bottom edge moves up the viewport
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['end end', 'end 10%'],
  })

  // Smooth raw scroll steps with spring physics for 60fps buttery glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  })

  // Map smooth spring progress to sticky brand panel height, scaleY, and opacity
  const brandHeight = useTransform(smoothProgress, [0, 1], ['0px', '340px'])
  const brandScaleY = useTransform(smoothProgress, [0, 1], [0, 1])
  const brandOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1])

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    let ticking = false
    const updateScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!el) return
          const rect = el.getBoundingClientRect()
          const windowHeight = window.innerHeight

          // Phase 1: Entrance Skeleton Fade-In (as section first appears from 98% to 85% of window height)
          const fadeStart = windowHeight * 0.98
          const fadeEnd = windowHeight * 0.85
          const rawFade = Math.max(0, Math.min(1, (fadeStart - rect.top) / (fadeStart - fadeEnd)))
          setFadeInProgress(1 - Math.pow(1 - rawFade, 2))

          // Phase 2: Word Fill & Link Boxes Reveal (as user scrolls from 85% to 42% of window height)
          const fillStart = windowHeight * 0.85
          const fillEnd = windowHeight * 0.42
          const rawFill = Math.max(0, Math.min(1, (fillStart - rect.top) / (fillStart - fillEnd)))
          setScrollProgress(1 - Math.pow(1 - rawFill, 3))

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    return () => window.removeEventListener('scroll', updateScroll)
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
    <div ref={containerRef} className="relative w-full bg-[#0f0f0e] pb-[360px]">
      {/* Top Contact Content Card */}
      <footer
        ref={footerRef}
        id="contact"
        className="relative z-20 bg-[#0f0f0e] text-[#eeeae2] min-h-screen py-12 md:py-16 px-6 md:px-16 lg:px-24 flex flex-col justify-between shadow-2xl"
      >
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between pt-6 md:pt-10 mb-8 md:mb-12">

          {/* Descending Typographic Headline Stack: Entrance Fade-In first, then Scroll Word Fill */}
          <div
            style={{
              opacity: fadeInProgress,
              transform: `translateY(${(1 - fadeInProgress) * 24}px)`,
              transition: 'opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1), transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className="mb-8 md:mb-12 select-none"
          >
            {/* Line 1: HAVE SOMETHING */}
            <ScrollText
              as="h2"
              text="HAVE SOMETHING"
              scrollStart={0.85}
              scrollEnd={0.42}
              className="text-[clamp(44px,7.5vw,110px)] font-bold leading-[0.88] tracking-[-0.03em] uppercase text-white whitespace-nowrap block"
            />

            {/* Line 2: worth building? */}
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="mt-1 sm:mt-2 md:mt-3">
              <ScrollText
                as="span"
                text="worth building?"
                scrollStart={0.85}
                scrollEnd={0.42}
                className="text-[clamp(36px,6vw,88px)] font-normal italic leading-[0.88] text-[#eeeae2] whitespace-nowrap block"
              />
            </div>
          </div>

          {/* Content Row: Subheadline + Email CTA (Left) & Symmetrically Aligned Directories (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-8 md:mb-12">
            {/* Left Column: Subheadline & Interactive Email CTA guiding the eye */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              {/* Subheadline with Scroll-Based Skeleton Fill */}
              <ScrollText
                as="p"
                text="Whether you have a product idea, an existing product that needs work, or you're looking for someone who can design and build, I'd like to hear about it."
                scrollStart={0.85}
                scrollEnd={0.42}
                className="text-base md:text-lg lg:text-[19px] text-[#eeeae2] max-w-xl leading-relaxed font-normal mb-8 md:mb-10"
              />

              {/* Direct Interactive Email Link CTA synchronized with scroll progress */}
              <div
                style={{
                  opacity: Math.max(0.18, scrollProgress),
                  transform: `translateY(${(1 - scrollProgress) * 16}px)`,
                  transition: 'opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                <AnimatedCTA
                  href="mailto:dsgnclave@gmail.com"
                  text="dsgnclave@gmail.com"
                  variant="light"
                  showArrow={false}
                  className="!text-xl sm:!text-2xl md:!text-3xl font-medium"
                />
              </div>
            </div>

            {/* Right Column: Navigation & Socials with synchronized smooth scroll fade-in & slide-up */}
            <div
              style={{
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className="lg:col-span-5 flex items-stretch justify-start gap-6 sm:gap-8 border-t lg:border-t-0 pt-8 lg:pt-0 lg:pl-4"
            >
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
          <div className="border-t border-white/10 pt-6 pb-2 text-xs text-[#77746d] uppercase tracking-[0.15em] w-full">
            <span>© TRUNAL 2026</span>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Brand Wordmark Panel ("TRUNAL") */}
      <div className="sticky bottom-0 z-10 w-full bg-[#0f0f0e] border-t border-white/10 flex items-end justify-center select-none overflow-hidden">
        <motion.div
          style={{ height: brandHeight }}
          className="w-full flex items-end justify-center overflow-hidden will-change-[height]"
        >
          <motion.div
            style={{
              scaleY: brandScaleY,
              opacity: brandOpacity,
              transformOrigin: 'bottom',
              willChange: 'transform, opacity',
            }}
            className="w-full flex justify-center items-end pb-3 sm:pb-6 md:pb-8 px-6 md:px-16 lg:px-24"
          >
            <h1 className="text-[clamp(65px,17.8vw,330px)] font-extrabold uppercase tracking-[-0.07em] leading-[0.72] text-[#eeeae2] whitespace-nowrap text-center block w-full select-none">
              TRUNAL
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
