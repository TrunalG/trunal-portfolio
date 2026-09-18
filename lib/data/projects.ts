export interface Project {
  id: string
  slug: string
  title: string
  role: string
  type: string
  description: string
  image?: string
  className: string
  featured: boolean
  year: string
  kicker: string
  tagline: string
  introduction: string
  challenge: string
  client: string
  services: string
  finalThoughts: string
  liveUrl: string
  heroImage?: string
  gallery: string[]
}

export const projectsData: Project[] = [
  {
    id: '01',
    slug: 'agora',
    title: 'Agora',
    role: 'Product Design & Development',
    type: 'Product design / Development / MVP',
    description: 'A community-driven platform built around people, knowledge, and the idea that learning becomes better when people learn from each other.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85',
    className: 'project-agora',
    featured: true,
    year: '(©26)',
    kicker: 'AGORA / COMMUNITY',
    tagline: 'What are you learning lately?',
    introduction: "This project wasn't just about design — it was about creating a meaningful tool that drives results. From strategy to execution, we focused on building an intuitive digital experience.",
    challenge: "Aligning the brand's long-term strategy with a clear digital concept required balancing ambition with clarity. The challenge was shaping a flexible foundation that could support growth while keeping the messaging focused and easy to understand.",
    client: 'Agora Inc',
    services: 'Product Design, Web Development',
    finalThoughts: 'The outcome is a cohesive concept that connects strategy with visual direction. By simplifying the narrative and structuring the digital presence, the project creates a strong foundation for future expansion.',
    liveUrl: '#live-project',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=85'
    ]
  },
  {
    id: '02',
    slug: 'a-little-less-stuff',
    title: 'A little less stuff',
    role: 'Product Concept & UX',
    type: 'Product concept / UX',
    description: 'A tool designed to help people pause and think before buying unnecessary products online.',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1400&q=85',
    className: 'project-less',
    featured: true,
    year: '(©26)',
    kicker: 'PRODUCT CONCEPT / 2026',
    tagline: 'Buy less. Choose better.',
    introduction: 'An intentional counter-pattern for e-commerce, creating space for reflection between impulse and online checkout.',
    challenge: 'Redefining the default e-commerce user journey to encourage intentional choices without sacrificing clarity or usability.',
    client: 'Self-directed Concept',
    services: 'UX Research, Concept Design',
    finalThoughts: 'By introducing mindful friction at key decision points, the interface transforms unconscious spending into conscious reflection.',
    liveUrl: '#live-project',
    gallery: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85'
    ]
  },
  {
    id: '03',
    slug: 'untitled-game',
    title: 'Untitled game',
    role: 'Game Design & Pixel Art',
    type: 'Currently in development',
    description: 'A 2D pixel-art, story-driven desktop game. A small world, still taking shape.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85',
    className: 'project-game',
    featured: true,
    year: '(©26)',
    kicker: 'GAME DEVELOPMENT / 2026',
    tagline: 'A small world, still taking shape.',
    introduction: 'An exploration into atmospheric storytelling, custom engine logic, and hand-crafted pixel art environments.',
    challenge: 'Creating a quiet, tactile world where interactions feel deliberate and atmospheric mechanics serve the narrative.',
    client: 'Personal Project',
    services: 'Game Design, Pixel Art, Audio',
    finalThoughts: 'A labor of curiosity combining nostalgic pixel aesthetics with modern interactive storytelling.',
    liveUrl: '#live-project',
    gallery: [
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=85'
    ]
  },
  {
    id: '04',
    slug: 'interface-systems',
    title: 'Interface Systems',
    role: 'Design System & UI Architecture',
    type: 'Design Systems / Engineering',
    description: 'A modular, high-performance UI system designed for complex web applications and rapid prototyping.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=85',
    className: 'project-systems',
    featured: true,
    year: '(©25)',
    kicker: 'DESIGN SYSTEM / 2025',
    tagline: 'Precision at scale.',
    introduction: 'A comprehensive component library built for speed, accessibility, and fluid design-to-code alignment.',
    challenge: 'Maintaining design token flexibility across multiple platforms while keeping DOM execution overhead near zero.',
    client: 'Open Source',
    services: 'UI Architecture, Design Tokens',
    finalThoughts: 'Streamlined design operations and reduced component engineering time across full-stack applications.',
    liveUrl: '#live-project',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=85'
    ]
  },
  {
    id: '05',
    slug: 'ethereal-canvas',
    title: 'Ethereal Canvas',
    role: 'Interactive Web & Motion',
    type: 'Interactive Web / Motion',
    description: 'Generative shader animations and scroll-driven experiences built for immersive storytelling.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    className: 'project-ethereal',
    featured: true,
    year: '(©26)',
    kicker: 'MOTION & DEV / 2026',
    tagline: 'Sculpting light and dynamic interfaces.',
    introduction: 'An exploration of real-time GPU shaders and WebGL interactions seamlessly integrated into responsive layouts.',
    challenge: 'Achieving 60 FPS fluid rendering on mobile devices while maintaining complex visual compositions.',
    client: 'Creative Lab',
    services: 'Interactive Dev, Shader Motion',
    finalThoughts: 'Created a memorable web showcase that elevates digital storytelling.',
    liveUrl: '#live-project',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85'
    ]
  }
]
