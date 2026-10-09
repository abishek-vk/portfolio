import { useRef } from "react";
import { gsap, useGSAP, REDUCED_MOTION } from "../../lib/motion";
import { about, profile } from "../../data/portfolio";
import abiImage from "../../assets/abi image.jpeg";
import SectionHeading from "../ui/SectionHeading";

/**
 * About: editorial two-column composition.
 *  - Portrait in a layered glass frame (clip reveal + inner parallax)
 *  - Lead paragraph whose words light up as you scroll through it
 *  - Count-up stats
 *  - "What I do" index list with hover expansion
 */
export default function About() {
  const root = useRef(null);
  const [lead, body] = about.paragraphs;

  useGSAP(
    () => {
      if (REDUCED_MOTION) return;

      // Scroll-reactive copy: each word brightens as the paragraph passes the reading line
      gsap.fromTo(
        ".scrub-word",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ".scrub-lead", start: "top 80%", end: "bottom 50%", scrub: true },
        }
      );

      // Stats count up from zero when they enter
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: Number(el.dataset.count),
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = Math.round(counter.v)),
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="section overflow-hidden" aria-labelledby="about-title">
      <div aria-hidden="true" data-speed="0.6" className="orb -left-[15%] top-[20%] h-[50vmin] w-[50vmin] bg-[radial-gradient(circle,var(--color-accent-2),transparent_65%)]" />

      <div className="shell relative">
        <SectionHeading id="about-title" index={1} eyebrow="About me" title="Crafting digital" accent="excellence." />

        <div className="mt-20 grid grid-cols-1 gap-16 md:mt-28 lg:grid-cols-12 lg:gap-10">
          {/* ---- Portrait ---- */}
          <figure className="relative mx-auto w-full max-w-md self-start lg:col-span-5 lg:mx-0">
            {/* offset frame for layered depth */}
            <div aria-hidden="true" className="absolute -inset-3 translate-x-6 translate-y-6 rounded-[var(--radius-xl)] border border-line" />
            <div className="glass relative overflow-hidden !rounded-[var(--radius-xl)] p-3" data-reveal="clip">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-xl)-0.75rem)]">
                <img
                  src={abiImage}
                  alt="Portrait of Abishek V"
                  loading="lazy"
                  decoding="async"
                  data-speed="0.25"
                  className="absolute inset-0 h-[120%] w-full -translate-y-[8%] object-cover grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
            </div>
            <figcaption className="glass absolute -bottom-6 left-6 flex items-center gap-3 !rounded-full px-5 py-3 text-sm md:-right-10 md:left-auto" data-reveal="up" data-delay="0.4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.tagline}
            </figcaption>
          </figure>

          {/* ---- Copy + stats ---- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="scrub-lead font-display text-[clamp(1.5rem,1.8vw,1.875rem)] font-medium leading-[1.2] tracking-[-0.02em]">
              {lead.split(" ").map((word, i) => (
                <span key={i} className="scrub-word">
                  {word}{" "}
                </span>
              ))}
            </p>
            <p className="mt-10 max-w-xl text-muted" data-reveal="up">
              {body}
            </p>

            <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10" data-reveal="stagger">
              {about.stats.map((s) => (
                <div key={s.label} data-reveal-item className="flex flex-col-reverse">
                  <dt className="label mt-3">{s.label}</dt>
                  <dd className="font-display text-[clamp(2.75rem,3.8vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">
                    <span data-count={s.value}>{s.value}</span>
                    <span className="text-accent">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ---- What I do ---- */}
        <div className="mt-32 md:mt-40">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h3 className="font-display text-[length:var(--step-h3)]" data-reveal="up">What I do</h3>
            <span className="label" data-reveal="fade">0{about.features.length} disciplines</span>
          </div>
          <ul className="border-t border-line" data-reveal="stagger">
            {about.features.map(({ icon: Icon, title, desc }, i) => (
              <li
                key={title}
                data-reveal-item
                className="group relative grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-3 border-b border-line py-8 transition-colors duration-500 hover:bg-glass md:grid-cols-[5rem_1fr_1fr_3rem] md:items-center md:py-10"
              >
                <span className="label pt-2 transition-colors group-hover:text-accent md:pt-0">0{i + 1}</span>
                <h4 className="font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-medium transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-accent">
                  {title}
                </h4>
                <p className="col-start-2 max-w-md text-muted md:col-start-3">{desc}</p>
                <Icon aria-hidden="true" className="hidden text-2xl text-subtle transition-all duration-500 group-hover:rotate-12 group-hover:text-accent md:block" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
