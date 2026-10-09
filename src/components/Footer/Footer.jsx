import { useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import { gsap, useGSAP, REDUCED_MOTION, scrollTo } from "../../lib/motion";
import { profile, socials } from "../../data/portfolio";
import Magnetic from "../ui/Magnetic";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

/**
 * Footer: info row plus a giant wordmark that rises out of the page bottom
 * as you reach the end (scrubbed to scroll).
 */
export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (REDUCED_MOTION) return;
      gsap.from(".footer-mark", {
        yPercent: 60,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line">
      <div className="shell grid grid-cols-1 gap-12 pt-20 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-semibold tracking-[-0.03em]">{profile.name}</p>
          <p className="mt-4 max-w-xs text-muted">{profile.footerBlurb}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="label mb-5">Quick Links</p>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="roll">
                  <span>{link.name}</span>
                  <span aria-hidden="true">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label mb-5">Connect</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="roll"
                >
                  <span>{s.label}</span>
                  <span aria-hidden="true">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell mt-16 flex items-center justify-between gap-6 border-t border-line py-6">
        <p className="text-sm text-subtle">&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <Magnetic>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="grid h-12 w-12 place-items-center rounded-full border border-line-strong transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-ink"
          >
            <FaArrowUp />
          </button>
        </Magnetic>
      </div>

      {/* Giant wordmark */}
      <p
        aria-hidden="true"
        className="footer-mark select-none whitespace-nowrap bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text px-[var(--gutter)] pb-2 text-center font-display text-[17vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent"
      >
        {profile.name.toUpperCase()}
      </p>
    </footer>
  );
}
