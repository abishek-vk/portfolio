import { useRef } from "react";
import { gsap, useGSAP, EASE } from "../../lib/motion";
import { profile } from "../../data/portfolio";

/** Resolves once the font stylesheets (loaded async in index.html) and the display/body faces are in. */
const waitForFonts = () =>
  Promise.resolve(window.fontCss).then(() =>
    Promise.all(['600 1em "Clash Display"', '400 1em "Satoshi"'].map((f) => document.fonts?.load(f)))
  );

/**
 * Intro loader (~1.5s): monogram rises, a counter runs to 100 while a hairline
 * fills, then the panel lifts like a curtain to reveal the hero.
 *
 *   onReveal → fired as the curtain starts lifting (hero intro begins)
 *   onDone   → fired when fully gone (component can unmount)
 *
 * Holds at 100 until web fonts are ready so the hero never flashes fallback type.
 */
export default function LoadingScreen({ onReveal, onDone }) {
  const root = useRef(null);
  const count = useRef(null);

  useGSAP(
    () => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: onDone });

      tl.from(".loader-char", { yPercent: 110, duration: 0.8, stagger: 0.08, ease: EASE.expo })
        .to(counter, {
          v: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => (count.current.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        }, 0.15)
        .from(".loader-bar", { scaleX: 0, duration: 0.9, ease: "power2.inOut" }, 0.15)
        .add(() => {
          // Wait for fonts (max 1s) before lifting the curtain
          tl.pause();
          Promise.race([waitForFonts(), new Promise((r) => setTimeout(r, 1000))]).then(() => tl.play());
        })
        .to(".loader-inner", { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: EASE.inOut })
        .add(() => onReveal?.(), "-=0.25")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden bg-ink-2"
    >
      <div className="loader-inner flex w-[min(80vw,420px)] flex-col items-center">
        <p className="mb-8 flex overflow-hidden font-display text-[clamp(4rem,8vw,6rem)] font-semibold leading-none tracking-[-0.06em]">
          {[...profile.initials].map((ch, i) => (
            <span key={i} className={`loader-char inline-block ${i === 1 ? "text-accent" : ""}`}>
              {ch}
            </span>
          ))}
        </p>
        <div className="loader-bar hairline w-full origin-left bg-accent" />
        <div className="mt-4 flex w-full justify-between">
          <span className="label">{profile.name} — Portfolio</span>
          <span ref={count} className="label tabular-nums text-fg">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
