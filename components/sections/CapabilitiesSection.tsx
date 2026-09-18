'use client'

import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { ServiceCardBox, ServiceItem } from '@/components/ui/ServiceCardBox'

const SERVICES: ServiceItem[] = [
  {
    id: 'shape',
    number: '01',
    title: 'Shape',
    description: 'Turn an idea into a product with a clear purpose, structure, and direction.',
    image: '/capabilities/1st box.webp',
    tags: ['Product Design', 'UX Architecture', 'User Flows', 'Prototyping'],
  },
  {
    id: 'clarify',
    number: '02',
    title: 'Clarify',
    description: 'Make complex ideas easier to understand, navigate, and use.',
    image: '/capabilities/2nd box.webp',
    tags: ['UI/UX Design', 'Interface Design', 'Interaction Design', 'Responsive Design'],
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description: 'Design and build websites that make your product or business easier to understand.',
    image: '/capabilities/3rd box.webp',
    tags: ['Web Design', 'Landing Pages', 'Frontend Development', 'CMS', 'SEO'],
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch',
    description: 'Take an early idea from concept to a working product people can actually use.',
    image: '/capabilities/4th box.webp',
    tags: ['MVP Development', 'SaaS Products', 'Full-Stack Development', 'Web Applications'],
  },
  {
    id: 'systemize',
    number: '05',
    title: 'Systemize',
    description: 'Create a reusable foundation that keeps digital products consistent as they grow.',
    image: '/capabilities/5th box.webp',
    tags: ['Design Systems', 'UI Libraries', 'Design Tokens', 'Reusable Components'],
  },
]

function AutoFillHeadline() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = ['WHAT', 'I', 'WORK', 'ON']

  return (
    <div ref={containerRef} className="relative mb-12 md:mb-16 pb-2 overflow-hidden">
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold tracking-[-0.06em] leading-[0.88] uppercase select-none inline-block">
        {words.map((word, wIdx) => (
          <span
            key={wIdx}
            className="inline-block transition-colors duration-700 ease-out mr-[0.22em] last:mr-0"
            style={{
              color: isVisible ? '#171715' : 'rgba(23, 23, 21, 0.25)',
              transitionDelay: `${wIdx * 120}ms`,
            }}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  )
}

export const CapabilitiesSection = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="capabilities section-pad bg-[#eeeae2] text-[#171715] min-h-screen relative z-30 overflow-hidden" {...props}>
      {/* Top Headline Block with Automatic Viewport Entrance Color-Fill */}
      <AutoFillHeadline />

      {/* Services List using Standalone ServiceCardBox Component */}
      <div
        className="services-list flex flex-col"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {SERVICES.map((service, index) => (
          <ServiceCardBox
            key={service.id}
            service={service}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
          />
        ))}
      </div>
    </section>
  )
})
CapabilitiesSection.displayName = 'CapabilitiesSection'
