'use client'

import { ProjectCard } from '@/components/ProjectCard'
import { TextReveal } from '@/components/TextReveal'
import { FooterReel } from '@/components/sections/FooterReel'
import { projectsData } from '@/lib/data/projects'

export default function WorkPage() {
  return (
    <main className="site-shell">
      <div className="main-content-relative" style={{ paddingTop: '120px' }}>
        <section className="section-pad" style={{ minHeight: '80vh', paddingTop: '40px', background: 'var(--paper)' }}>
          
          {/* 2-Column Editorial Header (Title + Overview) */}
          <div className="project-detail-hero" style={{ marginBottom: '80px' }}>
            <TextReveal delay={1} wrapClassName="title-reveal-wrap" itemClassName="project-detail-heading" as="h1">
              Selected Work
            </TextReveal>

            <TextReveal delay={2}>
              <span className="case-study-label">(Overview)</span>
              <p className="project-intro-text">
                A selection of products I’ve designed and built.<br />
                From early ideas to things people can actually use.
              </p>
            </TextReveal>
          </div>

          {/* Project Grid */}
          <div className="homepage-work-grid">
            {projectsData.map((project, idx) => (
              <TextReveal key={project.id} delay={(idx % 2) + 2}>
                <ProjectCard project={project} />
              </TextReveal>
            ))}
          </div>
        </section>

        <FooterReel />
      </div>
    </main>
  )
}

