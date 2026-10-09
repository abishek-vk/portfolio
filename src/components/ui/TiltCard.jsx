import { useRef } from "react";
import { gsap, useGSAP, FINE_POINTER, REDUCED_MOTION } from "../../lib/motion";

/**
 * 3D tilt surface: rotates toward the pointer and moves a specular glare
 * (driven by the --gx / --gy CSS vars). Children with [data-depth] float
 * above the card plane for a layered parallax feel.
 */
export default function TiltCard({ children, className = "", max = 9 }) {
  const wrap = useRef(null);
  const card = useRef(null);

  useGSAP(
    () => {
      if (!FINE_POINTER || REDUCED_MOTION) return;
      const el = card.current;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });

      const move = (e) => {
        const r = wrap.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width; // 0 → 1
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * max * 2);
        rx(-(py - 0.5) * max * 2);
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };

      const w = wrap.current;
      w.addEventListener("pointermove", move);
      w.addEventListener("pointerleave", leave);
      return () => {
        w.removeEventListener("pointermove", move);
        w.removeEventListener("pointerleave", leave);
      };
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className={`[perspective:1200px] ${className}`}>
      <div
        ref={card}
        className="group/tilt relative h-full w-full [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        {/* Specular glare that follows the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.12), transparent 40%)",
          }}
        />
      </div>
    </div>
  );
}
