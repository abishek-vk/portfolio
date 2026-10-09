import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, REDUCED_MOTION } from "../../lib/motion";
import { skillGroups } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import SkillSphere from "./SkillSphere";

const allSkills = skillGroups.flatMap((g) => g.skills);

// Shorter sphere labels for long names (the full names stay in the list)
const SPHERE_LABELS = { "Role-Based Access Control": "RBAC", "Testing & Debugging": "Testing" };

/**
 * Skills: interactive instead of a list.
 *  - Left: a draggable 3D sphere of every skill.
 *  - Right: category index. Hovering / focusing / tapping a category
 *    lights up its skills on the sphere.
 *  - Below: an oversized marquee whose speed and direction follow scroll velocity.
 */
export default function Skills() {
  const root = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const active = skillGroups.find((g) => g.id === activeId)?.skills ?? null;

  useGSAP(
    () => {
      if (REDUCED_MOTION) return;

      // Endless marquee: base loop, timeScale nudged by scroll velocity
      const loop = gsap.to(".marquee-track", { xPercent: -50, ease: "none", duration: 30, repeat: -1 });
      let direction = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          direction = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
          gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
        },
      });
    },
    { scope: root }
  );

  return (
    <section id="skills" ref={root} className="section overflow-hidden !pb-[calc(var(--section-y)*0.5)]" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading id="skills-title" index={2} eyebrow="Technical stack" title="Skills &" accent="expertise.">
          A comprehensive toolkit of technologies and expertise for building modern, scalable applications.
        </SectionHeading>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:mt-8 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal="fade">
            <SkillSphere skills={allSkills} labels={SPHERE_LABELS} active={active} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label mb-6" data-reveal="fade">
              Select a category to light it up
            </p>
            <ul className="border-t border-line" data-reveal="stagger" onPointerLeave={() => setActiveId(null)}>
              {skillGroups.map((group, i) => {
                const on = activeId === group.id;
                return (
                  <li key={group.id} data-reveal-item className="border-b border-line">
                    <button
                      type="button"
                      aria-pressed={on}
                      onPointerEnter={() => setActiveId(group.id)}
                      onFocus={() => setActiveId(group.id)}
                      onBlur={() => setActiveId(null)}
                      onClick={() => setActiveId(on ? null : group.id)}
                      className="group w-full py-5 text-left"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="flex items-baseline gap-5">
                          <span className={`label transition-colors ${on ? "text-accent" : ""}`}>0{i + 1}</span>
                          <span
                            className={`font-display text-[clamp(1.5rem,1.8vw,1.875rem)] font-medium tracking-[-0.03em] transition-all duration-500 ease-[var(--ease-out-expo)] ${
                              on ? "translate-x-2 text-accent" : "text-fg"
                            }`}
                          >
                            {group.label}
                          </span>
                          {group.learning && (
                            <span className="label flex items-center gap-2 self-center">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
                              </span>
                              In progress
                            </span>
                          )}
                        </span>
                        <span className="label tabular-nums">{String(group.skills.length).padStart(2, "0")}</span>
                      </span>
                      <span className="mt-4 flex flex-wrap gap-2 pl-10">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`rounded-full border px-3 py-1 text-sm transition-colors duration-500 ${
                              group.learning ? "border-dashed" : ""
                            } ${on ? "border-accent/60 bg-accent/10 text-fg" : "border-line-strong text-muted"}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Velocity marquee (decorative; skills are listed above) ---- */}
      <div aria-hidden="true" className="mt-24 -rotate-2 border-y border-line bg-ink-2/60 py-6 md:mt-32">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {allSkills.map((skill, i) => (
                <span key={skill} className="flex items-center font-display text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]">
                  <span className={i % 2 ? "text-outline" : "text-fg"}>{skill}</span>
                  <span className="mx-8 text-[0.5em] text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
