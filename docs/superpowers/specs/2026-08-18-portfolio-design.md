# Stella Jin Portfolio - Design Specification

## Goal

Create a modern, maintainable, single-page personal portfolio for Stella Jin that presents her full-stack and AI experience, selected projects, and contact details. The page must feel polished on desktop and mobile, use the supplied screenshots as its visual reference, and include the requested React Bits interactions without sacrificing accessibility or performance.

## Visual Direction

The supplied screenshots are the approved visual reference. The site uses a near-black, subtly textured canvas with restrained mint-to-cyan gradients, soft radial light, translucent glass surfaces, fine low-contrast borders, large condensed sans-serif display type, and italic emphasis. Rounded gradient panels provide the primary visual contrast.

Polish will focus on consistent spacing, clearer text hierarchy, balanced line lengths, reliable contrast, aligned card geometry, and fluid desktop-to-mobile reflow. Effects remain quiet and purposeful: the content stays legible before, during, and after animation.

## Page Structure

### Hero

- A glass navigation bar with Stella's wordmark, section links, and a contact action.
- Oversized translucent `STELLA JIN` lettering combined with the headline "Building thoughtful digital products."
- A short summary based on Stella's CV and clear calls to view work or make contact.
- A fluid-glass hero object and ambient mint/cyan light field.
- Two lower gradient panels introducing Stella's working style and current Findex role.

### About

- A concise profile statement emphasizing the combination of business fluency, collaboration, and technical depth.
- Four skill groups: frontend, backend, AI/ML, and data.
- A selected career timeline based on the CV, prioritizing the roles most relevant to software development.

### Personal Projects

- Four responsive project cards using the supplied reference content: Travel budget AI assistent, Financial Insights Platform, Enterprise AI Chatbot, Asset Management Apps.
- Each card includes a summary, year, technology tags, and one project action.
- Project actions use the React Bits Border Glow treatment. Links that cannot be verified will be presented as non-deceptive case-study actions rather than invented external URLs.

### Contact

- A large mint-to-cyan gradient panel with email, phone, LinkedIn, and GitHub details from the CV.
- Email and phone use native actionable links; social links open their real destinations.
- A minimal footer with Stella's name, location, and current year.

## Interaction and Motion

- React Bits Option Wheel provides persistent section navigation on desktop and a touch-friendly compact menu on mobile.
- React Bits Click Spark responds to pointer activation across the page, using the mint/cyan palette.
- React Bits Fluid Glass anchors the hero without obstructing text or controls.
- React Bits Border Glow is to interactive card focus/hover states.
- Section reveals, marquee movement, and ambient light motion use subtle transforms and opacity.
- `prefers-reduced-motion` disables nonessential movement while preserving all content and navigation.

## Architecture

Use the Sites React starter and keep the site as one route. The implementation is divided into small presentational sections and four focused interaction components: `OptionWheel`, `ClickSpark`, `FluidGlassHero`, and `BorderGlowButton`. Content lives in typed local data arrays so project and experience text can be maintained without editing layout code.

The site has no backend, authentication, analytics, or persistent state. Contact actions use standard links. Static deployment must work from a GitHub Pages subpath, so asset paths and the production base path will be deployment-safe.

## Responsive Behavior

- Desktop uses split hero and about layouts plus a two-column project grid.
- Tablet collapses dense split regions while preserving the visual hierarchy.
- Mobile uses a single column, smaller but still expressive display type, full-width project cards, and a compact fixed menu control.
- No horizontal scrolling or clipped text at 320px width.

## Accessibility

- Semantic landmarks and heading order.
- Keyboard-accessible menu, links, and buttons with visible focus states.
- Sufficient contrast for text and controls over gradient and glass surfaces.
- Decorative effects excluded from the accessibility tree.
- Motion reduction support and touch targets of at least 44px where practical.

## Verification

- Component tests cover section content, real contact links, menu navigation, and reduced-motion behavior.
- A production build must complete successfully.
- The local demo will be opened for Stella's visual approval before publishing.
- After approval, the exact validated source will be committed, pushed to GitHub, GitHub Pages will be enabled, and the deployed URL will be checked before handoff.

## Scope Boundaries

The first release is a polished single-page portfolio only. It does not add a CMS, contact form backend, blog, admin interface, analytics, or speculative project-detail routes.
