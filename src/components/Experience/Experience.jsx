import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, REDUCED_MOTION } from "../../lib/motion";
import { FaCertificate } from "react-icons/fa";
import { timeline, certifications } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";

/**
 * Education timeline + certifications.
 *  - Heading column stays sticky while the timeline scrolls past it.
 *  - The rail fills with light as you scroll (scrubbed).
 *  - Each node ignites as it crosses the reading line.
 */
export default function Experience() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (REDUCED_MOTION) return;

      gsap.fromTo(
        ".tl-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".tl-list", start: "top 60%", end: "bottom 60%", scrub: true },
        }
      );

      gsap.utils.toArray(".tl-item").forEach((item) => {
        const node = item.querySelector(".tl-node");
        node.classList.remove("is-active");
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          onEnter: () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        });
        gsap.from(item.querySelector(".tl-year"), {
          xPercent: 12,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="section" aria-labelledby="experience-title">
      <div aria-hidden="true" data-speed="0.5" className="orb right-[-12%] top-[30%] h-[45vmin] w-[45vmin] bg-[radial-gradient(circle,var(--color-accent-3),transparent_65%)]" />

      <div className="shell relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Narrower column, so the headline steps down one size */}
            <SectionHeading className="[--step-display:clamp(2.75rem,5vw,5.25rem)]" id="experience-title" index={4} eyebrow="Learning path" title="Education &" accent="background.">
              My academic journey and continuous learning path in Computer Science and technology.
            </SectionHeading>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="tl-list relative">
            {/* Rail + scrubbed light fill */}
            <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 w-px bg-line" />
            <span aria-hidden="true" className="tl-fill absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent" />

            {timeline.map(({ icon: Icon, title, org, period, note, desc }) => (
              <li key={title} className="tl-item relative pb-20 pl-20 last:pb-0 md:pl-24">
                <span
                  aria-hidden="true"
                  className="tl-node is-active absolute left-0 top-1 grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-ink text-lg text-muted transition-all duration-700 [&.is-active]:border-accent [&.is-active]:bg-accent [&.is-active]:text-ink [&.is-active]:shadow-[var(--shadow-glow)]"
                >
                  <Icon />
                </span>

                <p className="tl-year font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em]">
                  {period[0]}
                  <span className="mx-3 text-accent">—</span>
                  <span className="text-outline">{period[1]}</span>
                </p>
                {note && <p className="label mt-3">({note})</p>}

                <article className="glass mt-8 p-7 md:p-9" data-reveal="up">
                  <h3 className="font-display text-[length:var(--step-h3)] font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="label mt-3 !text-accent">{org}</p>
                  <p className="mt-5 text-muted">{desc}</p>
                </article>
              </li>
            ))}
          </ol>

          {/* ---- Certifications ---- */}
          <div className="mt-24 md:pl-24">
            <p className="label mb-6" data-reveal="fade">Certifications</p>
            <ul className="border-t border-line" data-reveal="stagger">
              {certifications.map(({ title, issuer }) => (
                <li key={title} data-reveal-item className="group flex items-center gap-5 border-b border-line py-5">
                  <FaCertificate aria-hidden="true" className="shrink-0 text-xl text-subtle transition-colors duration-500 group-hover:text-accent" />
                  <span className="min-w-0 flex-1 font-display text-xl font-medium tracking-[-0.02em] md:text-2xl">{title}</span>
                  <span className="label shrink-0 !text-accent">{issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
