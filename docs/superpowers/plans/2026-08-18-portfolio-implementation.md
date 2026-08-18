# Stella Jin Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a polished, animated, single-page portfolio for Stella Jin from the approved screenshot direction.

**Architecture:** Use the Sites React starter as a one-route static portfolio. Keep authoritative copy in typed data, compose focused presentational sections, and isolate each React Bits-inspired effect so motion and navigation remain independently testable and accessible.

**Tech Stack:** React, TypeScript, Vinext/Vite, CSS, Vitest, Testing Library, GitHub Actions, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-18-portfolio-design.md`

## Global Constraints

- One route only; no backend, CMS, authentication, analytics, or persistent state.
- Use the supplied screenshots as the approved visual reference.
- Include Option Wheel, Click Spark, Fluid Glass, and Border Glow interactions.
- Support keyboard access, visible focus, 44px practical touch targets, and `prefers-reduced-motion`.
- Work from 320px mobile width through desktop without clipped text or horizontal scrolling.
- Do not invent external project URLs; use only verified contact and profile destinations.
- Show a local working demo for approval before GitHub publishing.

---

### Task 1: Scaffold the Site and Render Authoritative Content

**Files:**
- Create via Sites initializer: `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `vite.config.ts`
- Create: `app/portfolio-data.ts`
- Create: `app/page.test.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `portfolioData` containing `experience`, `skills`, `projects`, and `contacts` arrays.
- Produces: `PortfolioPage(): JSX.Element`, consumed by all later interaction and styling tasks.

- [ ] **Step 1: Initialize the Sites starter**

Run the Sites `scripts/init-site.sh` once with the repository root, allow dependency installation to finish, and inspect only `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, and `.openai/hosting.json` before editing.

- [ ] **Step 2: Write the failing content test**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PortfolioPage from './page';

describe('PortfolioPage', () => {
  it('renders every requested section and Stella contact destination', () => {
    render(<PortfolioPage />);
    expect(screen.getByRole('heading', { name: /building thoughtful digital products/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /personal projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /let.s build something together/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stella\.jin123@gmail\.com/i })).toHaveAttribute('href', 'mailto:stella.jin123@gmail.com');
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm test -- --run app/page.test.tsx`

Expected: FAIL because the starter does not render the portfolio sections.

- [ ] **Step 4: Add typed content and minimal semantic sections**

```ts
export type Project = { title: string; year: string; summary: string; tags: string[] };

export const portfolioData = {
  projects: [
    { title: 'Financial Insights Platform', year: '2026', summary: 'Financial product features and an AI agent for natural-language account insights.', tags: ['Vue', 'Nuxt', 'Express', 'MongoDB', 'OpenRouter'] },
    { title: 'Enterprise AI Chatbot', year: '2025', summary: 'A scalable .NET chatbot with Azure OpenAI and multi-database retrieval.', tags: ['C#', 'ASP.NET Core', 'Azure OpenAI', 'Cosmos DB'] },
    { title: 'Asset Management Apps', year: '2023', summary: 'Responsive research-facility logistics apps and parameter-driven reporting.', tags: ['React', 'Redux', 'Material UI', 'MySQL'] },
    { title: 'Travel Budget AI Assistant', year: '2026', summary: 'AI-assisted travel planning and budget tracking.', tags: ['React', 'AI', 'Responsive UI'] },
  ] satisfies Project[],
  contacts: {
    email: 'mailto:stella.jin123@gmail.com',
    phone: 'tel:+46762245602',
    linkedIn: 'https://www.linkedin.com/in/stella-jin-75694253',
    github: 'https://github.com/stella-jin-ys',
  },
} as const;
```

Implement `PortfolioPage` with semantic `header`, `main`, `section`, and `footer` elements and IDs `home`, `about`, `work`, and `contact`. Replace starter metadata with Stella-specific title and description.

- [ ] **Step 5: Run the test and verify GREEN**

Run: `npm test -- --run app/page.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the content slice**

```bash
git add package.json package-lock.json app vite.config.ts .openai
git commit -m "Build portfolio content structure"
```

### Task 2: Add Accessible React Bits Interactions

**Files:**
- Create: `app/components/OptionWheel.tsx`
- Create: `app/components/ClickSpark.tsx`
- Create: `app/components/FluidGlassHero.tsx`
- Create: `app/components/BorderGlowCard.tsx`
- Create: `app/components/interactions.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: section IDs `home`, `about`, `work`, `contact` from `PortfolioPage`.
- Produces: `OptionWheel({ items })`, `ClickSpark({ children })`, `FluidGlassHero()`, and `BorderGlowCard({ children })`.

- [ ] **Step 1: Write failing interaction tests**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OptionWheel } from './OptionWheel';
import { ClickSpark } from './ClickSpark';

const items = [{ label: 'About', href: '#about' }];

describe('portfolio interactions', () => {
  it('opens the wheel and exposes section navigation', () => {
    render(<OptionWheel items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /open section menu/i }));
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
  });

  it('adds a decorative spark without consuming its child click', () => {
    render(<ClickSpark><button>Activate</button></ClickSpark>);
    fireEvent.click(screen.getByRole('button', { name: 'Activate' }), { clientX: 20, clientY: 20 });
    expect(document.querySelector('[data-click-spark]')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the interaction tests and verify RED**

Run: `npm test -- --run app/components/interactions.test.tsx`

Expected: FAIL because the interaction components do not exist.

- [ ] **Step 3: Implement the minimal accessible components**

`OptionWheel` uses a native button with `aria-expanded`, a labelled navigation list, Escape-to-close behavior, and real hash links. `ClickSpark` wraps the page, appends short-lived decorative spark spans from pointer coordinates, and marks them `aria-hidden`. `FluidGlassHero` renders decorative layers only. `BorderGlowCard` keeps the card's normal link semantics while tracking the glow position as a decorative CSS custom property.

- [ ] **Step 4: Integrate all four components**

Wrap the page content in `ClickSpark`, place `FluidGlassHero` in the hero, wrap each project surface in `BorderGlowCard`, and mount `OptionWheel` as the persistent section navigator.

- [ ] **Step 5: Run interaction and page tests and verify GREEN**

Run: `npm test -- --run app/components/interactions.test.tsx app/page.test.tsx`

Expected: all tests PASS with no console warnings.

- [ ] **Step 6: Commit the interactions**

```bash
git add app/components app/page.tsx
git commit -m "Add accessible portfolio interactions"
```

### Task 3: Apply the Approved Visual System and Responsive Polish

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Modify: `app/components/OptionWheel.tsx`
- Modify: `app/components/FluidGlassHero.tsx`
- Modify: `app/components/BorderGlowCard.tsx`
- Create: `app/styles.test.ts`

**Interfaces:**
- Consumes: semantic sections and interaction component class names from Tasks 1-2.
- Produces: the complete desktop/mobile visual design and reduced-motion behavior.

- [ ] **Step 1: Write a failing visual-contract test**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('visual system', () => {
  const css = readFileSync(new URL('./globals.css', import.meta.url), 'utf8');
  it('defines responsive and reduced-motion treatments', () => {
    expect(css).toContain('@media (max-width: 720px)');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('--accent-cyan');
  });
});
```

- [ ] **Step 2: Run the visual test and verify RED**

Run: `npm test -- --run app/styles.test.ts`

Expected: FAIL because the approved visual tokens and media rules are absent.

- [ ] **Step 3: Implement the approved desktop visual system**

Define near-black canvas tokens, mint/cyan gradients, subtle grain, fine borders, condensed display typography, glass nav, ambient hero light, translucent name lettering, rounded gradient panels, two-column project grid, border-glow actions, and the large contact panel. Keep body copy widths and contrast readable.

- [ ] **Step 4: Implement tablet, mobile, and reduced-motion rules**

At `960px`, collapse split content where required. At `720px`, use a single column, compact navigation, full-width project cards, safe display-type wrapping, and no horizontal overflow. In reduced-motion mode, stop marquees, ambient drift, spark transitions, and fluid-glass animation.

- [ ] **Step 5: Run all tests and verify GREEN**

Run: `npm test -- --run`

Expected: all tests PASS.

- [ ] **Step 6: Start the local demo and verify the route responds**

Run `npm run dev` in a retained session, request the exact local URL once, and require a non-error response before opening the working demo for Stella's approval.

- [ ] **Step 7: Commit the visual implementation**

```bash
git add app
git commit -m "Polish responsive portfolio design"
```

### Task 4: Validate and Publish After Demo Approval

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Modify when required: `vite.config.ts`
- Modify when required: `package.json`

**Interfaces:**
- Consumes: the approved local demo and successful production build.
- Produces: a GitHub repository, Pages workflow, and verified public URL.

- [ ] **Step 1: Run final validation before publishing**

Run:

```bash
npm test -- --run
npm run build
git diff --check
```

Expected: tests PASS, build exits 0, and diff check emits no errors.

- [ ] **Step 2: Confirm publishing prerequisites**

Run `gh --version`, `gh auth status`, `git status -sb`, and inspect the exact diff. Confirm no unrelated files are staged and identify the GitHub repository name and deployment base path.

- [ ] **Step 3: Add the Pages workflow**

Create a GitHub Actions workflow triggered on pushes to the default branch. It installs from the lockfile, runs tests, builds the site, uploads `dist`, and deploys through the official Pages actions with `pages: write` and `id-token: write` permissions.

- [ ] **Step 4: Re-run validation and commit deployment configuration**

Run `npm test -- --run` and `npm run build`, then commit only the workflow and any deployment-path changes.

- [ ] **Step 5: Push and enable Pages**

Create or connect the intended public GitHub repository, push the validated default branch, configure Pages to use GitHub Actions, and wait for the deployment workflow to complete.

- [ ] **Step 6: Verify and hand off the live site**

Request the deployed URL and require a successful response. Return the repository URL and live GitHub Pages URL to Stella.
