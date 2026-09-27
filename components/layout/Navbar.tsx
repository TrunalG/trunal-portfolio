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

  // Prevent background scroll when mobile menu drawer is open
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

        {/* Desktop Navigation Links */}
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

        {/* Mobile Menu Hamburger Toggle */}
        <button
          className={`menu-toggle ${menuOpen ? 'is-active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-container">
          {/* Main Navigation Links */}
          <div className="mobile-nav-section">
            <span className="mobile-section-label">Navigation</span>
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    className="mobile-nav-link"
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mobile-menu-divider" />

          {/* Quick Contact & Social Links */}
          <div className="mobile-contact-section">
            <div className="mobile-contact-block">
              <span className="mobile-section-label">Get In Touch</span>
              <a
                href="mailto:dsgnclave@gmail.com"
                className="mobile-email-link"
              >
                dsgnclave@gmail.com
              </a>
            </div>

            <div className="mobile-socials-block">
              <span className="mobile-section-label">Socials</span>
              <div className="mobile-socials-list">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link-item group"
                  >
                    <span className="footer-social-text">{link.label}</span>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
