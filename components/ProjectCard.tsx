'use client'

import React from 'react'
import { Project } from '@/lib/data/projects'
import { usePageTransition } from '@/components/layout/PageTransition'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const { navigateWithTransition } = usePageTransition()
  const targetHref = `/work/${project.slug}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigateWithTransition(targetHref)
  }

  return (
    <a
      href={targetHref}
      onClick={handleClick}
      className={`project-card-wrapper ${className}`}
    >
      <article className="project-card">
        <div className={`project-card-image ${project.className || ''}`}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="card-img" />
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

        <div className="project-card-meta">
          <h3 className="project-card-title">{project.title}</h3>
          <span className="project-card-role">{project.role}</span>
        </div>
      </article>
    </a>
  )
}
