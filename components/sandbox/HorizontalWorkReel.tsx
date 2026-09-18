'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedCTA } from '@/components/AnimatedCTA'
import { projectsData } from '@/lib/data/projects'
import { usePageTransition } from '@/components/layout/PageTransition'

export function HorizontalWorkReel() {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const metaRef = useRef<(HTMLDivElement | null)[]>([])
  const { navigateWithTransition } = usePageTransition()

  // 4 showcase projects
  const featuredProjects = projectsData.slice(0, 4)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const triggerEl = triggerRef.current
    const trackEl = trackRef.current
    if (!triggerEl || !trackEl) return

    const cardElements = cardsRef.current.filter(Boolean) as HTMLAnchorElement[]
    const metaElements = metaRef.current.filter(Boolean) as HTMLDivElement[]
    if (cardElements.length < 4) return

    const ctx = gsap.context(() => {
      const expandedWidth = 70 // 70vw majority center focus
      const contractedWidth = 15 // 15vw left/right preview strip

      // Initial state: Card 0 expanded (70vw), Cards 1..3 contracted (15vw)
      cardElements.forEach((card, idx) => {
        const initialWidth = idx === 0 ? expandedWidth : contractedWidth
        gsap.set(card, { width: `${initialWidth}vw` })
      })

      // Initial metadata opacity: Card 0 active (1), others hidden (0)
      metaElements.forEach((meta, idx) => {
        gsap.set(meta, { opacity: idx === 0 ? 1 : 0 })
      })

      const totalSteps = 4
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: `+=${totalSteps * 950}`,
          pin: true,
          pinSpacing: true,
          scrub: 1, // 1:1 smooth scrubbed momentum
          invalidateOnRefresh: true,
        },
      })

      // Step 0: Card 0 (70vw) glides left from 30vw to 0vw, pushing intro text (-30vw) off-screen left
      if (textRef.current) {
        tl.to(
          textRef.current,
          {
            x: '-30vw',
            ease: 'none',
            duration: 1,
          },
          'step-0'
        )
      }

      tl.to(
        trackEl,
        {
          x: '-30vw',
          ease: 'none',
          duration: 1,
        },
        'step-0'
      )

      // Step 1: Card 0 contracts (70vw -> 15vw), Card 1 expands (15vw -> 70vw), track moves to -45vw
      // Card 0 glides completely off-screen left (-15vw)! Card 1 takes main stage (0..70vw)
      tl.to(
        cardElements[0],
        {
          width: `${contractedWidth}vw`,
          ease: 'none',
          duration: 1,
        },
        'step-1'
      )
        .to(
          cardElements[1],
          {
            width: `${expandedWidth}vw`,
            ease: 'none',
            duration: 1,
          },
          'step-1'
        )
        .to(
          trackEl,
          {
            x: '-45vw',
            ease: 'none',
            duration: 1,
          },
          'step-1'
        )

      // Step 2: Card 1 contracts (70vw -> 15vw), Card 2 expands (15vw -> 70vw), track moves to -60vw
      // Card 1 glides completely off-screen left (-15vw)! Card 2 takes main stage (0..70vw)
      tl.to(
        cardElements[1],
        {
          width: `${contractedWidth}vw`,
          ease: 'none',
          duration: 1,
        },
        'step-2'
      )
        .to(
          cardElements[2],
          {
            width: `${expandedWidth}vw`,
            ease: 'none',
            duration: 1,
          },
          'step-2'
        )
        .to(
          trackEl,
          {
            x: '-60vw',
            ease: 'none',
            duration: 1,
          },
          'step-2'
        )

      // Step 3 (Final Step): Card 2 contracts (70vw -> 15vw), Card 3 expands (70vw), track moves to -75vw
      // Card 2 glides completely off-screen left (-15vw)! Card 3 takes main stage. Section releases!
      tl.to(
        cardElements[2],
        {
          width: `${contractedWidth}vw`,
          ease: 'none',
          duration: 1,
        },
        'step-3'
      )
        .to(
          cardElements[3],
          {
            width: `${expandedWidth}vw`,
            ease: 'none',
            duration: 1,
          },
          'step-3'
        )
        .to(
          trackEl,
          {
            x: '-75vw',
            ease: 'none',
            duration: 1,
          },
          'step-3'
        )
    })

    return () => ctx.revert()
  }, [featuredProjects.length])

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()
    navigateWithTransition(`/work/${slug}`)
  }

  return (
    <section ref={triggerRef} className="horizontal-reel-section">
      <div className="horizontal-reel-container">
        {/* Horizontal Track Container */}
        <div className="horizontal-reel-track-wrapper">
          {/* Left Intro Text Layer */}
          <div ref={textRef} className="horizontal-reel-text-layer">
            <h2>A few<br />projects<br />we're<br />proud of</h2>
          </div>

          <div ref={trackRef} className="horizontal-reel-track zero-margin">
            {featuredProjects.map((project, index) => (
              <a
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                href={`/work/${project.slug}`}
                onClick={(e) => handleCardClick(e, project.slug)}
                className="reel-card-anchor expanding-card"
              >
                <article className="reel-card">
                  {/* Visual Card Frame */}
                  <div className={`reel-card-visual ${project.className || ''}`}>
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85'}
                      alt={project.title}
                      className="reel-card-img"
                    />

                    <div className="card-overlay" aria-hidden="true" />
                  </div>

                  {/* Card Bottom Metadata aligned under left edge */}
                  <div
                    ref={(el) => {
                      metaRef.current[index] = el
                    }}
                    className="reel-card-meta"
                  >
                    <span className="reel-card-year">©2025</span>
                    <h3 className="reel-card-title">{project.title}</h3>
                    <span className="reel-card-subhead">{project.kicker ? `${project.kicker} — ${project.role}` : project.role}</span>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>

        {/* View All Work Animated CTA (Right aligned) */}
        <div className="horizontal-reel-cta-wrap">
          <AnimatedCTA href="/work" text="View all work" variant="dark" />
        </div>
      </div>
    </section>
  )
}
