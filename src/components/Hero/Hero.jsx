import { useRef } from "react";
import { gsap, useGSAP, REDUCED_MOTION, EASE, STAGGER } from "../../lib/motion";
import { profile, socials } from "../../data/portfolio";
import SplitText from "../ui/SplitText";
import Magnetic from "../ui/Magnetic";
import HeroAvatar from "./HeroAvatar";

/**
 * Hero: oversized kinetic name (left ~55%) beside a floating 3D-styled avatar.
 * The intro timeline waits for `ready` (fired as the loader curtain lifts),
 * then scroll progress drives both the avatar and the content exit.
 */
export default function Hero({ ready }) {
  const root = useRef(null);
  const roleList = useRef(null);

  useGSAP(
    () => {
      if (!ready || REDUCED_MOTION) return;

      /* ---- Intro: name rises letter by letter, then the supporting UI ---- */
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } });
      tl.from(".hero-avatar-stage", { autoAlpha: 0, scale: 0.86, y: 40, duration: 1.8 }, 0.2)
        .from(".hero-char .split-char-inner", { yPercent: 120, rotate: 6, duration: 1.3, stagger: STAGGER.chars * 1.5 }, 0.1)
        .from("[data-hero='fade']", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08, ease: EASE.out }, 0.6)
        .from("[data-hero='line']", { scaleX: 0, duration: 1.2 }, 0.5);

      /* ---- Rotating role: slot-machine roll through each title ---- */
      const n = profile.roles.length;
      const roll = gsap.timeline({ repeat: -1, delay: 2 });
      for (let i = 1; i <= n; i++) {
        roll.to(roleList.current, { yPercent: (-100 / (n + 1)) * i, duration: 0.9, ease: EASE.inOut }, "+=1.8");
      }
      roll.set(roleList.current, { yPercent: 0 });

      /* ---- Scroll out: content and avatar drift up & fade ---- */
      gsap.to(".hero-content", {
        yPercent: -18,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-avatar", {
        yPercent: -12,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section id="home" ref={root} className="relative min-h-[100svh] overflow-hidden" aria-label="Introduction">
      {/* ---- Depth layers: grid → glow → vignette → avatar ---- */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="orb right-[-10%] top-[10%] h-[60vmin] w-[60vmin] bg-[radial-gradient(circle,var(--color-accent-2),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent"
      />
      {/* Above the headline on small screens; right column (aligned to the shell) from lg */}
      <HeroAvatar className="absolute left-1/2 top-[19svh] z-[1] h-[27svh] w-[80vw] -translate-x-1/2 lg:bottom-[8vh] lg:left-auto lg:right-[max(var(--gutter),calc((100vw-1680px)/2+var(--gutter)))] lg:top-[clamp(5.5rem,14vh,8.5rem)] lg:h-auto lg:w-[40%] lg:translate-x-0" />

      <div className="hero-content shell relative z-10 flex min-h-[100svh] flex-col justify-between pb-8 pt-28 md:pb-10 md:pt-36">
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-6">
          <p className="label" data-hero="fade">
            {profile.tagline}
          </p>
          <p className="label hidden text-right sm:block" data-hero="fade">
            Portfolio <span className="text-accent">©{new Date().getFullYear()}</span>
          </p>
        </div>

        {/* Headline */}
        <div className="my-auto pt-[34svh] sm:pt-[32svh] lg:max-w-[55%] lg:pt-0">
          <h1 className="font-display font-semibold leading-[0.82] tracking-[-0.055em]">
            <span className="label mb-4 block !tracking-[0.3em] md:mb-6" data-hero="fade">
              Hi, I'm
            </span>
            <span className="hero-char block text-[length:var(--step-hero)]">
              <SplitText text={profile.firstName} />
            </span>
            <span className="flex flex-wrap items-end gap-x-[3vw] gap-y-4 pl-[8vw] md:pl-[16vw]">
              <span className="hero-char text-[length:var(--step-hero)] text-accent">
                <SplitText text="V." />
              </span>
              {/* Rotating role (decorative; the full list is announced once for screen readers) */}
              <span className="mb-[0.6em] block" data-hero="fade">
                <span className="sr-only">{profile.roles.join(", ")}</span>
                <span
                  aria-hidden="true"
                  className="block h-[1.15em] overflow-hidden text-[length:var(--step-h3)] font-medium tracking-[-0.02em] text-fg"
                >
                  <span ref={roleList} className="block">
                    {[...profile.roles, profile.roles[0]].map((role, i) => (
                      <span key={i} className="block h-[1.15em] leading-[1.15em]">
                        {role}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Bottom row: intro / socials / scroll cue */}
        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-12 lg:max-w-[55%]">
          <div className="md:col-span-5 lg:col-span-6">
            <div className="hairline mb-6 w-24 bg-accent" data-hero="line" />
            <p className="max-w-md text-muted" data-hero="fade">
              {profile.intro}
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-7" data-hero="fade">
            <p className="label mb-3">Connect with me</p>
            <ul className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Magnetic strength={0.5}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={label}
                      className="grid h-12 w-12 place-items-center rounded-full border border-line-strong text-lg text-fg transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-ink"
                    >
                      <Icon />
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:col-span-2 md:col-start-11 md:flex md:justify-end" data-hero="fade">
            <a href="#about" className="group flex flex-col items-center gap-3">
              <span className="label [writing-mode:vertical-rl]">Scroll to explore</span>
              <span className="relative block h-16 w-px overflow-hidden bg-line-strong">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_var(--ease-in-out)_infinite] bg-accent" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
