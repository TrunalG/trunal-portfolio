import { ScrollText } from '@/components/ScrollText'
import { SectionKicker } from '@/components/SectionKicker'

function Arrow() { return <span aria-hidden="true">↗</span> }

export function CurrentlySection() {
  return (
    <section className="currently section-pad">
      <SectionKicker title="Currently" note="A living snapshot" />
      <ScrollText as="h2" text="Right now, I'm..." />
      <div className="currently-grid">
        {[
          ['Building', 'A calmer way to learn online'],
          ['Learning', 'The shape of good product decisions'],
          ['Exploring', 'Photography after dark'],
          ['Reading', 'A book about making things'],
          ['Playing', 'Something with a very small map'],
        ].map(([label, value]) => (
          <div className="current-item" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <Arrow />
          </div>
        ))}
      </div>
    </section>
  )
}
