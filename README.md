# Abishek V — Portfolio

A dark, editorial, motion-driven portfolio built with React, Three.js, GSAP and Lenis.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
npm run lint
```

## Stack

| Library | Purpose |
| --- | --- |
| React 19 + Vite | App + bundling |
| Tailwind CSS v4 | Utility styling, driven by the design tokens in `src/index.css` |
| three | Hero WebGL scene (lazy-loaded in its own chunk) |
| gsap + @gsap/react | All animation: ScrollTrigger reveals, pinning, timelines |
| lenis | Smooth scrolling, synced to GSAP's ticker |
| react-icons | Icons |

Fonts: Clash Display + Satoshi (Fontshare), JetBrains Mono (Google Fonts), loaded in `index.html`.

## Where things live

```
src/
  data/portfolio.js      ← all content (profile, links, skills, projects, education)
  lib/motion.js          ← GSAP setup, Lenis, motion tokens, reduced-motion / pointer flags
  utils/animations.js    ← declarative data-reveal / data-speed scroll animations
  index.css              ← design system: tokens, type scale, surfaces, interactions
  components/
    ui/                  ← SplitText, Magnetic, TiltCard, Cursor, SectionHeading
    Hero/                ← Hero + HeroScene (three.js)
    About/ Skills/ Projects/ Experience/ Contact/ Navbar/ Footer/ LoadingScreen/
```

To update content, edit `src/data/portfolio.js`; sections read from it.

## Animating new elements

Add a data attribute; `initScrollAnimations()` picks it up:

```jsx
<h2 data-reveal="chars"><SplitText text="Hello world" /></h2>
<p data-reveal="up" data-delay="0.1">Copy…</p>
<div data-reveal="stagger"><div data-reveal-item/>…</div>
<div data-speed="0.4" />   {/* parallax depth */}
```

Available: `chars`, `words`, `up`, `fade`, `line`, `clip`, `stagger`.

## Accessibility & performance

- `prefers-reduced-motion`: no smooth scroll, no pinning, no reveals, and a single still frame of the 3D scene. All content is visible because hidden states are only set by JS.
- The custom cursor, magnetic and tilt effects only run on fine pointers (mouse/trackpad).
- The WebGL scene pauses off-screen and in background tabs. Mobile gets fewer vertices and particles and a capped pixel ratio.
- Skip link, semantic landmarks, focus-visible styles, and a focus-managed menu (Esc to close).
