/**
 * Motion core: registers GSAP plugins, owns the Lenis smooth-scroll instance,
 * and exposes the design-system motion tokens so every section animates
 * with the same curves and timings.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const mq = (query) => typeof window !== "undefined" && window.matchMedia(query).matches;

/** Read once at boot; every animation checks this before running. */
export const REDUCED_MOTION = mq("(prefers-reduced-motion: reduce)");
/** True for mouse / trackpad. Cursor, magnetic and tilt effects need it. */
export const FINE_POINTER = mq("(hover: hover) and (pointer: fine)");

/** Motion tokens (mirrored as CSS variables in index.css). */
export const EASE = {
  out: "power3.out", // default reveal curve
  expo: "expo.out", // headlines, large surfaces
  inOut: "power3.inOut", // curtains, menu transitions
};
export const DUR = { fast: 0.6, base: 0.9, slow: 1.2 };
export const STAGGER = { chars: 0.028, words: 0.06, items: 0.08 };

gsap.defaults({ ease: EASE.out, duration: DUR.base });

let lenis = null;

/** Starts Lenis and drives it from GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (REDUCED_MOTION || lenis) return lenis;
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  lenis._gsapTick = tick;
  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(lenis._gsapTick);
  lenis.destroy();
  lenis = null;
}

/** Smooth-scrolls to a selector / element, falling back to native scrolling. */
export function scrollTo(target, opts = {}) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, ...opts });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (typeof target === "number") window.scrollTo({ top: target, behavior: REDUCED_MOTION ? "auto" : "smooth" });
  else el?.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth" });
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle("is-locked", locked);
}

export { gsap, ScrollTrigger, useGSAP };
