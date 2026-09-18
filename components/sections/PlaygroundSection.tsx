import { ScrollText } from '@/components/ScrollText'
import { SectionKicker } from '@/components/SectionKicker'

function Arrow() { return <span aria-hidden="true">↗</span> }

export function PlaygroundSection() {
  return (
    <section className="playground section-pad" id="playground">
      <SectionKicker title="Playground" />
      <div className="playground-layout">
        <div>
          <ScrollText as="h2" text="A place for strange ideas." emphasisWords={['strange', 'ideas.']} />
          <ScrollText as="p" text="Small tools, interaction experiments, game sketches, and things that don't need a client brief to exist." />
        </div>
        <div className="play-card">
          <div className="play-shape" />
          <span>Experiment 001 / UI study</span>
          <strong>Everything is<br />a prototype.</strong>
          <Arrow />
        </div>
      </div>
    </section>
  )
}
