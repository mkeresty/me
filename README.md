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

## Layout

```
app/
  layout.tsx        fonts, metadata, no-JS fallback
  page.tsx          section composition
  globals.css       design tokens (@theme), utilities, motion
components/
  hero.tsx          hero copy + load sequence
  hero-field.tsx    WebGL point field (lazy, client-only)
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
