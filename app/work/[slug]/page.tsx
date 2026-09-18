import { notFound } from 'next/navigation'
import { ProjectCard } from '@/components/ProjectCard'
import { AnimatedCTA } from '@/components/AnimatedCTA'
import { StickyCaseStudySection } from '@/components/StickyCaseStudySection'
import { TextReveal } from '@/components/TextReveal'
import { SimpleFooter } from '@/components/layout/SimpleFooter'
import { CurvedMaskImage } from '@/components/CurvedMaskImage'
import { projectsData } from '@/lib/data/projects'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  // Find 2 suggested/related projects (excluding current project)
  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id)
    .slice(0, 2)

  return (
    <main className="site-shell">
      <div className="main-content-relative" style={{ paddingTop: '120px' }}>
        <section className="section-pad">
          
          {/* STAGE 1: Hero Title & Introduction (1.png & 2.png) */}
          <div className="project-detail-hero">
            <TextReveal delay={1} wrapClassName="title-reveal-wrap" itemClassName="project-detail-heading" as="h1">
              {project.title}
            </TextReveal>

            <TextReveal delay={2}>
              <span className="case-study-label">(Introduction)</span>
              <p className="project-intro-text">
                {project.introduction || project.description}
              </p>
            </TextReveal>
          </div>

          {/* STAGE 1 Hero Cover Image with Full Viewport Width Curved Mask Animation */}
          <div
            style={{
              width: '100vw',
              position: 'relative',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              height: 'clamp(450px, 75vh, 850px)',
              marginBottom: '100px',
            }}
          >
            {project.heroImage || project.gallery[0] ? (
              <CurvedMaskImage
                src={project.heroImage || project.gallery[0]}
                alt={project.title}
                maxCurve={0.14}
              />
            ) : (
              <div className="product-ui" aria-label={`${project.title} presentation`}>
                <span className="ui-topline">{project.kicker}</span>
                <div className="ui-layout">
                  <div className="ui-sidebar">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="ui-main">
                    <span className="ui-kicker">{project.kicker}</span>
                    <strong>{project.tagline}</strong>
                    <div className="ui-lines">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STAGE 2: Two-Column Sticky Case Study Layout (3.png, 4.png, 5.png, work sec. anim.mp4) */}
          <StickyCaseStudySection
            challenge={project.challenge}
            client={project.client}
            year={project.year}
            services={project.services}
            gallery={project.gallery}
          />

          {/* STAGE 3: Full-Width Showcase & Conclusion (5.png bottom & 6.png) */}
          <div style={{ margin: '140px 0 100px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              marginBottom: '100px'
            }}>
              {project.gallery.slice(0, 2).map((imgSrc, idx) => (
                <div key={idx} className="gallery-image-wrap" style={{ aspectRatio: '16 / 10' }}>
                  <img src={imgSrc} alt={`${project.title} detail ${idx + 1}`} />
                </div>
              ))}
            </div>

            {/* Final Thoughts & Animated CTA Button */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'end'
            }}>
              <div />
              <div>
                <span className="case-study-label">(Final thoughts)</span>
                <p style={{
                  fontSize: 'clamp(18px, 2.2vw, 28px)',
                  lineHeight: '1.4',
                  fontWeight: 500,
                  letterSpacing: '-.03em',
                  color: 'var(--ink)',
                  marginBottom: '40px'
                }}>
                  {project.finalThoughts}
                </p>

                <AnimatedCTA href={project.liveUrl} text="Live Project" variant="dark" />
              </div>
            </div>
          </div>

          {/* STAGE 4: Related Works Section (7.png, 8.png, 9.png) */}
          <div style={{ paddingTop: '120px', borderTop: '1px solid var(--line)' }}>
            <div className="related-works-header">
              <span className="case-study-label">(Portfolio 23-26©)</span>
              <h2>Related Works</h2>
            </div>

            <div className="homepage-work-grid">
              {relatedProjects.map((related) => (
                <ProjectCard key={related.id} project={related} />
              ))}
            </div>
          </div>

        </section>

        <SimpleFooter backLink="/work" backText="← All Projects" />
      </div>
    </main>
  )
}
