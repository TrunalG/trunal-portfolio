'use client'

import React from 'react'
import { usePageTransition } from '@/components/layout/PageTransition'

interface AnimatedCTAProps {
  href: string
  text: string
  className?: string
  variant?: 'light' | 'dark'
}

export function AnimatedCTA({
  href,
  text,
  className = '',
  variant = 'light'
}: AnimatedCTAProps) {
  const { navigateWithTransition } = usePageTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/')) {
      e.preventDefault()
      navigateWithTransition(href)
    }
  }

  return (
    <a href={href} onClick={handleClick} className={`animated-cta ${variant} ${className}`}>
      <span className="cta-content">
        <span className="cta-arrow cta-arrow-left" aria-hidden="true">
          →
        </span>
        <span className="cta-text">{text}</span>
        <span className="cta-arrow cta-arrow-right" aria-hidden="true">
          →
        </span>
      </span>
      <span className="cta-line-track">
        <span className="cta-line-base" />
        <span className="cta-line-hover" />
      </span>
    </a>
  )
}
