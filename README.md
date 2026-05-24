# Jess Taylor Portfolio

A fixed-viewport "living room" portfolio. No scroll, no menu — hand-drawn objects scattered organically, each clickable to trigger sounds, animations, or popovers with content.

## Stack

- [Astro](https://astro.build) — static-first, near-zero JS by default
- Vanilla TypeScript + [GSAP](https://gsap.com) for animations
- [Howler.js](https://howlerjs.com) for sound effects
- Markdown content collections (no CMS — Jess edits `.md` files directly)
- Cloudflare Pages for hosting

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

## Project layout

```
public/
  art/      hand-drawn assets (PNG/SVG)
  sounds/   sfx (mp3/webm)
  fonts/
src/
  pages/index.astro          the only page
  layouts/Base.astro
  components/
    Hero.astro
    Stage.astro
    MobileFallback.astro
    Popover.astro
    objects/                 one component per interactive object
  content/                   markdown content (bio, case studies, etc.)
  scripts/                   audio, popover, animation helpers
  styles/global.css
```

## Adding an interactive object

1. Drop the artwork into `public/art/`.
2. Create `src/components/objects/MyObject.astro` — give it a click handler and (optionally) a popover slug.
3. Mount it in `src/pages/index.astro` with stage coordinates: `<MyObject x="42%" y="68%" rot="-3deg" />`.
4. If it has content, add a matching markdown file under `src/content/`.

## Mobile

Below 900px or on coarse-pointer devices the page renders `MobileFallback.astro` — a clean card with Jess's bio + key links. The desktop composition only renders above that breakpoint.
