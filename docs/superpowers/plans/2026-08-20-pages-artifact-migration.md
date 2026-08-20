# Source-Only GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate GitHub Pages deployment from committing generated site files into `main` to deploying `dist/client` as a Pages artifact, then remove tracked generated output from the source branch without changing the live site behavior or URL.

**Architecture:** Keep the existing Vinext build and `/Portfolio/` path rewriting, but replace the `git commit`/`git push` publication step with `actions/upload-pages-artifact` and `actions/deploy-pages`. Once the workflow deploys the build artifact directly, remove root build output and ignore it so `main` remains source-only.

**Tech Stack:** React 19, TypeScript 5.9, Vinext 1.0.0-beta.2, Vite 8, Node.js 22, npm, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-20-pages-artifact-migration-design.md`

## Global Constraints

- Preserve the existing GitHub Pages project URL and `/Portfolio/` base path behavior.
- Keep `npm ci` followed by `npm run build` as the production build path.
- Deploy exactly the post-processed `dist/client` tree.
- Keep `.nojekyll` in the deployed artifact so `_next` assets are served correctly.
- Use workflow permissions `contents: read`, `pages: write`, and `id-token: write`.
- Do not commit or push generated build output from the deployment workflow.
- Do not remove source/configuration files unless they are confirmed generated deployment copies.
- Keep all implementation work on `agent/pages-artifact-migration` until review/merge.

---

### Task 1: Convert the GitHub Pages workflow to artifact deployment

**Files:**
- Modify: `.github/workflows/github-pages.yml`

**Interfaces:**
- Consumes: `npm ci`, `npm run build`, generated `dist/client`, existing `/Portfolio/` rewrite script.
- Produces: uploaded GitHub Pages artifact named by `actions/upload-pages-artifact`, followed by a deployment through `actions/deploy-pages`.

- [ ] **Step 1: Replace write access with Pages deployment permissions**

Set the workflow permissions to:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Remove `contents: write`.

- [ ] **Step 2: Preserve the existing build and path-rewrite steps**

Keep checkout, Node.js 22 setup, `npm ci`, `npm run build`, and the existing Node script that rewrites root-relative references to `/Portfolio/` inside `dist/client`.

Expected build output remains `dist/client`.

- [ ] **Step 3: Ensure `.nojekyll` is part of the artifact**

Add after the rewrite step:

```yaml
      - name: Disable Jekyll processing
        run: touch dist/client/.nojekyll
```

- [ ] **Step 4: Replace the publication commit with artifact upload**

Delete the entire `Publish static files to main` step and add:

```yaml
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/client
```

The build job must no longer contain `git config`, `git add`, `git commit`, or `git push`.

- [ ] **Step 5: Add a dedicated deploy job**

Add:

```yaml
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Rename the build job to `build` so `needs: build` is explicit.

- [ ] **Step 6: Add Pages concurrency protection**

At workflow level add:

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

- [ ] **Step 7: Review workflow statically**

Confirm all of the following are true in `.github/workflows/github-pages.yml`:

```text
contains: actions/upload-pages-artifact@v3
contains: actions/deploy-pages@v4
contains: path: dist/client
contains: pages: write
contains: id-token: write
contains: touch dist/client/.nojekyll
absent: contents: write
absent: git push
absent: git commit
absent: cp -R dist/client/. .
```

- [ ] **Step 8: Commit the workflow migration**

Stage only `.github/workflows/github-pages.yml` and commit:

```bash
git add -- .github/workflows/github-pages.yml
git commit -m "ci: deploy Pages artifact directly"
```

### Task 2: Mark generated deployment output as untracked build output

**Files:**
- Modify: `.gitignore`

**Interfaces:**
- Consumes: generated root deployment paths from the old workflow.
- Produces: ignore rules preventing accidental recommit of generated output after cleanup.

- [ ] **Step 1: Add root build-output ignore rules**

Ensure `.gitignore` includes:

```gitignore
# Generated production deployment output
/_next/
/index.html
/index.rsc
/404.html
/projects/
```

Keep existing ignore entries for `dist/`, `.next/`, `.vinext/`, `.vite/`, `node_modules/`, coverage, environment files, temporary files, and worktrees.

- [ ] **Step 2: Do not blanket-ignore source assets**

Do not add broad rules for `*.svg`, `*.png`, `_headers`, `.assetsignore`, or other root assets until Task 3 proves they are generated-only. This prevents hiding genuine source files.

- [ ] **Step 3: Commit ignore rules**

Stage only `.gitignore` and commit:

```bash
git add -- .gitignore
git commit -m "chore: ignore generated Pages output"
```

### Task 3: Classify and remove confirmed generated root deployment files

**Files:**
- Remove confirmed generated paths from repository root.
- Keep source/config files and any static assets required as build inputs.

**Interfaces:**
- Consumes: current root tree, `dist/client` build contents, references from `app/`, configuration, and tests.
- Produces: source-only repository tree with deployment output removed.

- [ ] **Step 1: Build the project locally/within the implementation environment**

Run:

```bash
npm ci
npm run build
```

Expected: exit code 0 and `dist/client` exists.

- [ ] **Step 2: Run the existing rendered HTML test suite**

Run:

```bash
npm test
```

Expected: exit code 0. This command rebuilds and executes `tests/rendered-html.test.mjs`.

- [ ] **Step 3: Confirm primary generated paths exist in `dist/client`**

Verify that old root deployment paths correspond to build output before removing them. At minimum check:

```bash
test -d dist/client/_next
test -f dist/client/index.html
test -f dist/client/index.rsc
test -f dist/client/404.html
```

For `projects/`, confirm it exists in `dist/client` when routes generate it:

```bash
test -d dist/client/projects
```

If any command fails because Vinext changes the export shape, inspect the actual build tree and remove only paths that have a clear generated counterpart.

- [ ] **Step 4: Remove confirmed generated deployment paths from Git**

Remove the tracked root copies:

```bash
git rm -r -- _next
git rm -- index.html index.rsc 404.html
```

If `projects/` is confirmed generated in Step 3:

```bash
git rm -r -- projects
```

Do not remove `app/`, tests, package files, TypeScript/Vite/Vinext configs, lint config, README, or the workflow.

- [ ] **Step 5: Classify remaining root deployment-looking assets individually**

For each of these currently published root files, determine whether it is a source/build input or merely a copied build artifact before deletion:

```text
favicon.svg
file.svg
globe.svg
window.svg
stella-jin-profile.png
_headers
.assetsignore
.nojekyll
```

Use repository references plus the freshly generated `dist/client` contents. Rules:

- keep any file imported/referenced as a source input;
- remove a root file only if it is reproduced by the build and not required as an input;
- remove root `.nojekyll` because Task 1 creates it inside `dist/client` at deploy time;
- do not remove files merely because they appear in the old workflow's `paths-ignore` list.

- [ ] **Step 6: Review the cleanup diff**

Run:

```bash
git status --short
git diff --stat
git diff -- .gitignore .github/workflows/github-pages.yml
```

Expected: application source is unchanged; removals are generated deployment artifacts plus any individually proven redundant root copies.

- [ ] **Step 7: Rebuild after cleanup**

Run:

```bash
rm -rf dist
npm run build
npm test
```

Expected: both build and tests pass from the cleaned source tree.

- [ ] **Step 8: Commit generated-output removal**

Stage only confirmed cleanup paths and commit:

```bash
git add -- .gitignore
# `git rm` paths are already staged; add only any other explicitly confirmed cleanup paths.
git commit -m "chore: remove committed Pages build output"
```

### Task 4: Verify branch scope and prepare the migration PR

**Files:**
- Read/review: all branch changes relative to `main`.
- No additional implementation files unless verification exposes a defect.

**Interfaces:**
- Consumes: Tasks 1-3.
- Produces: reviewable migration branch proving the source-only model before merge.

- [ ] **Step 1: Compare branch against `main`**

Run:

```bash
git diff --stat main...HEAD
git diff --name-status main...HEAD
```

Expected: design/plan docs, workflow migration, `.gitignore`, and confirmed generated-output deletions. No unintended `app/` or package dependency changes.

- [ ] **Step 2: Run final validation**

Run:

```bash
npm ci
npm run build
npm test
```

Expected: all commands exit 0.

- [ ] **Step 3: Verify workflow no longer mutates `main`**

Run:

```bash
! grep -nE 'git (add|commit|push)|contents: write|cp -R dist/client' .github/workflows/github-pages.yml
grep -n 'actions/upload-pages-artifact@v3' .github/workflows/github-pages.yml
grep -n 'actions/deploy-pages@v4' .github/workflows/github-pages.yml
```

Expected: first command succeeds because forbidden publication commands are absent; both action checks return matches.

- [ ] **Step 4: Push the reviewed branch**

After confirming the branch contains only the intended migration changes:

```bash
git push -u origin agent/pages-artifact-migration
```

- [ ] **Step 5: Open one draft pull request**

PR title:

```text
Migrate Pages to artifact deployment
```

PR body must summarize:

```markdown
## What changed
- deploy `dist/client` through GitHub Pages Actions instead of committing build output to `main`
- preserve `/Portfolio/` path rewriting and `.nojekyll`
- remove confirmed generated deployment files from the repository root
- ignore generated deployment output going forward

## Validation
- `npm ci`
- `npm run build`
- `npm test`
- checked workflow contains no publication commit/push step

## Deployment check after merge
Confirm the Pages workflow succeeds, the existing site URL loads, `/Portfolio/_next/` assets resolve, project routes work, and no bot publication commit appears on `main`.
```

Create the PR as a draft. Do not merge as part of this task.

### Task 5: Post-merge Pages verification

**Files:**
- No repository changes unless deployment verification exposes a defect.

**Interfaces:**
- Consumes: merged migration and GitHub Pages workflow run.
- Produces: evidence that the live deployment is equivalent and `main` stays source-only.

- [ ] **Step 1: Confirm the Pages workflow run succeeds**

Inspect the workflow run for the merged commit. Both `build` and `deploy` jobs must succeed.

- [ ] **Step 2: Verify the live home page and core assets**

Open the existing GitHub Pages project URL and confirm:

```text
home page returns successfully
JavaScript under /Portfolio/_next/ loads
CSS under /Portfolio/_next/ loads
font/static assets under /Portfolio/_next/ load
```

- [ ] **Step 3: Verify project routes**

Check at least one generated project route and confirm its HTML/RSC/client assets resolve with the `/Portfolio/` prefix.

- [ ] **Step 4: Confirm `main` remains source-only after deployment**

Inspect commits after the deployment. Expected: no `Publish static site for GitHub Pages` bot commit and no generated `_next/` or exported HTML/RSC tree reappears on `main`.

- [ ] **Step 5: Handle failure safely**

If Pages deployment or routing fails, fix or revert the workflow migration. Do not restore automatic build-output commits to `main` as the normal deployment model unless explicitly chosen as a rollback.