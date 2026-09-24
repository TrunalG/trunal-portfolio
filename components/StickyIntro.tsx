'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const INTRO_TEXT = "From idea to launch. clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design."

export function StickyIntro() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const sectionEl = sectionRef.current
    const textEl = textRef.current
    if (!sectionEl || !textEl) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: textEl,
        start: 'center center',
        end: '+=900',
        pin: sectionEl,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const words = INTRO_TEXT.split(' ')
  const totalWords = words.length

  return (
    <section ref={sectionRef} className="sticky-intro-section">
      <div className="sticky-intro-content">
        <h2 ref={textRef} className="sticky-intro-text">
          {words.map((word, index) => {
            const startThreshold = index / totalWords
            const endThreshold = (index + 1) / totalWords
            const isLast = index === totalWords - 1

            let fill = 0
            if (progress > startThreshold) {
              fill = Math.min(1, (progress - startThreshold) / (endThreshold - startThreshold))
            }

            return (
              <span key={index} className="scroll-fill-unit">
                <span className="scroll-fill-dim">
                  {word}
                  {!isLast ? ' ' : ''}
                </span>
                <span
                  className="scroll-fill-bright"
                  style={{ opacity: fill }}
                  aria-hidden="true"
                >
                  {word}
                  {!isLast ? ' ' : ''}
                </span>
              </span>
            )
          })}
        </h2>
      </div>
    </section>
  )
}
