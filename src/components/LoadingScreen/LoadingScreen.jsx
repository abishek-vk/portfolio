import { useRef } from "react";
import { gsap, useGSAP, EASE } from "../../lib/motion";
import { profile } from "../../data/portfolio";

/**
 * Intro loader (~2s): monogram rises, a counter runs to 100 while a hairline
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

      tl.from(".loader-char", { yPercent: 110, duration: 1, stagger: 0.08, ease: EASE.expo })
        .to(counter, {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => (count.current.textContent = String(Math.round(counter.v)).padStart(3, "0")),
        }, 0.2)
        .from(".loader-bar", { scaleX: 0, duration: 1.4, ease: "power2.inOut" }, 0.2)
        .add(() => {
          // Wait for fonts (max 1.5s) before lifting the curtain
          tl.pause();
          Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => tl.play());
        })
        .to(".loader-inner", { yPercent: -40, autoAlpha: 0, duration: 0.7, ease: EASE.inOut })
        .add(() => onReveal?.(), "-=0.3")
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<");
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
