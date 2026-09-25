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
    image: '/selected work projects/agora.png',
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
    heroImage: '/selected work projects/agora.png',
    gallery: [
      '/selected work projects/agora.png',
      '/selected work projects/agora.png',
    ]
  },
  {
    id: '02',
    slug: 'ledger-studio',
    title: 'Ledger Studio',
    role: 'Product Design & Strategy',
    type: 'Product Design & Development',
    description: 'A modern studio platform designed for financial clarity, workflow tracking, and seamless data visualization.',
    image: '/selected work projects/ledger studio.png',
    className: 'project-ledger',
    featured: true,
    year: '(©26)',
    kicker: 'LEDGER STUDIO / 2026',
    tagline: 'Financial design & studio platform',
    introduction: 'A comprehensive studio dashboard built to simplify complex financial workflows and data insights for creative teams.',
    challenge: 'Structuring dense financial metrics into clean, digestible visual modules while maintaining peak performance.',
    client: 'Ledger Studio',
    services: 'UX/UI Design, Web Development',
    finalThoughts: 'Created an intuitive system that streamlines financial operations into a clear, engaging visual experience.',
    liveUrl: '#live-project',
    heroImage: '/selected work projects/ledger studio.png',
    gallery: [
      '/selected work projects/ledger studio.png',
      '/selected work projects/ledger studio.png',
    ]
  },
  {
    id: '03',
    slug: 'should-i-buy-this',
    title: 'Should I buy this',
    role: 'Product Concept & UX',
    type: 'Product concept / UX',
    description: 'A tool designed to help people pause and think before buying unnecessary products online.',
    image: '/selected work projects/should i buy this.png',
    className: 'project-should-i-buy',
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
    heroImage: '/selected work projects/should i buy this.png',
    gallery: [
      '/selected work projects/should i buy this.png',
      '/selected work projects/should i buy this.png',
    ]
  },
  {
    id: '04',
    slug: 'ghost-filter',
    title: 'Ghost Filter',
    role: 'Tool Design & Interactive Dev',
    type: 'Filter & Privacy Tool',
    description: 'A minimalist digital privacy and content filtering tool engineered for distraction-free browsing.',
    image: '/selected work projects/ghost filter.png',
    className: 'project-ghost',
    featured: true,
    year: '(©26)',
    kicker: 'GHOST FILTER / PRIVACY',
    tagline: 'Digital privacy & filter tool',
    introduction: 'A lightweight utility that gives users instant control over online noise, privacy permissions, and focus modes.',
    challenge: 'Designing a non-intrusive control layer that seamlessly operates in the background while keeping interactions effortless.',
    client: 'Personal Project',
    services: 'Tool Design, Interactive Dev',
    finalThoughts: 'Delivered a sleek privacy utility that simplifies digital control with zero performance overhead.',
    liveUrl: '#live-project',
    heroImage: '/selected work projects/ghost filter.png',
    gallery: [
      '/selected work projects/ghost filter.png',
      '/selected work projects/ghost filter.png',
    ]
  }
]
