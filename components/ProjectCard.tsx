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
  const [pointerState, setPointerState] = React.useState({ x: 0, y: 0, visible: false })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigateWithTransition(targetHref)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPointerState({ x: e.clientX, y: e.clientY, visible: true })
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPointerState({ x: e.clientX, y: e.clientY, visible: true })
  }

  const handleMouseLeave = () => {
    setPointerState((prev) => ({ ...prev, visible: false }))
  }

  return (
    <a
      href={targetHref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      {/* Custom Dynamic Inverting Monochromatic Pill Pointer */}
      <div
        className={`custom-card-pointer ${pointerState.visible ? 'is-active' : ''}`}
        style={{
          left: `${pointerState.x}px`,
          top: `${pointerState.y}px`,
        }}
      >
        <span>view project</span>
      </div>
    </a>
  )
}
