'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  image: string
  tags: string[]
}

interface ServiceCardBoxProps {
  service: ServiceItem
  isHovered: boolean
  onMouseEnter: () => void
}

export function ServiceCardBox({ service, isHovered, onMouseEnter }: ServiceCardBoxProps) {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={boxRef}
      onMouseEnter={onMouseEnter}
      className="service-card-box relative transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group overflow-hidden"
    >
      {/* Animated Thin Top Line (Grows left-to-right on viewport entrance) */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-[#171715]/15 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none"
        style={{
          transform: isRevealed ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />

      {/* Animated Thin Bottom Line (Grows left-to-right on viewport entrance) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#171715]/15 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 pointer-events-none"
        style={{
          transform: isRevealed ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />

      <div
        className={`grid grid-cols-1 lg:grid-cols-[140px_460px_1fr] xl:grid-cols-[160px_520px_1fr] gap-4 lg:gap-12 xl:gap-16 w-full transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered ? 'py-12 md:py-14 items-start' : 'py-8 md:py-10 items-center'
        }`}
      >
        {/* Col 1: Left Number & Primary Red Dot (Slides out from left inside overflow-hidden mask) */}
        <div className="overflow-hidden pt-1">
          <div
            className="flex items-baseline gap-1 flex-shrink-0 transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isRevealed ? 'translateX(0)' : 'translateX(-100%)',
              transitionDelay: '100ms',
            }}
          >
            <span
              className={`tracking-tight transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? 'text-4xl md:text-6xl lg:text-7xl text-[#171715] font-bold opacity-65 scale-100'
                  : 'text-2xl md:text-4xl font-medium text-[#171715] opacity-40 group-hover:opacity-65'
              }`}
            >
              {service.number}
            </span>
            <span
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-[1px] bg-[#590711] transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-125' : 'opacity-70 group-hover:opacity-100'
              }`}
            />
          </div>
        </div>

        {/* Col 2: Showcase Image Area (Between Col 1 & Left Line) */}
        <div className="w-full flex-shrink-0">
          <div
            style={{ transformOrigin: 'top left' }}
            className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#171715]/10 origin-top-left transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered
                ? 'opacity-100 scale-100 translate-x-0 translate-y-0 max-h-[360px]'
                : 'opacity-0 scale-0 -translate-x-4 -translate-y-4 max-h-0 pointer-events-none'
            }`}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>

        {/* Col 3: Content Column (Slides out from left inside overflow-hidden mask) */}
        <div className="relative flex flex-col items-start w-full max-w-[460px] xl:max-w-[500px] overflow-hidden">
          <div
            className="w-full transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isRevealed ? 'translateX(0)' : 'translateX(-100%)',
              transitionDelay: '200ms',
            }}
          >
            {/* Default Title (Slides UPWARDS & fades out on hover) */}
            <h3
              className={`tracking-tight font-medium text-2xl md:text-3xl lg:text-4xl transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? 'opacity-0 -translate-y-full pointer-events-none absolute top-0 left-0'
                  : 'opacity-100 translate-y-0 text-[#171715]/90 group-hover:text-[#171715] relative'
              }`}
            >
              {service.title}
            </h3>

            {/* Expanded Content Panel (Slides UPWARDS FROM BELOW into view on hover, reverses smoothly) */}
            <div
              className={`grid transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${
                isHovered
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0 pointer-events-none'
              }`}
            >
              <div
                className="overflow-hidden transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isHovered ? 'translateY(0)' : 'translateY(36px)',
                  opacity: isHovered ? 1 : 0,
                }}
              >
                {/* Expanded Display Title */}
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171715] leading-[0.95] mb-4">
                  {service.title}
                </h3>

                <p className="text-base md:text-lg text-[#77746d] leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>

                {/* Static Non-Interactive Pill Badges (Wrap within Right Line Boundary) */}
                <div className="flex flex-wrap gap-2.5 w-full">
                  {service.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-4 py-1.5 rounded-full border border-[#171715]/20 text-xs md:text-sm font-medium text-[#171715]/90 bg-[#171715]/5 tracking-normal select-none pointer-events-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
