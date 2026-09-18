'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import Particles from '@/components/ui/Particles'

interface HowIThinkReelProps {
  nextSectionRef?: React.RefObject<HTMLDivElement | null>
}

export function HowIThinkReel({ nextSectionRef }: HowIThinkReelProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesWrapRef = useRef<HTMLDivElement | null>(null)
  const baseBgRef = useRef<HTMLDivElement | null>(null)
  const statementsRef = useRef<(HTMLHeadingElement | null)[]>([])

  const statements = [
    'built different',
    'design with purpose',
    'code with passion',
    'create with vision',
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const sectionEl = sectionRef.current
    const canvasEl = canvasRef.current
    if (!sectionEl || !canvasEl) return

    const statementElements = statementsRef.current.filter(Boolean) as HTMLHeadingElement[]
    if (statementElements.length < 4) return

    // Pre-position nextSectionRef if passed (kept for backwards compatibility)
    if (nextSectionRef && nextSectionRef.current) {
      gsap.set(nextSectionRef.current, { clearProps: 'all' })
    }

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    // Realistic PBR Environment Map for Visor Mirror Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    // Calibrated Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(5, 8, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8)
    fillLight.position.set(-5, 4, -4)
    scene.add(fillLight)

    // Load sRGB PBR Textures for GLTF materials
    const texLoader = new THREE.TextureLoader()

    const diffuse0 = texLoader.load(
      '/animated-astronaut-character-in-space-suit-loop/textures/gltf_embedded_0.png'
    )
    diffuse0.colorSpace = THREE.SRGBColorSpace
    diffuse0.flipY = false

    const normal2 = texLoader.load(
      '/animated-astronaut-character-in-space-suit-loop/textures/gltf_embedded_2.png'
    )
    normal2.flipY = false

    const diffuse4 = texLoader.load(
      '/animated-astronaut-character-in-space-suit-loop/textures/gltf_embedded_4.png'
    )
    diffuse4.colorSpace = THREE.SRGBColorSpace
    diffuse4.flipY = false

    const normal6 = texLoader.load(
      '/animated-astronaut-character-in-space-suit-loop/textures/gltf_embedded_6.png'
    )
    normal6.flipY = false

    // 3D Model Pivot Group
    const pivotGroup = new THREE.Group()
    scene.add(pivotGroup)

    let astronautModel: THREE.Group | null = null
    let mixer: THREE.AnimationMixer | null = null

    // Load Animated Astronaut Character GLB
    const loader = new GLTFLoader()
    loader.load(
      '/animated_astronaut_character_in_space_suit_loop.glb',
      async (gltf) => {
        astronautModel = gltf.scene

        // Center model geometry at origin
        const box = new THREE.Box3().setFromObject(astronautModel)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        astronautModel.position.sub(center)
        astronautModel.position.y -= size.y * 0.05

        // Extract embedded textures directly from GLTF parser dependencies
        try {
          const [d0, s1, n2, d4, s5, n6] = await Promise.all([
            gltf.parser.getDependency('texture', 0).catch(() => null),
            gltf.parser.getDependency('texture', 1).catch(() => null),
            gltf.parser.getDependency('texture', 2).catch(() => null),
            gltf.parser.getDependency('texture', 4).catch(() => null),
            gltf.parser.getDependency('texture', 5).catch(() => null),
            gltf.parser.getDependency('texture', 6).catch(() => null),
          ])

          const t0 = d0 || diffuse0
          const t4 = d4 || diffuse4

          if (t0) t0.colorSpace = THREE.SRGBColorSpace
          if (t4) t4.colorSpace = THREE.SRGBColorSpace

          astronautModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh
              if (mesh.material) {
                const origMat = (Array.isArray(mesh.material)
                  ? mesh.material[0]
                  : mesh.material) as THREE.MeshStandardMaterial
                const matName = origMat.name

                if (matName === 'material_0') {
                  mesh.material = new THREE.MeshStandardMaterial({
                    map: t0,
                    normalMap: n2 || normal2,
                    roughness: 0.65,
                    metalness: 0.05,
                    side: THREE.DoubleSide,
                  })
                } else if (matName === 'material_1') {
                  // Dark reflective metallic visor glass matching original model screenshots
                  mesh.material = new THREE.MeshStandardMaterial({
                    color: 0x181510,
                    metalness: 0.95,
                    roughness: 0.08,
                    envMapIntensity: 3.2,
                    side: THREE.DoubleSide,
                  })
                } else if (matName === 'material_2') {
                  mesh.material = new THREE.MeshStandardMaterial({
                    map: t4,
                    normalMap: n6 || normal6,
                    roughness: 0.55,
                    metalness: 0.1,
                    side: THREE.DoubleSide,
                  })
                }
              }
            }
          })
        } catch (err) {
          console.error('Error parsing embedded GLTF textures:', err)
        }

        pivotGroup.add(astronautModel)

        // Play ONLY the hand 'wave' animation clip
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(astronautModel)
          const waveClip =
            gltf.animations.find((c) => c.name.toLowerCase().includes('wave')) || gltf.animations[0]
          if (waveClip) {
            const action = mixer.clipAction(waveClip)
            action.reset()
            action.setEffectiveTimeScale(1.0)
            action.setEffectiveWeight(1.0)
            action.play()
          }
        }
      },
      undefined,
      (err) => console.error('Error loading GLTF astronaut model:', err)
    )

    // Mouse Tracking State for Parallax Tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to +1
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to +1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation state driven by GSAP scroll timeline
    const animState = {
      opacity: 0,
      scale: 0.05,
      rotY: 0,
      rotX: 0,
      posZ: 0,
      posY: -0.3,
      bgOpacity: 0,
      bgScale: 1.0,
    }

    // Animation loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Update skeletal animation mixer (Hand wave clip)
      if (mixer) {
        mixer.update(delta)
      }

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      if (pivotGroup) {
        pivotGroup.scale.setScalar(animState.scale)
        pivotGroup.position.set(0, animState.posY, animState.posZ)

        // Direct forward-facing tilt (no 360 spin):
        // mouse.x > 0 (right) -> rotY increases (tilts right)
        // mouse.y > 0 (down) -> rotX increases (tilts down), mouse.y < 0 (up) -> rotX decreases (tilts up)
        pivotGroup.rotation.y =
          animState.rotY + mouse.x * 0.35 + Math.sin(elapsedTime * 0.8) * 0.04
        pivotGroup.rotation.x =
          animState.rotX + mouse.y * 0.25 + Math.cos(elapsedTime * 0.6) * 0.03
      }

      // Apply opacity to canvas & Particles background wrap
      if (canvasEl) {
        canvasEl.style.opacity = String(animState.opacity)
      }
      if (particlesWrapRef.current) {
        particlesWrapRef.current.style.opacity = String(animState.bgOpacity)
        particlesWrapRef.current.style.transform = `scale(${animState.bgScale})`
      }
      if (baseBgRef.current) {
        baseBgRef.current.style.opacity = String(1 - animState.bgOpacity)
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      if (!canvasEl) return
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // --- GSAP SCROLLTRIGGER TIMELINE ---
    const ctx = gsap.context(() => {
      // Position statement 1 initially centered (0%), others below screen (100%)
      statementElements.forEach((el, idx) => {
        if (idx === 0) {
          gsap.set(el, { y: '0%', autoAlpha: 1 })
        } else {
          gsap.set(el, { y: '100%', autoAlpha: 0 })
        }
      })

      const triggerEl = sectionEl.closest('.sticky-thinking-wrapper') || sectionEl

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: '+=2400',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      // Smooth Roll-Up Animation Mechanics (power2.inOut easing)
      // Step 1: "built different" rolls UP -> "design with purpose" rolls UP from bottom
      tl.to(
        statementElements[0],
        { y: '-100%', autoAlpha: 0, duration: 1, ease: 'power2.inOut' },
        'step1'
      ).to(
        statementElements[1],
        { y: '0%', autoAlpha: 1, duration: 1, ease: 'power2.inOut' },
        'step1'
      )

      // Step 2: "design with purpose" rolls UP -> "code with passion" rolls UP from bottom
      tl.to(
        statementElements[1],
        { y: '-100%', autoAlpha: 0, duration: 1, ease: 'power2.inOut' },
        'step2'
      ).to(
        statementElements[2],
        { y: '0%', autoAlpha: 1, duration: 1, ease: 'power2.inOut' },
        'step2'
      )

      // Step 3: "code with passion" rolls UP -> "create with vision" rolls UP from bottom
      tl.to(
        statementElements[2],
        { y: '-100%', autoAlpha: 0, duration: 1, ease: 'power2.inOut' },
        'step3'
      ).to(
        statementElements[3],
        { y: '0%', autoAlpha: 1, duration: 1, ease: 'power2.inOut' },
        'step3'
      )

      // Step 4: Statement 4 ("create with vision") rolls UP and OUT completely
      tl.to(
        statementElements[3],
        { y: '-100%', autoAlpha: 0, duration: 1.2, ease: 'power2.inOut' },
        'textExit'
      )

      // Phase 1: At ~70% text exit (textExit+=0.35), BOTH the space background and tiny astronaut model fade in behind text 4
      tl.to(
        animState,
        {
          bgOpacity: 1.0,
          opacity: 1.0,
          scale: 0.15,
          posZ: 0.1,
          posY: -0.25,
          duration: 0.8,
          ease: 'power1.out',
        },
        'textExit+=0.35'
      )

      // Phase 2: As statement 4 completes exit, space background and astronaut model zoom in together continuously
      tl.to(
        animState,
        {
          bgScale: 2.2,
          scale: 1.22,
          posZ: 1.2,
          posY: -0.1,
          rotY: 0,
          rotX: 0.02,
          duration: 3.5,
          ease: 'power1.out',
        },
        'zoomStart'
      )
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      pmremGenerator.dispose()
      renderer.dispose()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="how-i-think-section bg-[#131316] text-[#EEEAE2] relative z-10 overflow-hidden">
      {/* Base #131316 Background Layer (Fades OUT as Particles fade IN at 70% text exit) */}
      <div ref={baseBgRef} className="absolute inset-0 bg-[#131316] z-0 transition-opacity duration-300" />

      {/* Configured High-Density Dual-Layer Space Starfield (Fades IN at 70% text exit) */}
      <div
        ref={particlesWrapRef}
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 overflow-hidden"
        style={{ opacity: 0, transformOrigin: 'center center' }}
      >
        {/* Layer 1: Background Deep Galaxy Star Dust (550 micro-stars) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={['#ffffff', '#e0e7ff', '#ffffff']}
            particleCount={550}
            particleSpread={20}
            speed={0.08}
            particleBaseSize={65}
            particleHoverFactor={1.2}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* Layer 2: Foreground Glowing Interactive Stars (250 bright stars) */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <Particles
            particleColors={['#ffffff', '#ffffff', '#c7d2fe']}
            particleCount={250}
            particleSpread={12}
            speed={0.12}
            particleBaseSize={120}
            particleHoverFactor={2.2}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </div>

      {/* Top Center Section Header Tag - Bold & Tight matching hero subheadline style */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-20 text-sm md:text-base font-semibold text-[#EEEAE2] opacity-90 tracking-[-0.04em] select-none pointer-events-none">
        (Our Vision)
      </div>

      <div className="how-i-think-container relative z-10">
        {/* 3D Roll-Up Statement Titles */}
        <div className="how-i-think-text-viewport">
          {statements.map((text, idx) => (
            <h2
              key={idx}
              ref={(el) => {
                statementsRef.current[idx] = el
              }}
              className="how-i-think-title"
            >
              {text}
            </h2>
          ))}
        </div>

        {/* WebGL 3D Canvas Scene */}
        <canvas ref={canvasRef} className="how-i-think-canvas" />
      </div>

      {/* Bottom Center Scroll Hint matching reference design */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 text-xs md:text-sm font-medium text-[#77746D] tracking-wide select-none pointer-events-none">
        (Scroll for more)
      </div>
    </section>
  )
}
