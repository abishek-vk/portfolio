import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, EASE, REDUCED_MOTION, lockScroll } from "../../lib/motion";
import { navLinks, profile, socials } from "../../data/portfolio";
import Magnetic from "../ui/Magnetic";

/**
 * Minimal sticky bar: monogram, live "current section" label, CTA and a menu
 * toggle. The bar tucks away on scroll-down and returns on scroll-up.
 * The menu is a full-screen overlay revealed with an expanding circle,
 * links rising from masks. Esc closes it and focus returns to the toggle.
 */
export default function Navbar({ ready }) {
  const bar = useRef(null);
  const overlay = useRef(null);
  const toggle = useRef(null);
  const menuTl = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(navLinks[0]);

  useGSAP(() => {
    /* Scroll progress hairline */
    gsap.to(".nav-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });

    /* Track which section is in view for the label */
    navLinks.forEach((link) => {
      ScrollTrigger.create({
        trigger: link.href,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setCurrent(link),
      });
    });

    /* Hide on scroll down, show on scroll up */
    if (!REDUCED_MOTION) {
      const show = gsap.quickTo(bar.current, "yPercent", { duration: 0.6, ease: EASE.out });
      ScrollTrigger.create({
        start: 120,
        end: "max",
        onUpdate: (self) => show(self.direction === 1 && !document.documentElement.classList.contains("is-locked") ? -110 : 0),
        onLeaveBack: () => show(0),
      });
    }

    /* Menu overlay timeline (played / reversed by the toggle).
       Reduced motion gets a plain short fade instead of the circle wipe. */
    const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.expo } });
    if (REDUCED_MOTION) {
      tl.fromTo(overlay.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" });
    } else {
      tl.set(overlay.current, { visibility: "visible" })
        .fromTo(
          overlay.current,
          { clipPath: "circle(0% at calc(100% - 3.5rem) 2.5rem)" },
          { clipPath: "circle(150% at calc(100% - 3.5rem) 2.5rem)", duration: 1.1, ease: EASE.inOut }
        )
        .from(".menu-link-inner", { yPercent: 110, duration: 1, stagger: 0.06 }, "-=0.55")
        .from(".menu-meta", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, "-=0.8");
    }
    menuTl.current = tl;
  });

  /* Bar entrance once the loader has lifted */
  useGSAP(
    () => {
      if (ready && !REDUCED_MOTION) gsap.from(".nav-item", { yPercent: -120, autoAlpha: 0, duration: 1, stagger: 0.08, delay: 0.5, ease: EASE.expo });
    },
    { dependencies: [ready], scope: bar }
  );

  /* Open / close side effects */
  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    lockScroll(open);
    if (open) {
      gsap.to(bar.current, { yPercent: 0, duration: 0.4 });
      tl.timeScale(1).play();
      // Focus once the overlay is visible (it becomes visible on the timeline's first tick)
      gsap.delayedCall(0.1, () => overlay.current?.querySelector("a")?.focus({ preventScroll: true }));
    } else if (tl.progress() > 0) {
      tl.timeScale(1.6).reverse();
    }

    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const index = navLinks.indexOf(current);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[60]">
        {/* Frosted backdrop that fades out at its lower edge so the bar floats over content */}
        <div className="pointer-events-none absolute inset-0 bg-ink/70 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
        <nav className="shell relative flex h-20 items-center justify-between gap-6 md:h-24" aria-label="Primary">
          <div className="nav-item flex items-center gap-6">
            <Magnetic>
              <a
                href="#home"
                aria-label={`${profile.name}, back to top`}
                className="grid h-11 w-11 place-items-center rounded-full border border-line-strong font-display text-sm font-semibold tracking-tight transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                {profile.initials}
              </a>
            </Magnetic>
            {/* Live section indicator */}
            <p className="label hidden items-center gap-3 md:flex" aria-live="polite">
              <span className="text-accent">({String(index).padStart(2, "0")})</span>
              <span className="text-fg">{current.name}</span>
            </p>
          </div>

          <div className="nav-item flex items-center gap-3">
            <a href="#contact" className="btn hidden !py-3 sm:inline-flex">
              Let's talk
            </a>
            <Magnetic>
              <button
                ref={toggle}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="group relative z-[70] grid h-12 w-12 place-items-center rounded-full bg-fg text-ink"
              >
                <span className="relative block h-3 w-5">
                  <span className="absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-aria-expanded:translate-y-1.5 group-aria-expanded:rotate-45" />
                  <span className="absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-aria-expanded:-translate-y-1.5 group-aria-expanded:-rotate-45" />
                </span>
              </button>
            </Magnetic>
          </div>
        </nav>
        <div className="nav-progress absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2" />
      </header>

      {/* ---- Full-screen menu ---- */}
      <div
        id="site-menu"
        ref={overlay}
        className="invisible fixed inset-0 z-[55] overflow-y-auto bg-ink-2"
        aria-hidden={!open}
        inert={!open}
      >
        <div aria-hidden="true" className="orb -left-[10%] bottom-[-20%] h-[70vmin] w-[70vmin] bg-[radial-gradient(circle,var(--color-accent),transparent_65%)] !opacity-20" />
        <div className="shell relative grid min-h-full grid-cols-1 content-center gap-12 py-28 lg:grid-cols-12">
          <ul className="lg:col-span-8">
            {navLinks.map((link, i) => (
              <li key={link.name} className="overflow-hidden border-b border-line">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="menu-link-inner group flex items-baseline gap-6 py-2 font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.05] tracking-[-0.04em] transition-colors duration-500 hover:text-accent md:py-3"
                >
                  <span className="label w-8 shrink-0 transition-colors group-hover:text-accent">0{i}</span>
                  <span className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-6">
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col justify-end gap-10 lg:col-span-3 lg:col-start-10">
            <div className="menu-meta">
              <p className="label mb-3">Get in touch</p>
              <a href={`mailto:${profile.email}`} className="link-underline break-all text-fg">
                {profile.email}
              </a>
            </div>
            <div className="menu-meta">
              <p className="label mb-3">Socials</p>
              <ul className="flex flex-col gap-2">
                {socials
                  .filter((s) => s.label !== "Email")
                  .map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="roll text-lg">
                        <span>{s.label}</span>
                        <span aria-hidden="true">{s.label}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <p className="menu-meta label flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to new opportunities
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
