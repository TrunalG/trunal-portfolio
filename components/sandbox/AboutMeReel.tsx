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
      className="about-me-sandbox bg-[#eeeae2] text-[#171715] min-h-screen py-20 px-6 md:px-16 lg:px-24 relative z-30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Kicker Line */}
        <div className="border-t border-[#171715]/15 pt-4 mb-12 flex items-center justify-between">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-[#77746d] uppercase">
            A LITTLE MORE ABOUT ME
          </span>
          <span className="text-xs font-mono text-[#77746d]">
            04 / 06
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Portrait Card / Visual Block */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full aspect-[3/4] max-w-[440px] rounded-3xl overflow-hidden shadow-2xl bg-[#171715]/10 border border-[#171715]/10 group">
              {/* Image Placeholder / Visual Container */}
              <div className="absolute inset-0 bg-[#171715] text-[#eeeae2] p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-105">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono tracking-widest opacity-60">PORTRAIT</span>
                  <span className="w-2 h-2 rounded-full bg-[#590711]" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl font-bold tracking-tight">TRUNAL</p>
                  <p className="text-xs md:text-sm opacity-60 font-mono">PRODUCT DESIGNER & DEVELOPER</p>
                </div>
              </div>

              {/* Decorative Corner Tag */}
              <div className="absolute bottom-6 right-6 px-3 py-1 rounded-full bg-[#eeeae2]/90 backdrop-blur text-[#171715] text-xs font-mono font-medium tracking-tight">
                2026 / INDIA
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Interests */}
          <div className="lg:col-span-7 space-y-10 pt-2">
            {/* Main Statement */}
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171715] leading-[1.08] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              I’m Trunal, a designer and developer interested in how people think, how products work, and why some digital experiences feel effortless.
            </h2>

            {/* Sub copy */}
            <p
              className={`text-lg md:text-xl text-[#77746d] leading-relaxed font-medium transition-all duration-1000 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Outside of product work, I like photography, games, books, and building things simply because I want to understand how they work.
            </p>

            {/* Interest Badges / Focus Areas */}
            <div
              className={`flex flex-wrap gap-3 pt-4 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {['UX Architecture', 'Product Design', 'Frontend Craft', 'Interactive Prototypes', 'Design Systems'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full border border-[#171715]/20 text-xs md:text-sm font-medium text-[#171715] bg-[#171715]/5 hover:bg-[#171715] hover:text-[#eeeae2] transition-all cursor-default select-none"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Contact Link */}
            <div
              className={`pt-6 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-[#171715] border-b-2 border-[#171715] pb-1 hover:text-[#590711] hover:border-[#590711] transition-colors"
              >
                <span>Say hello</span>
                <span className="text-xl">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
