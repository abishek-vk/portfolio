import SplitText from "./SplitText";

/**
 * Shared section header so every section opens with the same rhythm:
 *   (0N) — Eyebrow
 *   Big kinetic headline, accent on the last phrase
 *   Optional supporting copy
 */
export default function SectionHeading({ index, eyebrow, title, accent, children, className = "", id }) {
  return (
    <header className={className}>
      <p className="eyebrow mb-8" data-reveal="fade">
        <span className="text-accent">({String(index).padStart(2, "0")})</span> {eyebrow}
      </p>
      <h2 id={id} className="display max-w-[14ch]" data-reveal="chars">
        <SplitText text={title} />{" "}
        <SplitText text={accent} className="text-accent" />
      </h2>
      {children && (
        <p className="mt-8 max-w-xl text-[length:var(--step-lead)] leading-snug text-muted" data-reveal="up" data-delay="0.15">
          {children}
        </p>
      )}
    </header>
  );
}
