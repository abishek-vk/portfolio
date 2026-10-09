/**
 * Declarative scroll animations.
 *
 * Instead of wiring GSAP by hand in every section, components tag elements
 * with data attributes and `initScrollAnimations()` (called once from App)
 * turns them into ScrollTriggers. This keeps the timing, easing and stagger
 * identical across the whole site.
 *
 *   data-reveal="chars"   split-text headline, letters rise from a mask
 *   data-reveal="words"   split-text, words rise from a mask
 *   data-reveal="up"      fade + rise (default for copy / blocks)
 *   data-reveal="fade"    opacity only
 *   data-reveal="line"    hairline draws left → right
 *   data-reveal="clip"    image / panel wipes up from its bottom edge
 *   data-reveal="stagger" children marked [data-reveal-item] rise in sequence
 *   data-delay="0.2"      optional delay in seconds
 *   data-speed="0.3"      parallax depth (positive = slower than scroll)
 *
 * Elements stay fully visible if JS fails or the user prefers reduced motion,
 * because hidden states are only ever applied by GSAP, never by CSS.
 */
import { gsap, REDUCED_MOTION, EASE, DUR, STAGGER } from "../lib/motion";

const START = "top 85%";

const builders = {
  chars: (el, delay) =>
    gsap.from(el.querySelectorAll(".split-char-inner"), {
      yPercent: 115,
      rotate: 4,
      duration: DUR.slow,
      ease: EASE.expo,
      stagger: STAGGER.chars,
      delay,
      scrollTrigger: { trigger: el, start: START },
    }),
  words: (el, delay) =>
    gsap.from(el.querySelectorAll(".split-word-inner"), {
      yPercent: 115,
      duration: DUR.slow,
      ease: EASE.expo,
      stagger: STAGGER.words,
      delay,
      scrollTrigger: { trigger: el, start: START },
    }),
  up: (el, delay) =>
    gsap.from(el, { autoAlpha: 0, y: 48, duration: DUR.base, delay, scrollTrigger: { trigger: el, start: START } }),
  fade: (el, delay) =>
    gsap.from(el, { autoAlpha: 0, duration: DUR.slow, delay, scrollTrigger: { trigger: el, start: START } }),
  line: (el, delay) =>
    gsap.from(el, { scaleX: 0, duration: DUR.slow, ease: EASE.expo, delay, scrollTrigger: { trigger: el, start: START } }),
  clip: (el, delay) =>
    gsap.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.slow, ease: EASE.inOut, delay, scrollTrigger: { trigger: el, start: START } }
    ),
  stagger: (el, delay) =>
    gsap.from(el.querySelectorAll("[data-reveal-item]"), {
      autoAlpha: 0,
      y: 40,
      duration: DUR.base,
      stagger: STAGGER.items,
      delay,
      scrollTrigger: { trigger: el, start: START },
    }),
};

export function initScrollAnimations(root = document) {
  if (REDUCED_MOTION) return;

  root.querySelectorAll("[data-reveal]").forEach((el) => {
    const build = builders[el.dataset.reveal];
    if (build) build(el, parseFloat(el.dataset.delay || 0));
  });

  // Parallax depth layers: each element drifts against the scroll by its speed.
  root.querySelectorAll("[data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed);
    gsap.fromTo(
      el,
      { yPercent: speed * 40 },
      {
        yPercent: -speed * 40,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });
}
