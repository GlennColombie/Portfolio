# Portfolio

My portfolio I'm currently working on.

## Current structure

- `index.html` → main landing page
- `assets/css/style.css` → shared styles
- `assets/js/script.js` → shared JavaScript interactions
- `assets/data/projects.json` → project data source for cards
- `assets/images/` → project images and social icons
- `pages/` → internal pages (`about`, `contact`, `recent-work`, project pages)
- `site.webmanifest` → PWA/site metadata

## Notes

- Main navigation now targets the `pages/` directory.
- Theme toggle, active-nav highlighting, reveal animations, JSON-driven project rendering, and auto year update are handled in `assets/js/script.js`.
- Accessibility upgrades include skip links and keyboard-visible focus states.
- Contact page includes a form endpoint pattern with mail client fallback.

## Full guide

- See `BUILD_AND_REPLICATE.md` for a full walkthrough of how this was built and how to recreate it.
