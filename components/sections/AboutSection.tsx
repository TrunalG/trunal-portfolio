'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { The_Nautigal } from 'next/font/google'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const nautigalFont = The_Nautigal({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const PARAGRAPH_1 =
  "I’m Trunal, a designer and developer who enjoys turning ideas into things people can actually use. I started with design, but over time I found myself wanting to understand more of what happens behind the interface, which naturally led me into development. Now I enjoy working across product design, UI/UX, and web development, moving between the small details and the bigger picture of how a product should work."

const PARAGRAPH_2 =
  "What I enjoy most is that space between design and technology, where an idea slowly turns into something real. I like figuring out how things should work, making them feel simple to use, and paying attention to the details that often go unnoticed. Outside of work, I’m usually taking photographs, playing games, reading, or building something just because I’m curious about how it works."

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    gsap.registerPlugin(ScrollTrigger)

    const el = containerRef.current
    if (!el) return

    if (window.innerWidth <= 768) {
      return () => {
        window.removeEventListener('resize', checkMobile)
      }
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        end: 'center 35%',
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        },
      })
    }, el)

    return () => {
      window.removeEventListener('resize', checkMobile)
      ctx.revert()
    }
  }, [])

  // Tokenize paragraphs into word arrays for left-to-right writing reveal
  const p1Words = PARAGRAPH_1.split(' ')
  const p2Words = PARAGRAPH_2.split(' ')
  const totalWords = p1Words.length + p2Words.length

  // On mobile screens, display text & image cleanly by default without scroll-lag.
  // On desktop screens, preserve full scroll-driven writing reveal.
  const textProgress = isMobile ? 1 : Math.min(1, scrollProgress / 0.88)
  const isSignatureActive = isMobile ? true : scrollProgress >= 0.88

  return (
    <section
      id="about"
      ref={containerRef}
      className="about-me-editorial bg-[#eeeae2] text-[#171715] min-h-screen py-16 md:py-36 lg:py-44 px-6 md:px-16 lg:px-24 relative z-30 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Static Header Stack: Spaced Light Kicker Centered Directly Over Giant Title */}
        <div className="relative w-full text-center select-none pointer-events-none mb-4 md:mb-6 z-0">
          {/* Spaced Light Kicker Line */}
          <div className="mb-2 md:mb-4 overflow-hidden">
            <span className="text-[9px] sm:text-xs md:text-sm font-normal tracking-[0.12em] sm:tracking-[0.22em] md:tracking-[0.32em] text-[#77746d] uppercase whitespace-nowrap inline-block max-w-full">
              PASSIONATE ABOUT CREATING, DEVELOPING AND ART
            </span>
          </div>

          {/* Tighter Giant Title in #CCCCCC Color */}
          <h1 className="text-[14vw] sm:text-[14vw] md:text-[15vw] lg:text-[175px] xl:text-[200px] font-bold tracking-[-0.075em] leading-[0.78] uppercase text-[#CCCCCC] opacity-95">
            ABOUT ME
          </h1>
        </div>

        {/* Layered Composite: Cutout PNG overlapping A & B + Scroll-Driven Body Writing Flow */}
        <div className="relative z-10 -mt-6 sm:-mt-12 md:-mt-16 lg:-mt-20 grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-8 lg:gap-12 w-full">
          {/* Left / Middle: Cutout PNG */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end pr-0">
            <div
              style={{
                opacity: textProgress,
                transform: `translateY(${(1 - textProgress) * 32}px)`,
                transition: 'opacity 0.25s linear, transform 0.25s linear',
              }}
              className="about-portrait-wrap relative w-[220px] sm:w-[300px] md:w-[360px] lg:w-[410px] aspect-[3/4] flex-shrink-0"
            >
              <Image
                src="/about sec img.png"
                alt="Trunal Portrait Cutout"
                fill
                loading="lazy"
                className="object-contain object-bottom pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 410px"
              />
            </div>
          </div>

          {/* Right: Body Text */}
          <div className="md:col-span-7 lg:col-span-7 pl-0 pt-2 md:pt-14 lg:pt-18 space-y-6 md:space-y-8 max-w-[560px] lg:max-w-[620px]">
            {/* Scroll-Driven Writing Reveal Body Copy */}
            <div className="text-base md:text-lg lg:text-[19px] leading-relaxed font-medium space-y-4 md:space-y-5">
              {/* Paragraph 1 */}
              <p className="leading-[1.68]">
                {p1Words.map((word, index) => {
                  const startThresh = index / totalWords
                  const endThresh = (index + 1) / totalWords
                  let fill = 0
                  if (textProgress > startThresh) {
                    fill = Math.min(1, (textProgress - startThresh) / (endThresh - startThresh))
                  }
                  const isLast = index === p1Words.length - 1

                  return (
                    <span key={`p1-${index}`} className="about-word-wrap relative inline-block white-space-pre mr-[0.28em]">
                      <span className="about-word-bg text-[#171715]/20">{word}</span>
                      <span
                        className="about-word-fg absolute top-0 left-0 text-[#171715] pointer-events-none transition-opacity duration-75"
                        style={{ opacity: fill }}
                        aria-hidden="true"
                      >
                        {word}
                      </span>
                      {!isLast ? ' ' : ''}
                    </span>
                  )
                })}
              </p>

              {/* Paragraph 2 */}
              <p className="leading-[1.68]">
                {p2Words.map((word, index) => {
                  const globalIdx = p1Words.length + index
                  const startThresh = globalIdx / totalWords
                  const endThresh = (globalIdx + 1) / totalWords
                  let fill = 0
                  if (textProgress > startThresh) {
                    fill = Math.min(1, (textProgress - startThresh) / (endThresh - startThresh))
                  }
                  const isLast = index === p2Words.length - 1

                  return (
                    <span key={`p2-${index}`} className="about-word-wrap relative inline-block white-space-pre mr-[0.28em]">
                      <span className="about-word-bg text-[#171715]/20">{word}</span>
                      <span
                        className="about-word-fg absolute top-0 left-0 text-[#171715] pointer-events-none transition-opacity duration-75"
                        style={{ opacity: fill }}
                        aria-hidden="true"
                      >
                        {word}
                      </span>
                      {!isLast ? ' ' : ''}
                    </span>
                  )
                })}
              </p>
            </div>

            {/* Signature: Starts AFTER text completion with a smooth calligraphic pen stroke reveal */}
            <div className="pt-2 overflow-hidden">
              <span
                style={{
                  fontFamily: "'The Nautigal', cursive, sans-serif",
                  clipPath: isSignatureActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  opacity: isSignatureActive ? 1 : 0,
                  transform: isSignatureActive ? 'translateY(0) skewX(0deg)' : 'translateY(6px) skewX(-5deg)',
                  transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                }}
                className={`about-signature font-signature-nautigal ${nautigalFont.className} text-5xl sm:text-6xl md:text-7xl lg:text-[78px] text-[#171715]/95 select-none block font-bold text-left leading-none tracking-normal`}
              >
                Trunal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
