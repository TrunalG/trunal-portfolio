'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedCTA } from '@/components/AnimatedCTA'
import { projectsData, Project } from '@/lib/data/projects'
import { usePageTransition } from '@/components/layout/PageTransition'

interface StackedWorkReelProps {
  projects?: Project[]
}

export function StackedWorkReel({ projects }: StackedWorkReelProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const charFillsRef = useRef<(HTMLSpanElement | null)[]>([])
  const maskItemsRef = useRef<(HTMLSpanElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [pointerState, setPointerState] = React.useState({ x: 0, y: 0, visible: false })
  const { navigateWithTransition } = usePageTransition()

  // Dynamic projects or fall back to featured projects
  const featuredProjects =
    projects && projects.length > 0
      ? projects
      : projectsData.filter((p) => p.featured).slice(0, 4)

  const line1Chars = ['S', 'E', 'L', 'E', 'C', 'T', 'E', 'D']
  const line2Chars = ['W', 'O', 'R', 'K']

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const triggerEl = triggerRef.current
    const trackEl = trackRef.current
    if (!triggerEl || !trackEl) return

    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (cardElements.length === 0) return

    const ctx = gsap.context(() => {
      // 1. PHASE 1: Hero-Style Mask Reveal Entrance when section enters viewport from above
      const maskItems = maskItemsRef.current.filter(Boolean) as HTMLSpanElement[]
      if (maskItems.length > 0) {
        gsap.set(maskItems, { y: '115%', rotate: 1.4, opacity: 0 })
        ScrollTrigger.create({
          trigger: triggerEl,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(maskItems, {
              y: '0%',
              rotate: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.12,
            })
          },
        })
      }

      // Initial position: Horizontal track starts at 105vw (completely off-screen right so NO cards are visible initially)
      const startX = window.innerWidth * 1.05
      gsap.set(trackEl, { x: startX })

      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 1 })
      }

      // Calculate total horizontal scroll distance
      const getScrollDistance = () => {
        const trackWidth = trackEl.scrollWidth
        const viewportWidth = window.innerWidth
        // Position last card with consistent 12px right margin
        const targetEndX = -(trackWidth - viewportWidth + 12)
        return { startX, targetEndX, totalDistance: startX - targetEndX }
      }

      const { targetEndX } = getScrollDistance()

      const scrollDistance = 3200 // Smooth scrubbed distance

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6, // Smooth 1:1 scroll scrub
          invalidateOnRefresh: true,
        },
      })

      // 2. PHASE 2: Character-by-Character Progressive Scroll Fill (S -> E -> L -> E -> C -> T -> E -> D -> W -> O -> R -> K)
      const charFills = charFillsRef.current.filter(Boolean) as HTMLSpanElement[]
      if (charFills.length > 0) {
        const charCount = charFills.length
        const fillWindow = 0.22
        const charDuration = 0.08
        const staggerTime = fillWindow / charCount

        tl.to(
          charFills,
          {
            opacity: 1,
            ease: 'none',
            duration: charDuration,
            stagger: staggerTime,
          },
          0
        )
      }

      // 3. PHASE 3: Horizontal Flow of Cards (starts AFTER text animation completes at progress 0.25, ends at 0.98)
      tl.to(
        trackEl,
        {
          x: targetEndX,
          ease: 'none',
          duration: 0.73,
        },
        0.25
      )

      // 4. PHASE 4: Fade out Big Title COMPLETELY to 0 opacity once Card 1 covers it (around progress 0.44 to 0.56)
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            opacity: 0,
            ease: 'power2.inOut',
            duration: 0.12,
          },
          0.44
        )
      }
    })

    return () => ctx.revert()
  }, [featuredProjects.length])

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()
    navigateWithTransition(`/work/${slug}`)
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPointerState({ x: e.clientX, y: e.clientY, visible: true })
  }

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPointerState({ x: e.clientX, y: e.clientY, visible: true })
  }

  const handleCardMouseLeave = () => {
    setPointerState((prev) => ({ ...prev, visible: false }))
  }

  return (
    <section id="work" ref={triggerRef} className="stacked-reel-section bg-[#EEEAE2] text-[#1a1a1a] relative z-20">
      <div className="stacked-reel-container">
        {/* Sticky Centered 2-Line Header with Mask Reveal & Dual Scroll Fill */}
        <div ref={headerRef} className="stacked-reel-header">
          <h2 className="stacked-reel-title">
            {/* Line 1: SELECTED */}
            <span className="mask-reveal-wrap block">
              <span
                ref={(el) => {
                  maskItemsRef.current[0] = el
                }}
                className="stacked-title-unit mask-reveal-item inline-block"
              >
                {line1Chars.map((char, idx) => (
                  <span key={idx} className="char-unit relative inline-block">
                    <span className="scroll-fill-dim">{char}</span>
                    <span
                      ref={(el) => {
                        charFillsRef.current[idx] = el
                      }}
                      className="scroll-fill-bright"
                      style={{ opacity: 0 }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            </span>

            {/* Line 2: WORK */}
            <span className="mask-reveal-wrap block">
              <span
                ref={(el) => {
                  maskItemsRef.current[1] = el
                }}
                className="stacked-title-unit mask-reveal-item inline-block delay-1"
              >
                {line2Chars.map((char, idx) => {
                  const globalIdx = line1Chars.length + idx
                  return (
                    <span key={idx} className="char-unit relative inline-block">
                      <span className="scroll-fill-dim">{char}</span>
                      <span
                        ref={(el) => {
                          charFillsRef.current[globalIdx] = el
                        }}
                        className="scroll-fill-bright"
                        style={{ opacity: 0 }}
                      >
                        {char}
                      </span>
                    </span>
                  )
                })}
              </span>
            </span>
          </h2>
        </div>

        {/* Horizontal Cards Layer */}
        <div className="horizontal-cards-viewport">
          <div ref={trackRef} className="horizontal-cards-track">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className="horizontal-card-wrapper"
              >
                <a
                  href={`/work/${project.slug}`}
                  onClick={(e) => handleCardClick(e, project.slug)}
                  onMouseMove={handleCardMouseMove}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                  className="stacked-card-anchor"
                >
                  <article className="stacked-card-clean">
                    {/* Frame Aspect Ratio 16/10 matching mockup images */}
                    <div className="stacked-card-img-wrap">
                      <img
                        src={
                          project.image ||
                          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85'
                        }
                        alt={project.title}
                        className="stacked-card-img"
                      />
                    </div>

                    {/* Left-Aligned Metadata Block: Title & Subheadline/Tagline */}
                    <div className="stacked-card-meta-block">
                      <h3 className="card-meta-title">{project.title}</h3>
                      <p className="card-meta-subhead">{project.tagline || project.type || project.role}</p>
                    </div>
                  </article>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed View All Work CTA at Bottom Center */}
        <div className="stacked-reel-cta-wrap">
          <AnimatedCTA href="/work" text="View all work" variant="dark" />
        </div>

        {/* Custom Mouse Follower Pointer (+ VIEW PROJECT) in #590711 */}
        <div
          className={`custom-card-pointer ${pointerState.visible ? 'is-active' : ''}`}
          style={{
            left: `${pointerState.x}px`,
            top: `${pointerState.y}px`,
          }}
        >
          <span className="custom-card-pointer-icon">+</span>
          <span>VIEW PROJECT</span>
        </div>
      </div>
    </section>
  )
}
