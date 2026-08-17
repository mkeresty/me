# Personal site — Mason Keresty

Single-page portfolio. Next.js static export, React Three Fiber hero, deployed to GitHub Pages.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run resume     # regenerate public/Mason-Keresty-Resume.pdf from resume.md
```

## Before you publish

The contact section shows your email but deliberately **not** your phone number, which is in `resume.md`. It's still in the résumé PDF that the site links to — remove it from `resume.md` and re-run `npm run resume` if you'd rather it not be public.

Links live in `profile` in [`lib/content.ts`](lib/content.ts). The contact section derives its visible labels from those URLs, so editing the URL is enough — there's no second copy to keep in sync.

## Deploying

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes via OIDC — no tokens to manage.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow figures out `basePath` on its own:

| Repo name | Served at | `basePath` |
|---|---|---|
| `masonkeresty.github.io` | `https://masonkeresty.github.io` | `""` |
| anything else, e.g. `personal_site` | `https://<you>.github.io/personal_site` | `/personal_site` |

Nothing to configure either way. For a custom domain, add `public/CNAME` containing the domain and set `basePath` to `""` by hardcoding `path=` in the workflow's *Resolve base path* step.

## Editing content

Everything on the page comes from [`lib/content.ts`](lib/content.ts) — no copy is hardcoded in components. `resume.md` is the source for the PDF only; the two are kept in sync by hand.

The experience section renders as a `terraform plan`. Each entry carries an `op`:

| `op` | Glyph | Means |
|---|---|---|
| `add` | `+` | you built it |
| `change` | `~` | you changed something that existed |
| `destroy` | `−` | you removed or retired it |

The `Plan: N to add, N to change, N to destroy` line under each role is computed from the entries, so it stays correct when you edit them.

## Theming

Dark and light both ship. First visit follows the OS setting; the toggle in the top bar overrides it and persists to `localStorage` under `mk-theme`.

Colours live in one place — [`app/globals.css`](app/globals.css). The `@theme` block holds dark; `:root[data-theme="light"]` overrides it. Utilities compile to `var(--color-*)`, so redefining the variables is all a theme switch does. Every foreground/background pair clears WCAG AA.

Two things to know before editing that file:

- The theme rules are **deliberately unlayered**. The base `html` rule is unlayered too, and anything inside `@layer` loses to it — `color-scheme` silently stops switching.
- The light palette appears **twice**, once for the explicit `data-theme` and once inside a `prefers-color-scheme` media query for the no-JS case. A selector list can't span an `@media` boundary, so the two must be edited together.

The WebGL field is themed separately in [`hero-field.tsx`](components/hero-field.tsx), because colour alone isn't enough: dark composites points **additively** so the scan band blooms, which on a light background would only erase paper. Light switches to normal blending with darker ink and a higher resting alpha — additive accumulates where points overlap and normal blending doesn't, so matching values would render far fainter. The two palettes were matched by measuring mean contrast against each theme's own background.

## Layout

```
app/
  layout.tsx        fonts, metadata, no-JS fallback
  page.tsx          section composition
  globals.css       design tokens (@theme), utilities, motion
components/
  hero.tsx          hero copy + load sequence
  hero-field.tsx    WebGL point field (lazy, client-only)
  theme.tsx         theme hook, toggle, pre-paint init script
  plan.tsx          the terraform-plan experience section
  work.tsx  capabilities.tsx  contact.tsx  rail.tsx  topbar.tsx
  reveal.tsx        shared scroll-reveal primitives
  section.tsx       shared section header
lib/
  content.ts        all page content
  paths.ts          basePath helper for /public assets
scripts/
  build-resume.mjs  resume.md → PDF
```

## Performance and fallbacks

- **214 KB** gzipped JS on first load. three.js is a further **217 KB** that loads lazily, only when the hero canvas mounts — it never blocks first paint.
- On viewports under 768px the field drops to ~55% point density and caps at 1.5× DPR.
- `prefers-reduced-motion` freezes the field on a single static frame and renders on demand instead of every frame.
- Without JavaScript the page still renders — a `<noscript>` rule in `layout.tsx` reveals content that the animation library would otherwise leave at `opacity: 0`.
