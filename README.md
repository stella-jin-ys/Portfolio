# Stella Jin Portfolio

Personal portfolio for Stella Jin, built with React, TypeScript, and Next-style
App Router conventions on top of `vinext` for a static GitHub Pages build.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open the local URL printed by the dev server. For a production-style check:

```bash
npm run build
npm test
npm run lint
```

## Project structure

```text
app/
  components/
    effects/     # reusable motion and interaction effects
    forms/       # contact form and form-specific UI
    sections/    # page sections such as the hero
  projects/      # statically generated project showcase pages
  portfolio-data.ts
  page.tsx
  globals.css
public/          # static assets, including the hero portrait
tests/           # rendered HTML and source-structure checks
```

Editable copy and portfolio records live in `app/portfolio-data.ts`. The
GitHub Pages workflow is in `.github/workflows/github-pages.yml` and publishes
the generated `dist/` directory from the `main` branch.

## Deployment

Push changes to `main` to trigger the GitHub Pages workflow. The live portfolio
is available at:

https://stella-jin-ys.github.io/Portfolio/
