# Build & Replicate Guide

This document explains how this portfolio is built and how to recreate it from scratch.

## 1) What this project is

This is a **static portfolio website** built with:

- HTML (page structure)
- CSS (visual design + responsive layout)
- JavaScript (light interactions)

No framework is required. You can open `index.html` directly in a browser.

## 2) Final folder structure

```text
HTML-Portfolio/
  index.html
  README.md
  BUILD_AND_REPLICATE.md
  assets/
    css/
      style.css
    data/
      projects.json
    js/
      script.js
    images/
      ...project images + social icons + favicon.svg
  pages/
    about.html
    contact.html
    recent-work.html
    pins.html
  site.webmanifest
```

## 3) How the architecture works

### Core idea

- `index.html` is the home/landing page.
- All internal routes are in `pages/`.
- Shared styling lives in `assets/css/style.css`.
- Shared behavior lives in `assets/js/script.js`.

### Why this structure is good

- Keeps concerns separated (content vs style vs behavior).
- Easy to scale (just add new page in `pages/` and reuse shared assets).
- Easy to deploy as plain static files.

## 4) Design system summary

The design in `style.css` uses:

- CSS custom properties (`:root`) for theme colors.
- A dark default visual theme.
- A light theme override via `html[data-theme="light"]`.
- Responsive project grid using CSS Grid.
- Reusable utility-like classes:
  - `.hero`, `.nav`, `.hero-content`
  - `.projects`, `.project-card`, `.project-detail`
  - `.btn`, `.btn-primary`, `.btn-ghost`

## 5) JavaScript features

In `assets/js/script.js`:

1. Theme toggle with localStorage persistence.
2. Active navigation link highlighting based on URL.
3. Monitor project prioritization (keeps Pins card first in project grids).
4. JSON-driven project cards rendered from `assets/data/projects.json`.
5. Scroll reveal animations using `IntersectionObserver`.
6. Contact form fallback to `mailto:` when placeholder endpoint is used.
7. Footer year auto-update.

## 6) How to replicate from scratch

### Step A: Create folders

Create:

- `assets/css`
- `assets/js`
- `assets/data`
- `assets/images`
- `pages`

### Step B: Build the home page

In `index.html`:

- Add the hero/nav layout.
- Add a projects section.
- Link CSS: `./assets/css/style.css`
- Link JS: `./assets/js/script.js`

### Step C: Build internal pages

Create pages in `pages/` (about, contact, recent-work, project details).

For each page:

- Reuse the same header/footer structure.
- Use relative links to shared assets:
  - CSS: `../assets/css/style.css`
  - JS: `../assets/js/script.js`

### Step D: Add shared styles

In `assets/css/style.css`:

- Add color tokens in `:root`.
- Add layout styles for hero, nav, cards, buttons, footer.
- Add media queries for mobile behavior.
- Add classes used by JS (`.reveal`, `.is-visible`, `.nav a.active`, `.theme-toggle`).
- Add accessibility styles for skip link and `:focus-visible`.

### Step E: Add shared script

In `assets/js/script.js`:

- Write initialization functions for theme, nav state, animations, and project priority.
- Add JSON project rendering and contact form fallback handlers.
- Call them once at the bottom.

### Step F: Add media assets

Place images/icons in `assets/images/` and reference them with proper relative paths.
Add `site.webmanifest` and link `favicon.svg` + manifest in each page head.

## 7) How to customize quickly

- Update intro copy in `index.html`.
- Update project details in `pages/pins.html`.
- Add or remove cards in `index.html` and `pages/recent-work.html`.
- Tweak colors in `:root` inside `assets/css/style.css`.

## 8) Deployment options

Because this is static, you can deploy on:

- GitHub Pages
- Netlify
- Vercel (static)
- Any web host that serves HTML/CSS/JS

## 9) Optional next improvements

- Connect the contact form to a real Formspree endpoint.
- Add richer Open Graph images for social previews.
- Run manual accessibility audits (Lighthouse + keyboard-only pass).
- Add a tiny CI check (HTML/CSS linting).
