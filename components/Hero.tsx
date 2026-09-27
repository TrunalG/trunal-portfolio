'use client'

import { AnimatedCTA } from '@/components/AnimatedCTA'
import { TextReveal } from '@/components/TextReveal'

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg-image" aria-hidden="true" />
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-viewport-layout">
        {/* Desktop-only upper right statement block */}
        <TextReveal wrapClassName="hero-statement-block desktop-only-statement" itemClassName="statement-text" delay={2} as="h2">
          I design and build digital products.<br />
          I like being involved from the first idea<br />
          to the thing people actually use.
        </TextReveal>

        {/* Bottom Row */}
        <div className="hero-bottom-row">
          <TextReveal wrapClassName="title-reveal-wrap" itemClassName="hero-title-blend" delay={1} as="h1">
            TRUNAL
          </TextReveal>

          <div className="hero-mobile-footer-row">
            {/* Mobile-only 3-line left-aligned subheadline below TRUNAL */}
            <TextReveal wrapClassName="hero-statement-block mobile-only-statement" itemClassName="statement-text" delay={2} as="h2">
              I design and build digital products.<br />
              I like being involved from the first idea<br />
              to the thing people actually use.
            </TextReveal>

            <TextReveal wrapClassName="hero-cta-corner" delay={3}>
              <AnimatedCTA href="/work" text="View my work" variant="light" />
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
