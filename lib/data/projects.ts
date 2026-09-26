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
    type: 'Product Design / Development / MVP',
    description: 'A peer-to-peer platform built around one simple idea: people can learn from each other.',
    image: '/selected work projects/agora.png',
    className: 'project-agora',
    featured: true,
    year: '(©26)',
    kicker: 'AGORA / COMMUNITY',
    tagline: 'What are you learning lately?',
    introduction: 'Agora is a peer-to-peer platform built around one simple idea: people can learn from each other. You can share what you know, discover skills you want to learn, and connect with people who can help you grow. I designed and built the product with a focus on making that exchange feel simple, clear, and natural.',
    challenge: 'The challenge was making skill exchange feel less like browsing a directory and more like finding the right person. The experience needed to help users clearly understand what they wanted to learn, what they could offer, and who they could connect with. At the same time, the product had to stay simple enough that the value was clear from the first interaction.',
    client: 'Agora Team',
    services: 'UI/UX, Web Development',
    finalThoughts: 'Agora started with a simple belief: knowledge becomes more valuable when people share it. Building it turned that idea into a real product, where learning is no longer something you do alone, but something you discover through other people.',
    liveUrl: 'https://agora-skill-exchange-network.vercel.app',
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
    type: 'Development / Web App',
    description: 'A quoting tool built for freelancers who want to know what a project really means before putting a price on it.',
    image: '/selected work projects/ledger studio.png',
    className: 'project-ledger',
    featured: true,
    year: '(©26)',
    kicker: 'LEDGER STUDIO / 2026',
    tagline: 'Financial design & studio platform',
    introduction: 'Ledger Studio is a quoting tool built for freelancers who want to know what a project really means before putting a price on it. Create detailed quotes, calculate the numbers, catch overlooked work, and turn the final scope into a professional PDF ready to send.',
    challenge: 'Creating a quote is easy. Knowing whether it actually makes sense is harder. A project can look profitable on paper while hours of revisions, testing, setup, and other supporting work quietly disappear from the scope. Ledger Studio was designed to make those details easier to see before the quote reaches the client.',
    client: 'Ledger Studio',
    services: 'Web Development',
    finalThoughts: 'Ledger Studio turns quoting from a simple pricing task into a clearer way to understand the work behind a project. It helps freelancers see the numbers, scope, and hidden work before the quote reaches the client.',
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
    type: 'Product Design / Development / Web App',
    description: 'A simple financial decision tool built for those moments when you’re unsure whether a purchase is actually worth it.',
    image: '/selected work projects/should i buy this.png',
    className: 'project-should-i-buy',
    featured: true,
    year: '(©26)',
    kicker: 'PRODUCT CONCEPT / 2026',
    tagline: 'Buy less. Choose better.',
    introduction: 'Should I Buy This? is a simple financial decision tool built for those moments when you’re unsure whether a purchase is actually worth it. It looks beyond the price alone, helping you think about affordability, purpose, usage, and your current financial situation before deciding.',
    challenge: 'The challenge was turning a personal spending decision into something structured without making it feel like a complicated financial tool. The experience needed to ask the right questions, weigh different factors together, and give users a clear answer while still leaving the final decision in their hands.',
    client: 'Should I Buy This?',
    services: 'Product Design, UI/UX, Web Development',
    finalThoughts: 'Should I Buy This? turns a simple “should I get it?” into a moment to actually think. It’s a small tool, but the idea behind it is simple: make better decisions before spending, not after.',
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
    type: 'Development / Web App',
    description: 'A job-posting analysis tool built to help people spot potential ghost jobs before spending time applying.',
    image: '/selected work projects/ghost filter.png',
    className: 'project-ghost',
    featured: true,
    year: '(©26)',
    kicker: 'GHOST FILTER / PRIVACY',
    tagline: 'Digital privacy & filter tool',
    introduction: 'GhostFilter is a job-posting analysis tool built to help people spot potential ghost jobs before spending time applying. It analyzes the signals behind a listing and turns them into a simple risk score, giving users a clearer picture of what they’re looking at.',
    challenge: 'The challenge was making something analytical feel simple enough to use. The tool needed to take several signals from a job posting, process them through a rules-based system, and present the result in a way that was easy to understand without hiding the reasoning behind the score.',
    client: 'GhostFilter',
    services: 'Web Development',
    finalThoughts: 'GhostFilter turns a vague feeling about a job posting into something you can actually examine. It’s a simple way to look past the listing and understand the signals hiding underneath it.',
    liveUrl: '#live-project',
    heroImage: '/selected work projects/ghost filter.png',
    gallery: [
      '/selected work projects/ghost filter.png',
      '/selected work projects/ghost filter.png',
    ]
  }
]
