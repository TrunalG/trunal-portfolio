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
    description: 'A peer-to-peer platform where people can share what they know, discover skills they want to learn, and connect with others to grow.',
    image: '/selected work projects/agora/agora.png',
    className: 'project-agora',
    featured: true,
    year: '(©26)',
    kicker: 'AGORA / COMMUNITY',
    tagline: 'What are you learning lately?',
    introduction: 'Agora is a peer-to-peer platform where people can share what they know, discover skills they want to learn, and connect with others to grow. I designed and built the product around making that exchange simple and natural.',
    challenge: 'The challenge was making skill exchange feel less like browsing a directory and more like finding the right person. Users needed to understand what they could offer, what they wanted to learn, and who they could connect with.',
    client: 'Agora Team',
    services: 'UI/UX, Web Development',
    finalThoughts: 'Agora started with a simple belief: knowledge becomes more valuable when people share it. Building it turned that idea into a real product, where learning is no longer something you do alone, but something you discover through other people.',
    liveUrl: 'https://agora-skill-exchange-network.vercel.app',
    heroImage: '/selected work projects/agora/agora.png',
    gallery: [
      '/selected work projects/agora/homepage.png',
      '/selected work projects/agora/request page.png',
      '/selected work projects/agora/profile view.png',
      '/selected work projects/agora/message chat.png',
    ]
  },
  {
    id: '02',
    slug: 'ledger-studio',
    title: 'Ledger Studio',
    role: 'Product Design & Strategy',
    type: 'Development / Web App',
    description: 'A quoting tool for freelancers that helps them understand what a project really means before putting a price on it.',
    image: '/selected work projects/ledger studio/ledger studio.png',
    className: 'project-ledger',
    featured: true,
    year: '(©26)',
    kicker: 'LEDGER STUDIO / 2026',
    tagline: 'Financial design & studio platform',
    introduction: 'Ledger Studio is a quoting tool for freelancers that helps them understand what a project really means before putting a price on it. It brings pricing, scope, hidden work, and professional quotes into one place.',
    challenge: 'The challenge was making quoting more than a pricing exercise. Freelancers needed a clearer way to see the work behind a project, including the tasks and costs that are easy to overlook.',
    client: 'Ledger Studio',
    services: 'Web Development',
    finalThoughts: 'Ledger Studio turns quoting from a simple pricing task into a clearer way to understand the work behind a project. It helps freelancers see the numbers, scope, and hidden work before the quote reaches the client.',
    liveUrl: '#live-project',
    heroImage: '/selected work projects/ledger studio/ledger studio.png',
    gallery: [
      '/selected work projects/ledger studio/homepage.png',
      '/selected work projects/ledger studio/quote page.png',
      '/selected work projects/ledger studio/lab page.png',
      '/selected work projects/ledger studio/playbook page.png',
    ]
  },
  {
    id: '03',
    slug: 'should-i-buy-this',
    title: 'Should I buy this',
    role: 'Product Concept & UX',
    type: 'Product Design / Development / Web App',
    description: 'A financial decision tool that helps users think beyond the price of a purchase.',
    image: '/selected work projects/should i buy this/should i buy this.png',
    className: 'project-should-i-buy',
    featured: true,
    year: '(©26)',
    kicker: 'PRODUCT CONCEPT / 2026',
    tagline: 'Buy less. Choose better.',
    introduction: 'Should I Buy This? is a financial decision tool that helps users think beyond the price of a purchase. It considers affordability, purpose, usage, and their current financial situation before giving a clear recommendation.',
    challenge: 'The challenge was turning a personal spending decision into a simple, structured experience. The tool needed to consider multiple factors without making the decision feel complicated.',
    client: 'Should I Buy This?',
    services: 'Product Design, UI/UX, Web Development',
    finalThoughts: 'Should I Buy This? turns a simple “should I get it?” into a moment to actually think. It’s a small tool, but the idea behind it is simple: make better decisions before spending, not after.',
    liveUrl: '#live-project',
    heroImage: '/selected work projects/should i buy this/should i buy this.png',
    gallery: [
      '/selected work projects/should i buy this/homepage.png',
      '/selected work projects/should i buy this/step 1.png',
      '/selected work projects/should i buy this/step 2.png',
      '/selected work projects/should i buy this/verdic.png',
    ]
  },
  {
    id: '04',
    slug: 'ghost-filter',
    title: 'Ghost Filter',
    role: 'Tool Design & Interactive Dev',
    type: 'Development / Web App',
    description: 'A job-posting analysis tool that helps people spot potential ghost jobs before applying.',
    image: '/selected work projects/ghost filter/ghost filter.png',
    className: 'project-ghost',
    featured: true,
    year: '(©26)',
    kicker: 'GHOST FILTER / PRIVACY',
    tagline: 'Digital privacy & filter tool',
    introduction: 'GhostFilter is a job-posting analysis tool that helps people spot potential ghost jobs before applying. It analyzes signals from a listing and turns them into a simple, understandable risk score.',
    challenge: 'The challenge was making a data-driven analysis feel simple. The tool needed to process multiple signals while keeping the reasoning behind the score clear to the user.',
    client: 'GhostFilter',
    services: 'Web Development',
    finalThoughts: 'GhostFilter turns a vague feeling about a job posting into something you can actually examine. It’s a simple way to look past the listing and understand the signals hiding underneath it.',
    liveUrl: '#live-project',
    heroImage: '/selected work projects/ghost filter/ghost filter.png',
    gallery: [
      '/selected work projects/ghost filter/home.png',
      '/selected work projects/ghost filter/filter.png',
      '/selected work projects/ghost filter/history.png',
      '/selected work projects/ghost filter/privacy.png',
    ]
  }
]
