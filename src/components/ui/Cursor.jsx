import { useRef } from "react";
import { gsap, useGSAP, FINE_POINTER, REDUCED_MOTION } from "../../lib/motion";

const INTERACTIVE = "a, button, [role='button'], label, input, textarea, [data-cursor]";

/**
 * Two-part cursor: a precise dot plus a trailing ring. The ring grows over
 * interactive elements and shows a text label for [data-cursor="Label"].
 * Only mounts for fine pointers without reduced-motion; touch users keep
 * the native behaviour.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);
  const enabled = FINE_POINTER && !REDUCED_MOTION;

  useGSAP(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });
    gsap.set([dot.current, ring.current], { autoAlpha: 0 });

    const move = (e) => {
      gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e) => {
      const target = e.target.closest(INTERACTIVE);
      const text = target?.dataset.cursor;
      ring.current.classList.toggle("is-hover", !!target && !text);
      ring.current.classList.toggle("is-label", !!text);
      label.current.textContent = text || "";
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.3 });
    };

    const hide = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  });

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
