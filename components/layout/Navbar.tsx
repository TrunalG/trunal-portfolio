'use client'

import React, { useState, useEffect } from 'react'
import { usePageTransition } from './PageTransition'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  variant?: 'light' | 'dark'
}

export function Navbar({ variant = 'light' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { navigateWithTransition, triggerSectionTransition } = usePageTransition()
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)

    const isHash = href.includes('#')
    const targetId = isHash ? href.split('#')[1] : null

    // If on the home page and clicking a section link or home link
    if (pathname === '/' && (isHash || href === '/' || href === '/#home')) {
      e.preventDefault()
      const target = targetId || 'home'
      triggerSectionTransition(target)
      return
    }

    // If on a different page and navigating to a section or page
    if (href.startsWith('/') && href !== pathname) {
      e.preventDefault()
      navigateWithTransition(href)
    }
  }

  const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <nav
      className={`site-nav hero-reveal-nav ${menuOpen ? 'is-open' : ''} ${variant === 'dark' ? 'is-dark' : ''}`}
      aria-label="Main navigation"
    >
      <a className="wordmark" href="/" onClick={(e) => handleNavClick(e, '/')}>
        T<span>®</span>
      </a>
      <div className="nav-links">
        {navItems.map((item) => (
          <a
            key={item.label}
            className="nav-link-item"
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            <span className="nav-link-roll">
              <span className="nav-link-text">{item.label}</span>
              <span className="nav-link-text" aria-hidden="true">
                {item.label}
              </span>
            </span>
          </a>
        ))}
      </div>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </nav>
  )
}

