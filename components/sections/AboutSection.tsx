import { ScrollText } from '@/components/ScrollText'
import { SectionKicker } from '@/components/SectionKicker'

function Arrow() { return <span aria-hidden="true">↗</span> }

export function AboutSection() {
  return (
    <section className="about section-pad">
      <SectionKicker title="A little more about me" />
      <div className="about-layout">
        <div className="portrait-wrap portrait-placeholder" role="img" aria-label="Future personal photograph placeholder">
          <span>Future personal<br />photograph</span>
          <strong>TRUNAL<br />/ 2026</strong>
        </div>
        <div className="about-copy">
          <ScrollText as="h2" text="I'm Trunal, a designer and developer interested in how people think, how products work, and why some digital experiences feel effortless." />
          <ScrollText as="p" text="Outside of product work, I like photography, games, books, and building things simply because I want to understand how they work." />
          <a className="text-link" href="#contact">Say hello <Arrow /></a>
        </div>
      </div>
    </section>
  )
}
