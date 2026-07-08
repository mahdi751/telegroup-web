# Telegroup Security — Website

A premium, fully responsive marketing website for **Telegroup Security** — built as the next evolution of the brand. Security technology and low-voltage infrastructure, engineered around how each property actually operates.

## Stack

- **React 18 + TypeScript**
- **Vite** — fast dev server, code-split production build
- **React Router v6** — SPA routing with hash-anchor scroll handling
- **Framer Motion** — tasteful reveal / stagger / micro-interactions (respects `prefers-reduced-motion`)
- **react-helmet-async** — per-page SEO (title, description, canonical, Open Graph, Twitter, JSON-LD)

No CSS framework — a hand-built design system (`src/styles/global.css`, `src/styles/ui.css`) with CSS custom properties for the black + gold brand identity.

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, stats, 8 capabilities, detect/deter/respond, method, industries, CTA |
| `/solutions` | 8 capabilities in depth + delivery assurance |
| `/industries` | 6 industries with common needs |
| `/about` | Story, approach (4-phase method), why choose us |
| `/contact` | Validated quote form, contact info, service areas |
| `*` | 404 |

## Commands

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:5173
npm run build   # type-check + production build → /dist
npm run preview # preview the production build
```

## Highlights

- **SEO** — semantic HTML, single `<h1>` per page, canonical URLs, OG/Twitter cards, `SecurityService` + `ItemList` structured data, sitemap & robots.
- **Accessibility** — skip link, keyboard-navigable nav & forms, aria labels, focus-visible styling, reduced-motion support, WCAG-oriented contrast.
- **Performance** — route-level code splitting, vendor/motion chunk separation, transform/opacity-only animations, self-contained SVG artwork (no heavy hero images).
- **Responsive** — intentionally designed mobile layouts (not stacked desktop), full-screen mobile menu.

## Design system

Brand tokens live in `:root` (`src/styles/global.css`): ink scale, gold scale, typography (`Sora` display / `Inter` body), radii, shadows, easing. The logo is a scalable inline SVG component (`src/components/Logo.tsx`).

## Notes

The contact form is wired for client-side validation and a simulated submit. Connect the `onSubmit` handler in `src/pages/Contact.tsx` to your backend / email service (e.g. Formspree, a serverless function, or an SMTP endpoint) to go live.

Deploy any static host — a SPA redirect rule is included (`public/_redirects`) for Netlify-style hosts; add an equivalent rewrite for others.
