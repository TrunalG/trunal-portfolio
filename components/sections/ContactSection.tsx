import { ScrollText } from '@/components/ScrollText'
import { SectionKicker } from '@/components/SectionKicker'

function Arrow() { return <span aria-hidden="true">↗</span> }

export function ContactSection() {
  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-top">
        <SectionKicker title="Contact" />
        <span className="contact-note">Have a good one.</span>
      </div>
      <ScrollText as="h2" text="Have something worth building?" emphasisWords={['worth', 'building?']} />
      <ScrollText as="p" text="Whether you have a product idea, an existing product that needs work, or you're looking for someone who can design and build, I'd like to hear about it." />
      <div className="contact-actions">
        <a className="button button-accent" href="mailto:hello@trunal.design">Book a project <Arrow /></a>
        <a className="text-link light-link" href="mailto:hello@trunal.design">Contact me <Arrow /></a>
      </div>
      <div className="opportunity">
        <span>Looking for someone to join your team?</span>
        <a href="mailto:hello@trunal.design">Available for opportunities <Arrow /></a>
      </div>
      <footer>
        <span>© Trunal 2026</span>
        <div>
          <a href="#top">X</a>
          <a href="#top">LinkedIn</a>
          <a href="#top">GitHub</a>
          <a href="mailto:hello@trunal.design">Email</a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
