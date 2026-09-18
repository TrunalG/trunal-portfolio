'use client'

import { AnimatedCTA } from '@/components/AnimatedCTA'
import { TextReveal } from '@/components/TextReveal'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg-image" aria-hidden="true" />
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-viewport-layout">
        {/* Middle-Right H2 Subheadline Block */}
        <TextReveal wrapClassName="hero-statement-block" itemClassName="statement-text" delay={2} as="h2">
          I design and build digital products.<br />
          I like being involved from the first idea<br />
          to the thing people actually use.
        </TextReveal>

        {/* Bottom Row: H1 TRUNAL Left + CTA Right */}
        <div className="hero-bottom-row">
          <TextReveal wrapClassName="title-reveal-wrap" itemClassName="hero-title-blend" delay={1} as="h1">
            TRUNAL
          </TextReveal>

          <TextReveal wrapClassName="hero-cta-corner" delay={3}>
            <AnimatedCTA href="/work" text="View my work" variant="light" />
          </TextReveal>
        </div>
      </div>
    </section>
  )
}
