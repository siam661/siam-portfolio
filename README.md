# Siam — Portfolio

A cinematic, story-driven developer portfolio built with React, Vite, Tailwind CSS, GSAP, Lenis, and Three.js (React Three Fiber).

## Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production files are output to `dist/`.

## Deploy for free

Any static host works since this builds to plain HTML/CSS/JS. Easiest options:

- **Netlify / Vercel**: connect your GitHub repo, build command `npm run build`, output directory `dist`. Auto-deploys on every push.
- **GitHub Pages**: push `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package), matching how your other two projects are already hosted.

## Adding project screenshots

1. Take a screenshot of the live site (browser window, no extra chrome around it).
2. Save it into `public/projects/` — e.g. `public/projects/urban-plate.jpg`.
   Recommended: ~1600×1000px, JPG or WebP, under ~300KB.
3. It's already wired up — `src/data/projects.js` points `image` at
   `/projects/urban-plate.jpg` and `/projects/lumora-resort.jpg`. If a file
   is missing, the site just shows a clean numbered placeholder instead of a
   broken image, so nothing breaks while you're still collecting screenshots.

## Adding more projects (5–6 more, once they're ready)

Open `src/data/projects.js` and add one object per project to the array:

```js
{
  id: "your-project-slug",
  title: "Your Project Name",
  description: "One honest sentence about what it is and who it's for.",
  url: "https://your-live-link.com/",
  image: "/projects/your-project-slug.jpg", // optional, see above
},
```

That's it — no other file needs to change. The page automatically:
- numbers each project (01, 02, 03...) based on its position in the array
- alternates the image/text layout left-right as you add more
- animates each new entry in on scroll the same way as the first two

## Before you go live

- Add a real Open Graph image at `public/og-cover.jpg` (1200×630px) and update the `og:url` / `canonical` values in `index.html` once the site has a real domain.
- Double check the email and WhatsApp number in `src/sections/FinalContact.jsx`.

## Project structure

```
src/
  components/   shared UI: nav, cursor, magnetic button, grain overlay, 3D form
  sections/     one file per chapter of the story
  animations/   reusable GSAP scroll-reveal helper
  hooks/        reduced-motion, touch-device, and Lenis+ScrollTrigger wiring
  data/         real project data (no invented details)
```

## Notes on the build

- Respects `prefers-reduced-motion`: Lenis smooth-scroll and GSAP entrance animations are skipped in favor of instant, native behavior.
- The custom cursor and magnetic hover effects are disabled automatically on touch devices.
- Three.js/React Three Fiber are code-split into their own chunk and only load once you scroll near Chapter 02, so the initial page load stays light.
# siam-portfolio
