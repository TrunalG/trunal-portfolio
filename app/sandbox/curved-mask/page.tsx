import React from 'react'
import { CurvedMaskImage } from '@/components/sandbox/CurvedMaskImage'

export default function CurvedMaskSandboxPage() {
  return (
    <main className="site-shell" style={{ minHeight: '300vh', background: 'var(--paper, #f4f1ea)', overflowX: 'hidden' }}>
      <div className="main-content-relative" style={{ paddingTop: '100px', paddingBottom: '200px' }}>
        
        {/* Sandbox Header */}
        <section className="section-pad" style={{ marginBottom: '60px' }}>
          <span className="case-study-label">(SANDBOX PREVIEW)</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.03em', margin: '16px 0' }}>
            Scroll-Driven Curved Mask Sandbox
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', opacity: 0.8 }}>
            Scroll down slowly to test Phase 1 (Top curve flattens to straight rectangle) and Phase 2 (Bottom edge curves upwards).
          </p>
        </section>

        {/* Full Viewport Width Curved Mask Image (Edge-to-Edge) */}
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
          <CurvedMaskImage
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85"
            alt="Agora Camera Lens Presentation"
            maxCurve={0.14}
          />
        </div>

        {/* Scroll Space to demonstrate phase transitions */}
        <section className="section-pad" style={{ marginTop: '100px' }}>
          <div style={{ padding: '60px', border: '1px dashed var(--line, rgba(0,0,0,0.15))', borderRadius: '16px', textAlign: 'center' }}>
            <h2>Scroll Content Below Cover Image</h2>
            <p style={{ marginTop: '16px', opacity: 0.7 }}>
              As this section enters the viewport, the bottom curve reaches its final curved state. Scrolling back up reverses the curve smoothly.
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}
