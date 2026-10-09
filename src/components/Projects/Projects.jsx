import { useRef } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { gsap, useGSAP, REDUCED_MOTION, EASE } from "../../lib/motion";
import { projects } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import Magnetic from "../ui/Magnetic";

// Keep in sync with the `stage` custom variant in index.css
const STAGE_QUERY = "(min-width: 1024px) and (min-height: 700px)";

// Allow long camelCase names ("CodingLabPlatform") to wrap at word boundaries
const breakCamel = (s) =>
  s.split(/(?<=[a-z])(?=[A-Z])/).flatMap((part, i) => (i ? [<wbr key={i} />, part] : [part]));

// Address-bar text on the cover: live domain, else the project's platform
const coverAddress = (p) => (p.liveUrl ? new URL(p.liveUrl).host : p.platform || "github.com");

/**
 * Generated cover art (the projects have no screenshots): a tinted browser
 * frame with an abstract UI skeleton, layered at different depths so the
 * 3D tilt reads as real parallax.
 */
function ProjectCover({ project, index }) {
  const [c1, c2] = project.hue;
  return (
    <div
      className="cover-art relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] border border-line bg-ink-2"
      style={{ "--c1": c1, "--c2": c2 }}
    >
      {/* Light pools in the project's hues */}
      <div className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-[radial-gradient(circle,var(--c1),transparent_65%)] opacity-40 blur-2xl" />
      <div className="absolute -bottom-1/3 -right-1/4 h-3/4 w-3/4 rounded-full bg-[radial-gradient(circle,var(--c2),transparent_65%)] opacity-40 blur-2xl" />
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* Giant index numeral */}
      <span className="text-outline absolute -bottom-[0.18em] right-4 font-display text-[clamp(8rem,11vw,10rem)] font-semibold leading-none">
        0{index + 1}
      </span>

      {/* Browser frame, lifted off the card plane */}
      <div className="absolute inset-x-[8%] top-[12%] bottom-[18%] [transform:translateZ(50px)]">
        <div className="glass flex h-full flex-col overflow-hidden !rounded-[var(--radius-md)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="label ml-3 truncate rounded-full bg-white/5 px-3 py-1 normal-case tracking-normal">{coverAddress(project)}</span>
          </div>
          <div className="grid flex-1 grid-cols-[28%_1fr] gap-3 p-4">
            <div className="flex flex-col gap-2">
              {[70, 90, 55, 80, 60].map((w, i) => (
                <span key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="h-[38%] rounded-lg bg-[linear-gradient(135deg,var(--c1),var(--c2))] opacity-70" />
              <div className="grid flex-1 grid-cols-3 gap-3">
                <span className="rounded-lg bg-white/[0.06]" />
                <span className="rounded-lg bg-white/[0.06]" />
                <span className="rounded-lg bg-white/[0.06]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating headline metric (or title chip), highest layer */}
      {project.metric ? (
        <div className="glass absolute bottom-[7%] left-[6%] max-w-[60%] !rounded-[var(--radius-md)] px-5 py-3 [transform:translateZ(90px)]">
          <span className="block font-display text-[clamp(1.75rem,2.2vw,2.25rem)] font-semibold leading-none tracking-[-0.04em] text-[color:var(--c1)]">
            {project.metric.value}
          </span>
          <span className="label mt-1 block normal-case tracking-normal text-fg">{project.metric.label}</span>
        </div>
      ) : (
        <span className="glass absolute bottom-[8%] left-[6%] !rounded-full px-4 py-2 font-display text-sm font-medium [transform:translateZ(90px)]">
          {project.title}
        </span>
      )}
    </div>
  );
}

/**
 * Projects: immersive case-study showcase.
 * Desktop (≥1024px wide, ≥700px tall): the track pins and scrolls sideways,
 * one full-height case study per panel, with a progress counter.
 * Smaller screens / reduced motion: a vertical stack with reveal animations.
 */
export default function Projects() {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const counter = useRef(null);

  useGSAP(
    () => {
      if (REDUCED_MOTION) return;
      const mm = gsap.matchMedia();

      mm.add(STAGE_QUERY, () => {
        const distance = () => track.current.scrollWidth - window.innerWidth;
        const scroller = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
              counter.current.textContent = String(i).padStart(2, "0");
            },
          },
        });
        gsap.to(".projects-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: pin.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Inside the moving track: covers drift slower than their copy (depth)
        gsap.utils.toArray(".project-panel").forEach((panel, i) => {
          gsap.fromTo(
            panel.querySelector(".cover-art"),
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroller, start: "left right", end: "right left", scrub: true },
            }
          );
          gsap.from(panel.querySelectorAll("[data-panel-item]"), {
            autoAlpha: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.9,
            ease: EASE.out,
            // The first panel is already on screen before the pin starts, so it uses a normal vertical trigger
            scrollTrigger:
              i === 0
                ? { trigger: panel, start: "top 75%" }
                : { trigger: panel, containerAnimation: scroller, start: "left 70%" },
          });
        });
      });

      mm.add(`not all and ${STAGE_QUERY}`, () => {
        gsap.utils.toArray(".project-panel").forEach((panel) => {
          gsap.from(panel.querySelector(".project-cover"), {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.2,
            ease: EASE.inOut,
            scrollTrigger: { trigger: panel, start: "top 85%" },
          });
          gsap.from(panel.querySelectorAll("[data-panel-item]"), {
            autoAlpha: 0,
            y: 40,
            stagger: 0.08,
            scrollTrigger: { trigger: panel, start: "top 70%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="projects" ref={root} className="relative pt-[var(--section-y)]" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading id="projects-title" index={3} eyebrow="Featured work" title="Showcase of" accent="projects.">
          From full-stack platforms to real-time computer vision and desktop apps, each built end to end.
        </SectionHeading>
      </div>

      {/* ---- Pinned stage ---- */}
      <div ref={pin} className="relative stage:flex stage:h-[100svh] stage:flex-col stage:justify-center stage:overflow-hidden">
        <div ref={track} className="flex flex-col gap-24 px-[var(--gutter)] py-20 stage:w-max stage:flex-row stage:gap-[6vw] stage:py-0">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="project-panel grid grid-cols-1 items-center gap-10 stage:w-[80vw] stage:max-w-[1400px] lg:grid-cols-12 lg:gap-12"
              aria-labelledby={`project-${i}`}
            >
              <a
                href={project.liveUrl || project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="View"
                tabIndex={-1}
                aria-hidden="true"
                className="project-cover block lg:col-span-7"
              >
                <TiltCard className="aspect-[4/3] stage:aspect-auto stage:h-[min(62vh,620px)]" max={7}>
                  <ProjectCover project={project} index={i} />
                </TiltCard>
              </a>

              <div className="lg:col-span-5">
                <p className="label mb-5" data-panel-item>
                  Case study <span className="text-accent">0{i + 1}</span> / 0{projects.length}
                </p>
                <h3 id={`project-${i}`} className="font-display text-[clamp(2.25rem,2.6vw,2.75rem)] font-semibold tracking-[-0.045em]" data-panel-item>
                  {breakCamel(project.title)}
                </h3>
                <p className="label mt-4 !text-accent" data-panel-item>
                  {project.subtitle}
                </p>
                <p className="mt-4 text-lg leading-snug text-muted" data-panel-item>
                  {project.desc}
                  {/* The metric is drawn on the (decorative) cover, so announce it here */}
                  {project.metric && <span className="sr-only"> {project.metric.value} {project.metric.label}.</span>}
                </p>

                {project.stack?.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack" data-panel-item>
                    {project.stack.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="hairline my-6" data-panel-item />
                <p className="label mb-4" data-panel-item>
                  Key features
                </p>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, j) => (
                    <li key={h} className="flex gap-4 text-muted" data-panel-item>
                      <span className="label pt-1 text-accent">{String(j + 1).padStart(2, "0")}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3" data-panel-item>
                  <Magnetic strength={0.25}>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn">
                      <FaGithub aria-hidden="true" /> View Code
                    </a>
                  </Magnetic>
                  {project.liveUrl && (
                    <Magnetic strength={0.25}>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
                        Live Demo <FaArrowRight aria-hidden="true" className="-rotate-45" />
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Progress HUD (pinned "stage" mode only) */}
        <div className="shell pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-6 stage:flex" aria-hidden="true">
          <span className="label tabular-nums text-fg">
            <span ref={counter}>01</span> / 0{projects.length}
          </span>
          <span className="relative h-px flex-1 bg-line">
            <span className="projects-progress absolute inset-0 origin-left scale-x-0 bg-accent" />
          </span>
          <span className="label">Scroll →</span>
        </div>
      </div>
    </section>
  );
}
