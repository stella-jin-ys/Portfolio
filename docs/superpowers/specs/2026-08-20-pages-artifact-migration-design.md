# Source-Only GitHub Pages Deployment Design

## Goal

Keep `main` focused on the React/TypeScript/Vinext source while preserving the existing GitHub Pages site and URL. Generated production output must no longer be committed back into `main`.

## Current State

The repository builds with Node 22 and `npm run build` (`vinext build`). The current GitHub Pages workflow rewrites root-relative asset URLs for the `/Portfolio/` project path, copies `dist/client` into the repository root, then commits and pushes the generated site back to `main`.

That makes generated files such as `_next/`, exported HTML/RSC files, and route output appear alongside application source. It also requires `contents: write` solely so the deployment job can mutate the source branch.

## Chosen Architecture

Use GitHub Pages' Actions artifact deployment model.

The workflow will:

1. Check out `main`.
2. Set up Node.js 22 with npm caching.
3. Run `npm ci`.
4. Run the existing `npm run build` command.
5. Apply the existing `/Portfolio/` path rewriting to the generated `dist/client` tree so the live project's asset and route URLs remain compatible with the existing GitHub Pages project URL.
6. Ensure the deploy artifact contains `.nojekyll` so GitHub Pages serves `_next` assets without Jekyll processing.
7. Upload `dist/client` using `actions/upload-pages-artifact`.
8. Deploy that artifact using `actions/deploy-pages` in a dedicated deploy job/environment.

The workflow will not copy generated files into the repository root, run `git add`, create a publication commit, or push to `main`.

## Repository Cleanup

Once deployment uses the Pages artifact, remove tracked files that are confirmed generated copies of `dist/client`, including the root `_next/` tree, exported `index.html`, `index.rsc`, `404.html`, generated route output such as `projects/`, and other root deployment artifacts that are reproduced by the build.

Do not remove application source or build inputs. In particular, retain `app/`, `package.json`, `package-lock.json`, TypeScript/Vite/Vinext-related configuration, lint configuration, tests, README, GitHub workflow files, and genuine source/static assets required by the build.

Root assets will be classified before deletion. A file is removed only when it is generated/copied by the production build or already exists as a build input elsewhere. This avoids deleting source assets merely because the current workflow happens to publish them at the repository root.

## Git Ignore Policy

Add generated output to `.gitignore` as appropriate, including `dist/` and framework/build caches. `_next/` should not be committed as root deployment output after migration.

## Permissions and Safety

The workflow will use least-privilege Pages permissions:

- `contents: read`
- `pages: write`
- `id-token: write`

The deploy job will use the `github-pages` environment. Deployment failure must fail the workflow rather than modify `main`.

All migration work is performed on `agent/pages-artifact-migration` and reviewed before merge. The existing live deployment remains untouched until the migration reaches `main`.

## Verification

Before merge:

- confirm the branch changes only deployment configuration, ignore rules, and removal of confirmed generated output;
- confirm `npm ci` and `npm run build` remain the build path;
- confirm the artifact path is exactly `dist/client` after project-path rewriting;
- confirm `.nojekyll` is present in the artifact;
- confirm no workflow step commits or pushes generated output.

After merge:

- confirm the GitHub Pages workflow completes successfully;
- confirm the deployed home page loads at the existing project URL;
- confirm `_next` JavaScript/CSS/font assets load under `/Portfolio/`;
- confirm project routes and their assets load correctly;
- confirm `main` remains source-only after deployment and receives no bot-generated publication commit.

If the new Pages deployment fails, fix or revert the workflow migration rather than restoring generated output commits as the normal deployment mechanism.

## Success Criteria

The migration is complete when the existing live site is served from a GitHub Pages Actions artifact, `main` contains no duplicated production build tree, subsequent deployments do not create commits, and the site's existing routes/assets behave the same as before the migration.