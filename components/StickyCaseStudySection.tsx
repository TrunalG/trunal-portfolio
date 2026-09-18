'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface StickyCaseStudySectionProps {
  challenge: string
  client: string
  year: string
  services: string
  gallery: string[]
}

export function StickyCaseStudySection({
  challenge,
  client,
  year,
  services,
  gallery,
}: StickyCaseStudySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current) return

    const sectionEl = sectionRef.current
    const leftEl = leftColRef.current

    // Wait for images/layout to settle before initializing ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top top+=90px',
        end: 'bottom bottom',
        pin: leftEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
      })
    }, sectionRef)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [gallery])

  return (
    <div className="case-study-split" ref={sectionRef}>
      {/* Left Column Sidebar */}
      <div className="case-study-sidebar" ref={leftColRef}>
        <div>
          <span className="case-study-label">(Challenges)</span>
          <h2 className="case-study-heading">{challenge}</h2>
        </div>

        {/* Metadata Table */}
        <div className="metadata-table">
          <div className="metadata-row">
            <span className="metadata-key">(Client)</span>
            <span className="metadata-value">{client}</span>
          </div>
          <div className="metadata-row">
            <span className="metadata-key">(Year)</span>
            <span className="metadata-value">{year}</span>
          </div>
          <div className="metadata-row">
            <span className="metadata-key">(Services)</span>
            <span className="metadata-value">{services}</span>
          </div>
        </div>
      </div>

      {/* Right Column Gallery Feed */}
      <div className="case-study-gallery">
        {gallery.map((imgSrc, idx) => (
          <div key={idx} className="gallery-image-wrap">
            <img src={imgSrc} alt={`Showcase image ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
