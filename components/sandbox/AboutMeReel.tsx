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
      className="about-me-editorial bg-[#eeeae2] text-[#171715] min-h-screen py-20 md:py-32 lg:py-40 px-6 md:px-16 lg:px-24 relative z-30 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Header Stack: Spaced Light Kicker Centered Directly Over Giant Title */}
        <div className="relative w-full text-center select-none pointer-events-none mb-2 md:mb-4 z-0">
          {/* Spaced Light Kicker Line */}
          <div className="mb-2 md:mb-4">
            <span className="text-xs md:text-sm font-normal tracking-[0.25em] md:tracking-[0.32em] text-[#77746d] uppercase inline-block">
              PASSIONATE ABOUT DESIGN, CREATING, AND ART
            </span>
          </div>

          {/* Giant Off-White Title (Flat, No Drop Shadow) */}
          <h1 className="text-[14vw] sm:text-[14vw] md:text-[15vw] lg:text-[175px] xl:text-[200px] font-bold tracking-[-0.05em] leading-[0.82] uppercase text-[#ffffff] opacity-95">
            ABOUT ME
          </h1>
        </div>

        {/* Layered Composite: Cutout PNG overlapping A & B + Body Text Flush to Right Edge */}
        <div className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24 lg:-mt-28 grid grid-cols-1 md:grid-cols-12 items-start gap-4 md:gap-8 lg:gap-12 w-full">
          {/* Left / Middle: Cutout PNG overlapping left portion of ABOUT ME (A & B) */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end pr-0">
            <div
              className={`relative w-[240px] sm:w-[300px] md:w-[360px] lg:w-[410px] aspect-[3/4] flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Image
                src="/about sec img.png"
                alt="Trunal Portrait Cutout"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 410px"
              />
            </div>
          </div>

          {/* Right: Body Text starting right next to Cutout, wrapping cleanly before Red Line Boundary */}
          <div className="md:col-span-7 lg:col-span-7 pl-0 pt-6 md:pt-16 space-y-6 md:space-y-7 max-w-[560px] lg:max-w-[620px]">
            {/* Title: Trunal */}
            <div
              className={`transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#171715]">
                Trunal
              </h2>
            </div>

            {/* Editorial Single Combined Bio Copy */}
            <div
              className={`text-base md:text-lg lg:text-[19px] text-[#171715]/85 leading-relaxed font-medium transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="leading-[1.65]">
                I’m a designer and developer dedicated to creating digital experiences that spark curiosity, purpose, and clarity. With a background in UI/UX architecture and full-stack craft, I blend my love for structure with interactive design to build meaningful web applications that people love to use. Outside of product work, I enjoy photography, games, books, and building projects simply to understand how things work under the hood. Beyond code, I’m passionate about clean aesthetics, art, and self-expression.
              </p>
            </div>

            {/* Skill / Focus Tags */}
            <div
              className={`flex flex-wrap gap-2.5 pt-1 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
              className={`pt-2 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
