# Rajneesh Sisodia — Full Stack Developer Portfolio

A modern, single-page developer portfolio for **Rajneesh Sisodia** (Delhi, India):
Bazil-style giant-type hero, toolbox marquee, terminal-style About, filterable
skill index with a 3D orb, changelog Experience timeline, project card grid,
credentials, and a centered contact CTA.

## Tech stack

- **React 19 + Vite 6** with `@/` path alias
- **Tailwind CSS v4** (CSS-variable theme tokens)
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
```

## Making it yours (TODO placeholders)

All personal content lives in `src/data/` — no hardcoded content in sections:

| File | Fill in |
| ---- | ------- |
| `src/data/socials.js` | `email`, `github`, `linkedin` |
| `src/data/projects.js` | Live/repo URLs + the 3 `TODO_project_*` entries |
| `src/data/resume.js` | Internship dates + responsibility bullets |
| `public/avatar.jpg` | Portrait photo (falls back to an `RS` monogram) |
| `public/resume.pdf` | Resume file, then set `download.available: true` in `resume.js` |

## Project structure

```
src/
├── App.jsx                    # composition + providers
├── components/
│   ├── animations/            # Reveal, TextReveal, Magnetic, ScrollProgress,
│   │                          # SectionHeading, StaggerGroup
│   ├── layout/                # Navbar, SiteFooter
│   ├── providers/             # SmoothScroll (Lenis), ThemeProvider, SceneCanvas
│   ├── sections/              # Hero, StackMarquee, About, Services, Skills,
│   │                          # Experience, Projects, Education, Contact
│   ├── three/                 # SkillsScene (lazy-loaded R3F chunk)
│   └── ui/                    # Avatar, Badge, Button, Card, EmailCopyButton,
│                              # ResumeButton, Sheet, SocialLinks, Toaster
├── data/                      # resume.js, projects.js, socials.js, siteCopy.js, themes.js
├── hooks/                     # useInView, useIsMobile, useReducedMotion, useTheme, useWebGL
└── lib/                       # gsap setup, cn() utils
```

## Notes

- One accent color + one secondary, defined as CSS variables in `src/styles.css`
  (`:root` + `html[data-theme]`); Space Grotesk + IBM Plex Mono via Fontsource.
- 3D is skipped on mobile, low-power devices, unavailable WebGL, and
  `prefers-reduced-motion` (a 2D fallback renders instead); canvases pause off-screen.
- Accessibility: semantic landmarks, one `h1`, `aria-labelledby` sections,
  visible focus states, canvases are `aria-hidden` with text equivalents.
