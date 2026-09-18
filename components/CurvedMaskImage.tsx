'use client'

import React, { useEffect, useRef, useId } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface CurvedMaskImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  maxCurve?: number // normalized depth e.g. 0.14 = 14% of height
}

export function CurvedMaskImage({
  src,
  alt,
  className = '',
  style = {},
  maxCurve = 0.14,
}: CurvedMaskImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  
  // Unique ID for SVG clip path to avoid multi-instance conflicts
  const rawId = useId()
  const clipId = `curved-mask-${rawId.replace(/:/g, '')}`

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const pathEl = pathRef.current
    if (!container || !pathEl) return

    // Dynamic curve state values
    const state = {
      topCurve: maxCurve,
      bottomCurve: 0,
    }

    const updatePath = () => {
      // Path equation:
      // Top edge: M 0 0 Q 0.5 {topCurve} 1 0
      // Right edge: L 1 1
      // Bottom edge: Q 0.5 {1 - bottomCurve} 0 1
      // Close: Z
      const topY = state.topCurve.toFixed(4)
      const bottomY = (1 - state.bottomCurve).toFixed(4)
      const d = `M 0 0 Q 0.5 ${topY} 1 0 L 1 1 Q 0.5 ${bottomY} 0 1 Z`
      pathEl.setAttribute('d', d)
    }

    // Set initial path
    updatePath()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.5,
          onUpdate: updatePath,
        },
      })

      // Phase 1: 0% -> 50% scroll progress: top curve flattens to 0
      tl.to(state, {
        topCurve: 0,
        duration: 0.5,
        ease: 'none',
      })

      // Phase 2: 50% -> 100% scroll progress: bottom curve curves up to maxCurve
      tl.to(state, {
        bottomCurve: maxCurve,
        duration: 0.5,
        ease: 'none',
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [maxCurve])

  return (
    <div
      ref={containerRef}
      className={`curved-mask-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Hidden SVG definition containing the clipPath */}
      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              ref={pathRef}
              d={`M 0 0 Q 0.5 ${maxCurve} 1 0 L 1 1 Q 0.5 1 0 1 Z`}
            />
          </clipPath>
        </defs>
      </svg>

      {/* Image with clip-path applied */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          willChange: 'clip-path',
        }}
      />
    </div>
  )
}
