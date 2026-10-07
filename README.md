# Rajneesh Sisodia — Full Stack Developer Portfolio

A modern, single-page developer portfolio for **Rajneesh Sisodia** (Delhi, India):
giant-type hero, toolbox marquee, terminal-style About, filterable skill index
with a 3D orb, changelog Experience timeline, project card grid, credentials,
and a spec-sheet contact panel.

## Tech stack

- **React 19 + Vite 6** with `@/` path alias
- **Tailwind CSS v4** (single light theme via CSS variables in `src/styles.css`)
- **Motion** — reveals, heading animations, filter tabs, menu transitions
- **GSAP + ScrollTrigger** (via `useGSAP`) — timeline draw, scroll parallax
- **Lenis** — smooth scrolling through a single provider
- **Three.js / R3F / Drei** — one lazy-loaded Skills orb (procedural, no assets)
- **Lucide** icons · **shadcn-style** Button/Card/Badge/Sheet · **Sonner** toasts

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build (http://localhost:4173)
npm run resume   # regenerate public/resume.pdf from src/data
```

## Content guide

All personal content lives in `src/data/` — sections contain no hardcoded content:

| File | Status / action |
| ---- | --------------- |
| `src/data/socials.js` | `email` + `github` live; add `linkedin` URL (the row appears automatically) |
| `src/data/projects.js` | Add more projects using the documented object shape |
| `src/data/resume.js` | Add internship dates + responsibility bullets (they render automatically) |
| `public/main.jpeg` | Portrait photo (falls back to an `RS` monogram) |
| `public/resume.pdf` | Generated — rerun `npm run resume` after editing data |

Anything still missing from the data is hidden from the UI rather than shown
as a placeholder; defensive toasts point at the file and field to fill in.

## Project structure

```
src/
├── App.jsx                    # composition + providers
├── components/
│   ├── animations/            # Reveal, TextReveal, Magnetic, ScrollProgress,
│   │                          # SectionHeading, StaggerGroup
│   ├── layout/                # Navbar, SiteFooter
│   ├── providers/             # SmoothScroll (Lenis), SceneCanvas
│   ├── sections/              # Hero, StackMarquee, About, Skills,
│   │                          # Experience, Projects, Education, Contact
│   ├── three/                 # SkillsScene (lazy-loaded R3F chunk)
│   └── ui/                    # Badge, Button, Card, EmailCopyButton, LogoMark,
│                              # ResumeButton, Sheet, SocialLinks, Toaster
├── data/                      # resume.js, projects.js, socials.js, siteCopy.js
├── hooks/                     # useInView, useIsMobile, useReducedMotion, useWebGL
├── lib/                       # gsap setup, cn() utils
└── scripts/
    └── generate-resume.js     # dependency-free PDF generator (see npm run resume)
```

## Notes

- One accent color + one secondary, defined as CSS variables in `:root` inside
  `src/styles.css`; Space Grotesk + IBM Plex Mono via Fontsource.
- 3D is skipped on mobile, low-power devices, unavailable WebGL, and
  `prefers-reduced-motion` (a 2D fallback renders instead); canvases pause off-screen.
- Accessibility: semantic landmarks, one `h1`, `aria-labelledby` sections,
  visible focus states, canvases are `aria-hidden` with text equivalents.
