'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'hidden' | 'view-project'>('default')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Touch device check: skip custom cursor on mobile touchscreens
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return

    const dot = dotRef.current
    const ring = ringRef.current
    const badge = badgeRef.current
    if (!dot || !ring || !badge) return

    // Set initial GSAP transforms for centered positioning
    gsap.set(badge, { xPercent: -50, yPercent: -50 })

    // GSAP quickTo setters for 60fps smooth hardware acceleration
    const xDotSetter = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power2.out' })
    const yDotSetter = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power2.out' })

    const xRingSetter = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' })
    const yRingSetter = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' })

    const xBadgeSetter = gsap.quickTo(badge, 'x', { duration: 0.06, ease: 'power2.out' })
    const yBadgeSetter = gsap.quickTo(badge, 'y', { duration: 0.06, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xDotSetter(e.clientX)
      yDotSetter(e.clientY)
      xRingSetter(e.clientX)
      yRingSetter(e.clientY)
      xBadgeSetter(e.clientX)
      yBadgeSetter(e.clientY)

      // Target element check under cursor
      const target = e.target as HTMLElement | null
      if (!target) return

      // Hide dot/ring and show root "view project" badge when hovering over any card image
      const isProjectCardImage = target.closest(
        '.project-card-image, .stacked-card-img-wrap, [data-cursor="view-project"]'
      )
      if (isProjectCardImage) {
        setCursorState('view-project')
        return
      }

      // Expand global cursor when hovering over interactive links/buttons
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .animated-cta, .button, .nav-link-item, .round-arrow'
      )

      if (isInteractive) {
        setCursorState('hover')
      } else {
        setCursorState('default')
      }
    }

    const handleMouseLeave = () => {
      setCursorState('hidden')
    }

    const handleMouseEnter = () => {
      setCursorState('default')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      {/* Outer Spring Trailing Ring */}
      <div
        ref={ringRef}
        className={`global-cursor-ring cursor-state-${cursorState}`}
        aria-hidden="true"
      />
      {/* Inner Solid Real-Time Dot */}
      <div
        ref={dotRef}
        className={`global-cursor-dot cursor-state-${cursorState}`}
        aria-hidden="true"
      />
      {/* Root-Level 60FPS Hardware-Accelerated Pill Pointer Badge */}
      <div
        ref={badgeRef}
        className={`custom-card-pointer ${cursorState === 'view-project' ? 'is-active' : ''}`}
        aria-hidden="true"
      >
        <span>view project</span>
      </div>
    </>
  )
}
