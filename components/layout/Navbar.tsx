'use client'

import React, { useState, useEffect } from 'react'
import { usePageTransition } from './PageTransition'
import { usePathname } from 'next/navigation'
import { AnimatedCTA } from '@/components/AnimatedCTA'

interface NavbarProps {
  variant?: 'light' | 'dark'
}

export function Navbar({ variant = 'light' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { navigateWithTransition, triggerSectionTransition } = usePageTransition()
  const pathname = usePathname()

  // Lock body scroll when mobile menu drawer is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

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

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/designclave?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/designclave?igsh=MWdvaG85dmx1bDhtYw==',
    },
    {
      label: 'X',
      href: 'https://x.com/designClave',
    },
  ]

  return (
    <>
      <nav
        className={`site-nav hero-reveal-nav ${menuOpen ? 'is-open' : ''} ${variant === 'dark' ? 'is-dark' : ''}`}
        aria-label="Main navigation"
      >
        <a className="wordmark" href="/" onClick={(e) => handleNavClick(e, '/')}>
          T<span>®</span>
        </a>

        {/* Desktop Navbar Links (Hidden on mobile) */}
        <div className="nav-links desktop-nav-links">
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

        {/* Mobile Single Toggle Button (2 lines morphing to X) */}
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

      {/* Full-Screen Mobile Menu Drawer (Right to Left Slide-In) */}
      <div className={`mobile-menu-drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-container">
          {/* Main Navigation Links with Text Roll Animations */}
          <div className="mobile-nav-block">
            <span className="mobile-section-label">(Navigation)</span>
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="mobile-nav-link-item"
                  >
                    <span className="mobile-nav-roll">
                      <span className="mobile-nav-text">{item.label}</span>
                      <span className="mobile-nav-text" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Socials Block */}
          <div className="mobile-info-block">
            <div className="mobile-contact-subblock">
              <span className="mobile-section-label">(Contact)</span>
              <AnimatedCTA
                href="mailto:dsgnclave@gmail.com"
                text="dsgnclave@gmail.com"
                variant="light"
                showArrow={false}
                className="!text-lg sm:!text-xl font-medium"
              />
            </div>

            <div className="mobile-socials-subblock">
              <span className="mobile-section-label">(Socials)</span>
              <ul className="mobile-socials-list">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link-item group"
                    >
                      <span>{link.label}</span>
                      <span className="footer-social-arrow-box">
                        <span className="footer-social-arrow-icon" aria-hidden="true">
                          <svg
                            className="w-[18px] h-[18px]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
