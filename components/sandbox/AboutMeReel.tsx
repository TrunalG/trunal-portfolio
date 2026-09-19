'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export function AboutMeReel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className="about-me-editorial bg-[#eeeae2] text-[#171715] min-h-screen py-24 md:py-36 lg:py-44 px-6 md:px-16 lg:px-24 relative z-30 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Header Stack: Kicker Centered Directly Over Giant Title */}
        <div className="relative w-full text-center select-none pointer-events-none mb-8 md:mb-10">
          {/* Spaced Kicker Line centered over the big title */}
          <div className="mb-2 md:mb-3">
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] md:tracking-[0.3em] text-[#77746d] uppercase inline-block">
              PASSIONATE ABOUT DESIGN, CREATING, AND ART
            </span>
          </div>

          {/* Giant Off-White Title */}
          <h1 className="text-[14vw] sm:text-[14vw] md:text-[15vw] lg:text-[175px] xl:text-[200px] font-bold tracking-[-0.05em] leading-[0.82] uppercase text-[#ffffff] drop-shadow-sm opacity-95">
            ABOUT ME
          </h1>
        </div>

        {/* 2-Column Row: Cutout PNG Left + Body Text Right (Directly Touching Right Edge, Gap 0) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-0 w-full">
          {/* Left Block: Cutout Portrait PNG (Static, No Hover Effect) */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-start pr-0">
            <div
              className={`relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[430px] aspect-[3/4] flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Image
                src="/about sec img.png"
                alt="Trunal Portrait Cutout"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none filter drop-shadow-xl"
                sizes="(max-width: 768px) 100vw, 430px"
              />
            </div>
          </div>

          {/* Right Block: Body Text (Flush against Right Edge of Cutout, Gap 0) */}
          <div className="md:col-span-7 lg:col-span-7 pl-0 md:pl-0 pt-4 md:pt-2 space-y-6 md:space-y-8">
            {/* Title / Sub-header Tag */}
            <div
              className={`transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#171715]">
                About Me – Trunal G
              </h2>
            </div>

            {/* Editorial Bio Copy */}
            <div
              className={`space-y-4 text-base md:text-lg lg:text-xl text-[#171715]/85 leading-relaxed font-medium transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] max-w-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p>
                I’m a designer and developer dedicated to creating digital experiences that spark curiosity, purpose, and clarity. With a background in UI/UX architecture and full-stack craft, I blend my love for structure with interactive design to build meaningful web applications that people love to use.
              </p>
              <p className="text-[#77746d] text-sm md:text-base leading-relaxed">
                Outside of product work, I enjoy photography, games, books, and building projects simply to understand how things work under the hood. Beyond code, I’m passionate about clean aesthetics, art, and self-expression.
              </p>
            </div>

            {/* Skill / Focus Tags */}
            <div
              className={`flex flex-wrap gap-2.5 pt-2 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {['UX Architecture', 'Product Design', 'Full-Stack Craft', 'Design Systems'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full border border-[#171715]/20 text-xs md:text-sm font-medium text-[#171715]/90 bg-[#171715]/5 tracking-normal select-none pointer-events-none"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Contact Link */}
            <div
              className={`pt-4 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-[#171715] border-b-2 border-[#171715] pb-0.5 hover:text-[#590711] hover:border-[#590711] transition-colors group"
              >
                <span>Say hello</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
