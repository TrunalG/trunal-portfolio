'use client'

import React, { useEffect, useState } from 'react'

let initialPageLoaded = false

export function PageLoader() {
  const [stage, setStage] = useState<'loading' | 'wiping' | 'done'>(() => {
    if (typeof window !== 'undefined' && (initialPageLoaded || (window as any).__initialPageLoaded)) {
      return 'done'
    }
    return 'loading'
  })

  useEffect(() => {
    if (stage === 'done') return

    if (typeof window !== 'undefined') {
      initialPageLoaded = true
      ;(window as any).__initialPageLoaded = true
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
      document.body.classList.remove('loader-wiping', 'loader-done', 'page-reveal-active')
    }

    // Stage 1: Hold solid red screen & brand logo T®
    const timer1 = setTimeout(() => {
      setStage('wiping')
      document.body.classList.add('loader-wiping')
    }, 350)

    // Stage 2: All 5 staggered strips rise UP off the screen -> trigger smooth hero entrance!
    const timer2 = setTimeout(() => {
      document.body.classList.add('loader-done')
      document.body.classList.add('page-reveal-active')
      document.body.classList.add('nav-revealed')

      if (typeof window !== 'undefined') {
        const hash = window.location.hash
        if (hash) {
          const targetEl = document.querySelector(hash)
          if (targetEl) {
            if ((window as any).__lenis) {
              ;(window as any).__lenis.scrollTo(targetEl, { immediate: true })
            } else {
              targetEl.scrollIntoView()
            }
          }
        }
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
      }
    }, 950)

    // Stage 3: Unmount loader overlay cleanly & refresh GSAP triggers
    const timer3 = setTimeout(() => {
      setStage('done')
      if (typeof window !== 'undefined' && (window as any).gsap && (window as any).gsap.plugins?.ScrollTrigger) {
        ;(window as any).gsap.plugins.ScrollTrigger.refresh()
      }
    }, 1300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [stage])

  if (stage === 'done') return null

  return (
    <div
      className={`page-loader-overlay ${stage}`}
      aria-hidden="true"
    >
      {/* Centered Website Navbar T® Logo */}
      <div className="loader-brand-logo">
        <span className="loader-wordmark">
          T<span>®</span>
        </span>
      </div>

      <div className="loader-strips-container">
        <div className="loader-strip strip-1" />
        <div className="loader-strip strip-2" />
        <div className="loader-strip strip-3" />
        <div className="loader-strip strip-4" />
        <div className="loader-strip strip-5" />
      </div>
    </div>
  )
}
