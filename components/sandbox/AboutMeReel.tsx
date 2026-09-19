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
        {/* Header Stack: Spaced Light Kicker Centered Directly Over Giant Title */}
        <div className="relative w-full text-center select-none pointer-events-none mb-4 md:mb-6 z-0">
          {/* Spaced Light Kicker Line */}
          <div className="mb-2 md:mb-4">
            <span className="text-xs md:text-sm font-normal tracking-[0.25em] md:tracking-[0.32em] text-[#77746d] uppercase inline-block">
              PASSIONATE ABOUT DESIGN, CREATING, AND ART
            </span>
          </div>

          {/* Giant Title in #CCCCCC Color */}
          <h1 className="text-[14vw] sm:text-[14vw] md:text-[15vw] lg:text-[175px] xl:text-[200px] font-bold tracking-[-0.05em] leading-[0.82] uppercase text-[#CCCCCC] opacity-95">
            ABOUT ME
          </h1>
        </div>

        {/* Layered Composite: Cutout PNG overlapping A & B + Breathable Eye-Driven Body Text Flow */}
        <div className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 grid grid-cols-1 md:grid-cols-12 items-start gap-4 md:gap-8 lg:gap-12 w-full">
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

          {/* Right: Body Text starting right next to Cutout with balanced vertical hierarchy spacing */}
          <div className="md:col-span-7 lg:col-span-7 pl-0 pt-6 md:pt-14 lg:pt-18 space-y-6 md:space-y-8 max-w-[560px] lg:max-w-[620px]">
            {/* Editorial Single Combined Bio Copy */}
            <div
              className={`text-base md:text-lg lg:text-[19px] text-[#171715]/85 leading-relaxed font-medium transition-all duration-1000 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="leading-[1.68]">
                I’m a designer and developer dedicated to creating digital experiences that spark curiosity, purpose, and clarity. With a background in UI/UX architecture and full-stack craft, I blend my love for structure with interactive design to build meaningful web applications that people love to use. Outside of product work, I enjoy photography, games, books, and building projects simply to understand how things work under the hood. Beyond code, I’m passionate about clean aesthetics, art, and self-expression.
              </p>
            </div>

            {/* Italianno Signature: Trunal Gangera */}
            <div
              className={`pt-1 transition-all duration-1000 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="font-signature-italianno text-3xl sm:text-4xl md:text-5xl text-[#171715]/90 select-none block tracking-tight font-normal text-left leading-none">
                Trunal Gangera
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
