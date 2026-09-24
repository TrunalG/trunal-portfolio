'use client'

import React, { useRef, useEffect, useState } from 'react'

interface ScrollTextProps {
  text: string
  as?: React.ElementType
  className?: string
  mode?: 'words' | 'chars'
  emphasisWords?: string[]
  accentDot?: boolean
  scrollStart?: number
  scrollEnd?: number
}

export function ScrollText({
  text,
  as: Component = 'p',
  className = '',
  mode = 'words',
  emphasisWords = [],
  accentDot = false,
  scrollStart = 0.85,
  scrollEnd = 0.5
}: ScrollTextProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false
    const updateScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!el) return
          const rect = el.getBoundingClientRect()
          const windowHeight = window.innerHeight

          const start = windowHeight * scrollStart
          const end = windowHeight * scrollEnd

          let currentProgress = (start - rect.top) / (start - end)
          currentProgress = Math.max(0, Math.min(1, currentProgress))

          setProgress(currentProgress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [scrollStart, scrollEnd])

  const units = mode === 'chars' ? text.split('') : text.split(' ')
  const total = units.length

  const renderContent = (contentStr: string, isLastUnit: boolean) => {
    if (accentDot && isLastUnit && contentStr.endsWith('.')) {
      const baseText = contentStr.slice(0, -1)
      return (
        <>
          {baseText}
          <span className="accent-dot">.</span>
          {mode === 'words' && !isLastUnit ? ' ' : ''}
        </>
      )
    }
    return (
      <>
        {contentStr}
        {mode === 'words' && !isLastUnit ? ' ' : ''}
      </>
    )
  }

  return (
    <Component ref={containerRef} className={`scroll-fill-container ${className}`}>
      {units.map((unit, index) => {
        const startThreshold = index / total
        const endThreshold = (index + 1) / total
        const isLastUnit = index === total - 1

        let fill = 0
        if (progress > startThreshold) {
          fill = Math.min(1, (progress - startThreshold) / (endThreshold - startThreshold))
        }

        const isEmphasized = emphasisWords.some((w) =>
          unit.toLowerCase().includes(w.toLowerCase())
        )

        return (
          <span
            key={index}
            className={`scroll-fill-unit ${isEmphasized ? 'is-emphasis' : ''}`}
          >
            <span className="scroll-fill-dim">
              {renderContent(unit, isLastUnit)}
            </span>
            <span
              className="scroll-fill-bright"
              style={{ opacity: fill }}
              aria-hidden="true"
            >
              {renderContent(unit, isLastUnit)}
            </span>
          </span>
        )
      })}
    </Component>
  )
}
