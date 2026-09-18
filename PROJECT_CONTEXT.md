# Project Context & AI Reference Guide

This file serves as a knowledge base for AI coding assistants. Read this file to instantly understand the project's architecture, styling conventions, and animation logic without needing to scan every file.

## Project Overview
- **Type:** Personal Portfolio (Designer, Developer, Product Builder)
- **Tech Stack:** Next.js (App Router), React, TypeScript, GSAP (ScrollTrigger), Custom CSS (with limited Tailwind), Vercel Analytics.

## File Structure & Key Concepts

### 1. Data Management
- **`lib/data/projects.ts`**: The central source of truth for all project case studies. It contains an array of project objects (`projectsData`). The Homepage, Work page, and individual Case Study pages all map over this single file. 
- **Content Edits:** To update text, add projects, or remove projects, simply edit this file. Images referenced here (e.g., `/agora-cover.jpg`) should be placed in the `/public` directory.

### 2. Styling Architecture
- **`app/globals.css`**: The core styling engine. Unlike typical Next.js projects that rely heavily on inline Tailwind utility classes, this project uses **semantic, BEM-style CSS classes** combined with custom CSS Variables.
- **Color Variables:** Driven by `--ink` (dark text), `--paper` (light background), `--acid` (accent green), and `--rust` (accent brown).
- **Responsive Design:** Uses `clamp()` functions heavily for fluid typography and spacing, alongside standard `@media` queries.

### 3. Page Transitions & Animations (CRITICAL)
This project features a highly bespoke, seamless page transition system. Do not alter this logic without careful consideration.
- **`components/PageTransition.tsx`**: A React Context provider that wraps the entire app. It controls the navigation transitions. 
  - **The Animation:** A 5-strip staggered overlay (colored `#590711`) that slides UP from the bottom to cover the screen, waits for the route to change behind it, and then slides UP into the ceiling to reveal the new page.
  - **Popstate (Browser Back/Forward):** To prevent blank white flashes when the user clicks the browser Back/Forward buttons, this component listens for `popstate`. It synchronously clones the current page (`.site-shell`) into a fixed `z-index: 9998` overlay (`.page-freeze-overlay`). This freezes the old page on screen while the red strips rise up to cover it, resulting in a flawless transition.
- **`components/PageLoader.tsx`**: The initial splash screen loader. It uses a session flag (`initialPageLoaded`) to ensure it **only runs on the very first site visit or hard refresh**, and never on client-side navigation.
- **`components/TextReveal.tsx`**: Wraps text elements in `.mask-reveal-wrap`. Elements stay hidden with `translateY(120%)` until the `page-reveal-active` class is attached to the `<body>` (which happens after `PageLoader` or `PageTransition` completes).

### 4. Key UI Components
- **`Hero.tsx`**: Contains the homepage hero section. The background image (`.hero-bg-image`) animates on initial load but relies on the `.nav-revealed` body class to remain visible during subsequent internal navigations (so it doesn't irritatingly re-animate).
- **`Navbar.tsx`**: Fixed navigation. The text elements animate in staggered sequences.
- **`StickyCaseStudySection.tsx`**: Used in individual project pages (`app/work/[slug]/page.tsx`) to create a sticky left-column metadata layout while images scroll on the right.

## AI Assistant Guidelines
1. **Preserve CSS Architecture:** Do not litter JSX with generic Tailwind classes unless necessary. Prefer updating or adding semantic classes in `globals.css` to maintain the premium, bespoke aesthetic.
2. **Preserve Transition Logic:** Be extremely careful when touching `document.body.classList` additions/removals in `PageTransition.tsx` or `PageLoader.tsx`, as the entire animation timeline relies on absolute timing (800ms cover phase, 800ms uncover phase).
3. **No Placeholders:** If generating new code or pages, use realistic text and standard architectural patterns consistent with the rest of the app.
