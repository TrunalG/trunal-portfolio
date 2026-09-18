import { ScrollText } from '@/components/ScrollText'
import { SectionKicker } from '@/components/SectionKicker'

const archive = [
  ['Photography', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85'],
  ['Games', 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85'],
  ['Books', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85'],
  ['Experiments', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

export function ArchiveSection() {
  return (
    <section className="archive section-pad">
      <SectionKicker title="Personal archive" note="Things that keep me curious" />
      <div className="archive-intro">
        <ScrollText as="h2" text="Not work. Still important." emphasisWords={['Still', 'important.']} />
        <ScrollText as="p" text="A small collection of photographs, games, books, and experiments. The edges of the practice matter too." />
      </div>
      <div className="archive-grid">
        {archive.map(([label, image]) => (
          <a className="archive-item" href="#playground" key={label}>
            <img src={image} alt="" />
            <span>{label}</span>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  )
}
