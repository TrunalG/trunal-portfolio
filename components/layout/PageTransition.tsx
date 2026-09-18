'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface PageTransitionContextType {
  navigateWithTransition: (href: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateWithTransition: () => {},
})

export const usePageTransition = () => useContext(PageTransitionContext)

const resetScrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if ((window as any).__lenis) {
      ;(window as any).__lenis.scrollTo(0, { immediate: true })
    }
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 50)
  }
}

const removeFreezeOverlay = () => {
  if (typeof document !== 'undefined') {
    const overlays = document.querySelectorAll('.page-freeze-overlay')
    overlays.forEach((el) => el.remove())
  }
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [transitionState, setTransitionState] = useState<'idle' | 'covering' | 'uncovering'>('idle')
  const [pendingHref, setPendingHref] = useState<string | null>(null)
  
  const timersRef = useRef<NodeJS.Timeout[]>([])
  const prevPathnameRef = useRef(pathname)

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t))
    timersRef.current = []
  }

  const addTimer = (timer: NodeJS.Timeout) => {
    timersRef.current.push(timer)
  }

  // Synchronously clone current page DOM on browser popstate (Back / Forward)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof document === 'undefined') return
      removeFreezeOverlay()
      
      const siteShell = document.querySelector('.site-shell') as HTMLElement
      if (siteShell) {
        const currentScrollY = window.scrollY
        const clone = siteShell.cloneNode(true) as HTMLElement
        clone.classList.add('page-freeze-overlay')
        clone.style.position = 'fixed'
        clone.style.top = `-${currentScrollY}px`
        clone.style.left = '0'
        clone.style.width = '100%'
        clone.style.zIndex = '9998'
        clone.style.pointerEvents = 'none'
        clone.style.overflow = 'hidden'
        document.body.appendChild(clone)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      removeFreezeOverlay()
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (transitionState !== 'idle') {
        document.body.classList.add('is-transitioning')
      } else {
        document.body.classList.remove('is-transitioning')
        removeFreezeOverlay()
      }
    }
  }, [transitionState])

  // Ensure reveal active on initial load if no initial page loader is running
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const hasInitialLoader = document.querySelector('.page-loader-overlay')
      if (!hasInitialLoader) {
        document.body.classList.remove('page-reveal-active')
        const timer = setTimeout(() => {
          document.body.classList.add('page-reveal-active')
          document.body.classList.add('nav-revealed')
        }, 60)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  // Trigger page transition: Cover screen from bottom to top
  const navigateWithTransition = (href: string) => {
    if (href === pathname || transitionState !== 'idle') {
      resetScrollToTop()
      if (href !== pathname) {
        router.push(href)
      }
      return
    }

    clearAllTimers()
    setPendingHref(href)
    setTransitionState('covering')
  }

  // After cover animation finishes (800ms for all 5 staggered strips to reach translateY(0%)),
  // push route & reset scroll
  useEffect(() => {
    if (transitionState === 'covering' && pendingHref) {
      const timer = setTimeout(() => {
        document.body.classList.remove('page-reveal-active')
        document.body.classList.remove('loader-done')
        document.body.classList.remove('loader-wiping')
        
        resetScrollToTop()
        router.push(pendingHref)
      }, 800)

      addTimer(timer)
      return () => clearTimeout(timer)
    }
  }, [transitionState, pendingHref, router])

  // When pathname changes (either via router.push or browser Back/Forward popstate)
  useEffect(() => {
    if (prevPathnameRef.current === pathname) return
    prevPathnameRef.current = pathname

    clearAllTimers()

    const hasInitialLoader = typeof document !== 'undefined' && document.querySelector('.page-loader-overlay')
    if (hasInitialLoader) return

    if (transitionState === 'covering') {
      // Flow A: Programmatic link click navigation
      removeFreezeOverlay()
      resetScrollToTop()
      setTransitionState('uncovering')

      const timerReveal = setTimeout(() => {
        document.body.classList.add('page-reveal-active')
        document.body.classList.add('nav-revealed')
      }, 250)
      addTimer(timerReveal)

      const timerIdle = setTimeout(() => {
        setTransitionState('idle')
        setPendingHref(null)
      }, 800)
      addTimer(timerIdle)

    } else {
      // Flow B: Browser Back or Forward button navigation
      // Current page is held by .page-freeze-overlay while red strips slide UP from bottom (800ms)
      document.body.classList.remove('page-reveal-active')
      document.body.classList.remove('loader-done')
      document.body.classList.remove('loader-wiping')
      
      setTransitionState('covering')
      
      const timerCover = setTimeout(() => {
        // Red strips have fully covered screen (800ms). Now remove frozen snapshot of old page & uncover target page!
        removeFreezeOverlay()
        resetScrollToTop()
        setTransitionState('uncovering')
        
        const timerReveal = setTimeout(() => {
          document.body.classList.add('page-reveal-active')
          document.body.classList.add('nav-revealed')
        }, 250)
        addTimer(timerReveal)
        
        const timerIdle = setTimeout(() => {
          setTransitionState('idle')
        }, 800)
        addTimer(timerIdle)
      }, 800)

      addTimer(timerCover)
    }
  }, [pathname])

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}

      {/* Page Navigation Loader Overlay */}
      {transitionState !== 'idle' && (
        <div
          className={`nav-transition-overlay ${transitionState}`}
          aria-hidden="true"
        >
          <div className="nav-strips-container">
            <div className="nav-strip nav-strip-1" />
            <div className="nav-strip nav-strip-2" />
            <div className="nav-strip nav-strip-3" />
            <div className="nav-strip nav-strip-4" />
            <div className="nav-strip nav-strip-5" />
          </div>
        </div>
      )}
    </PageTransitionContext.Provider>
  )
}

