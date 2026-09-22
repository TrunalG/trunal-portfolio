'use client'

import React from 'react'
import { ScrollText } from '@/components/ScrollText'
import { SectionKicker } from '@/components/SectionKicker'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function FooterReel() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-top">
        <SectionKicker title="Contact" />
        <span className="contact-note">Have a good one.</span>
      </div>
      <div className="mb-8 md:mb-12">
        <ScrollText as="h2" text="Have something" className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold uppercase tracking-[-0.05em] leading-[0.92] text-white block mb-2" />
        <ScrollText as="h2" text="worth building?" emphasisWords={['worth', 'building?']} className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-normal block pl-1 opacity-90" />
      </div>
      <ScrollText as="p" text="Whether you have a product idea, an existing product that needs work, or you're looking for someone who can design and build, I'd like to hear about it." />
      <div className="contact-actions">
        <a className="button button-accent" href="mailto:dsgnclave@gmail.com">
          Book a project <Arrow />
        </a>
        <a className="text-link light-link" href="mailto:dsgnclave@gmail.com">
          Contact me <Arrow />
        </a>
      </div>
      <div className="opportunity">
        <span>Looking for someone to join your team?</span>
        <a href="mailto:dsgnclave@gmail.com">
          Available for opportunities <Arrow />
        </a>
      </div>
      <footer>
        <span>© Trunal 2026</span>
        <div>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:dsgnclave@gmail.com">Email</a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
