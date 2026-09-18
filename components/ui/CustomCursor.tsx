'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'hidden'>('default')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Touch device check: skip custom cursor on mobile touchscreens
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (isTouch) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // GSAP quickTo setters for 60fps smooth hardware acceleration
    const xDotSetter = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'power2.out' })
    const yDotSetter = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'power2.out' })

    const xRingSetter = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' })
    const yRingSetter = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xDotSetter(e.clientX)
      yDotSetter(e.clientY)
      xRingSetter(e.clientX)
      yRingSetter(e.clientY)

      // Target element check under cursor
      const target = e.target as HTMLElement | null
      if (!target) return

      // Hide global cursor when hovering over Selected Work project cards
      const isProjectCard = target.closest(
        '.stacked-card-anchor, .horizontal-card-wrapper, .project-card-wrapper, .project-card, .custom-card-pointer'
      )
      if (isProjectCard) {
        setCursorState('hidden')
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
    </>
  )
}
