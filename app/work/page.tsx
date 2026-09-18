'use client'

import { ProjectCard } from '@/components/ProjectCard'
import { TextReveal } from '@/components/TextReveal'
import { SimpleFooter } from '@/components/layout/SimpleFooter'
import { projectsData } from '@/lib/data/projects'

export default function WorkPage() {
  return (
    <main className="site-shell">
      <div className="main-content-relative" style={{ paddingTop: '100px' }}>
        <section className="work section-pad" style={{ minHeight: '80vh', paddingTop: '40px' }}>
          <div style={{ marginBottom: '50px' }}>
            <TextReveal delay={1} itemClassName="page-heading" as="h1">
              Selected Work
            </TextReveal>
          </div>

          <div className="homepage-work-grid">
            {projectsData.map((project, idx) => (
              <TextReveal key={project.id} delay={(idx % 2) + 2}>
                <ProjectCard project={project} />
              </TextReveal>
            ))}
          </div>
        </section>

        <SimpleFooter backLink="/" backText="← Back to Home" />
      </div>
    </main>
  )
}

