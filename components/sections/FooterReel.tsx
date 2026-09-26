'use client'

import React, { useRef, useEffect, useState } from 'react'
import { AnimatedCTA } from '@/components/AnimatedCTA'
import { ScrollText } from '@/components/ScrollText'
import { usePageTransition } from '@/components/layout/PageTransition'

export function FooterReel() {
  const footerRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const { triggerSectionTransition, navigateWithTransition } = usePageTransition()

  const [mounted, setMounted] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [fadeInProgress, setFadeInProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [maxBrandHeight, setMaxBrandHeight] = useState(300)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only enable fixed bottom TRUNAL layer when footer card is actually in viewport
  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.02,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Measure text height on load & resize for exact curtain reveal distance
  useEffect(() => {
    const updateBrandHeight = () => {
      if (textRef.current) {
        const h = textRef.current.offsetHeight
        if (h > 0) {
          setMaxBrandHeight(h + 24)
        }
      }
    }

    updateBrandHeight()
    window.addEventListener('resize', updateBrandHeight)
    return () => window.removeEventListener('resize', updateBrandHeight)
  }, [])

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

          // Entrance Skeleton Fade-In
          const fadeStart = windowHeight * 0.98
          const fadeEnd = windowHeight * 0.85
          const rawFade = Math.max(0, Math.min(1, (fadeStart - rect.top) / (fadeStart - fadeEnd)))
          setFadeInProgress(1 - Math.pow(1 - rawFade, 2))

          // Word Fill & Link Boxes Reveal
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

  const handleFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      e.preventDefault()
      const targetId = href.split('#')[1]
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
        triggerSectionTransition(targetId)
      } else {
        navigateWithTransition(`/#${targetId}`)
      }
    }
  }

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ]

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X / Twitter', href: 'https://x.com' },
  ]

  return (
    <div className="relative w-full bg-[#0f0f0e]" suppressHydrationWarning>
      {/* Higher Z-Index Main Footer Card (z-10) */}
      <footer
        ref={footerRef}
        id="contact"
        style={{ marginBottom: maxBrandHeight }}
        className="relative z-10 w-full bg-[#0f0f0e] text-[#eeeae2] min-h-screen pt-12 md:pt-16 pb-8 px-6 md:px-16 lg:px-24 flex flex-col justify-between"
      >
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between pt-6 md:pt-10 mb-8 md:mb-12">
          {/* Descending Typographic Headline Stack */}
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

          {/* Content Row: Subheadline + Email CTA (Left) & Directories (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-8 md:mb-12">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              <ScrollText
                as="p"
                text="Whether you’re starting with an idea or improving something that already exists, I can help shape it into a product people can actually use. From idea to live, I like being involved in the process."
                scrollStart={0.85}
                scrollEnd={0.42}
                className="text-base md:text-lg lg:text-[19px] text-[#eeeae2] max-w-xl leading-relaxed font-normal mb-8 md:mb-10"
              />

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

            {/* Right Column */}
            <div
              style={{
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 20}px)`,
                transition: 'opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className="lg:col-span-5 flex items-stretch justify-start gap-6 sm:gap-8 border-t lg:border-t-0 pt-8 lg:pt-0 lg:pl-4"
            >
              {/* Quick Navigation Box */}
              <div className="space-y-4 pr-6 sm:pr-8 md:pr-10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#77746d] font-semibold block mb-4">
                  Navigation
                </span>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleFooterNavClick(e, link.href)}
                        className="text-sm md:text-base text-[#eeeae2]/80 hover:text-white transition-colors duration-200 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thin Vertical Line */}
              <div className="w-[1px] bg-white/10 self-stretch flex-shrink-0" />

              {/* Social Links Box */}
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
          <div className="border-t border-white/10 pt-6 pb-4 text-xs text-[#77746d] uppercase tracking-[0.15em] w-full">
            <span>© TRUNAL 2026</span>
          </div>
        </div>
      </footer>

      {/* Lower Z-Index Fixed Bottom Brand Wordmark Layer (z-0) - Only visible when footer is near viewport */}
      <div
        style={{
          height: maxBrandHeight,
          visibility: isFooterVisible ? 'visible' : 'hidden',
          opacity: isFooterVisible ? 1 : 0,
        }}
        className="fixed bottom-0 left-0 right-0 z-0 w-full bg-[#0f0f0e] flex items-end justify-center select-none overflow-hidden pb-3 md:pb-6 px-4 md:px-12 lg:px-16 transition-opacity duration-300"
      >
        <h1
          ref={textRef}
          className="text-[clamp(75px,18.5vw,360px)] font-extrabold uppercase tracking-[-0.07em] leading-[0.72] text-[#eeeae2]/55 whitespace-nowrap text-center block w-full"
        >
          TRUNAL
        </h1>
      </div>
    </div>
  )
}
