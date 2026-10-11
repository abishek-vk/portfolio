import { useRef } from "react";
import { SiJavascript, SiNodedotjs, SiOpencv, SiPython, SiReact, SiTensorflow } from "react-icons/si";
import { gsap, useGSAP, FINE_POINTER, REDUCED_MOTION } from "../../lib/motion";

/**
 * Hero avatar: a transparent Bitmoji PNG staged as a "3D" object.
 *
 *  - Tilts toward the pointer (perspective rotateX/Y) and floats up and down
 *  - Accent glow + rim light behind it, glowing platform with a floor shadow
 *    that shrinks as the avatar rises
 *  - Tech icons and dots drift around it with depth parallax: d > 1 sits in
 *    front of the avatar and moves more, d < 1 sits behind and moves less
 *
 * Intro / scroll-out are driven by Hero (targets .hero-avatar-stage and
 * .hero-avatar). Pointer effects need a fine pointer; all looping motion is
 * CSS and switched off under prefers-reduced-motion (see index.css).
 */
// Keep in sync with the <link rel="preload"> in index.html. The image is
// ~0.48:1 and fills the stage height, so its width tracks viewport height.
const AVATAR_SRCSET = "/images/avatar-200.webp 200w, /images/avatar-260.webp 260w, /images/avatar-360.webp 360w, /images/avatar-480.webp 480w, /images/avatar-668.webp 668w";
const AVATAR_SIZES = "(min-width: 1024px) 35vh, 12vh";

const ITEMS = [
  { Icon: SiReact, x: 12, y: 24, d: 1.3 },
  { Icon: SiPython, x: 84, y: 32, d: 0.8 },
  { Icon: SiOpencv, x: 8, y: 60, d: 0.6, desktop: true },
  { Icon: SiJavascript, x: 86, y: 64, d: 1.2, desktop: true },
  { Icon: SiNodedotjs, x: 24, y: 6, d: 0.5, desktop: true },
  { Icon: SiTensorflow, x: 82, y: 86, d: 1.0, desktop: true },
  { x: 32, y: 40, d: 0.4 },
  { x: 70, y: 48, d: 1.5 },
  { x: 18, y: 82, d: 0.9 },
  { x: 94, y: 46, d: 0.5, desktop: true },
  { x: 68, y: 20, d: 1.4, desktop: true },
  { x: 40, y: 74, d: 0.7, desktop: true },
];

function Floater({ item, i }) {
  const { Icon, x, y, d, desktop } = item;
  const size = Icon ? 26 + d * 14 : 3 + d * 3;
  const far = d < 0.7;
  return (
    <span
      data-depth={d}
      className={`absolute ${desktop ? "hidden lg:block" : "block"}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className="avatar-drift block"
        style={{
          "--dur": `${7 + (i % 4) * 1.6}s`,
          "--delay": `${-i * 1.3}s`,
          "--drift": `drift-${d >= 1 ? "near" : "far"}-${i % 2 ? "l" : "r"}`,
          opacity: far ? 0.5 : 0.9,
          filter: far ? "blur(1px)" : undefined,
        }}
      >
        {Icon ? (
          <span
            className="grid place-items-center rounded-xl border border-line-strong bg-ink-2/80 text-accent shadow-[0_0_24px_-6px_rgb(0_217_255/0.5)]"
            style={{ width: size, height: size, fontSize: size * 0.5 }}
          >
            <Icon />
          </span>
        ) : (
          <span
            className="block rounded-full bg-accent shadow-[0_0_10px_rgb(0_217_255/0.8)]"
            style={{ width: size, height: size }}
          />
        )}
      </span>
    </span>
  );
}

export default function HeroAvatar({ className = "" }) {
  const root = useRef(null);
  const tilt = useRef(null);

  useGSAP(
    () => {
      if (!FINE_POINTER || REDUCED_MOTION) return;
      const opts = { duration: 1.1, ease: "power3.out" };
      const rx = gsap.quickTo(tilt.current, "rotationX", opts);
      const ry = gsap.quickTo(tilt.current, "rotationY", opts);
      const layers = gsap.utils.toArray("[data-depth]", root.current).map((el) => ({
        d: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", opts),
        y: gsap.quickTo(el, "y", opts),
      }));

      const apply = (nx, ny) => {
        ry(nx * 12);
        rx(-ny * 8);
        for (const l of layers) {
          l.x(nx * l.d * 28);
          l.y(ny * l.d * 18);
        }
      };
      const move = (e) => {
        const r = root.current.getBoundingClientRect();
        const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2));
        const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2));
        apply(nx, ny);
      };
      const reset = () => apply(0, 0);

      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", reset);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", reset);
      };
    },
    { scope: root }
  );

  const behind = ITEMS.map((item, i) => [item, i]).filter(([item]) => item.d < 1);
  const front = ITEMS.map((item, i) => [item, i]).filter(([item]) => item.d >= 1);

  return (
    <div ref={root} aria-hidden="true" className={`hero-avatar pointer-events-none ${className}`}>
      <div className="hero-avatar-stage relative h-full w-full [container-type:size] [perspective:1400px]">
        {/* Accent glow behind the body */}
        <div className="absolute left-1/2 top-[45%] h-[85%] w-[62cqh] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_217_255/0.26),rgb(139_92_246/0.16)_55%,transparent)] blur-2xl" />

        {/* Platform: glow disc, ring, pulse, and a floor shadow synced with the float */}
        <div className="absolute bottom-[6%] left-1/2 h-[10cqh] w-[46cqh] -translate-x-1/2 translate-y-1/2">
          <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_217_255/0.28),rgb(139_92_246/0.12)_60%,transparent)]" />
          <div className="absolute inset-[8%] rounded-[50%] border border-accent/60 shadow-[0_0_24px_rgb(0_217_255/0.35),inset_0_0_18px_rgb(0_217_255/0.25)]" />
          <div className="avatar-pulse absolute inset-[8%] rounded-[50%] border border-accent/40" />
          <div className="avatar-shadow absolute left-1/2 top-1/2 h-[42%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.75),transparent)]" />
        </div>

        {behind.map(([item, i]) => (
          <Floater key={i} item={item} i={i} />
        ))}

        {/* Avatar: tilt (pointer) → float (CSS) → image with rim light */}
        <div
          ref={tilt}
          className="absolute inset-x-0 bottom-[6%] top-0 origin-[50%_90%] [transform-style:preserve-3d] will-change-transform"
        >
          <div className="avatar-float h-full will-change-transform">
            <img
              src="/images/avatar-668.webp"
              srcSet={AVATAR_SRCSET}
              sizes={AVATAR_SIZES}
              width="668"
              height="1404"
              alt=""
              draggable="false"
              decoding="async"
              fetchPriority="high"
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              className="avatar-rim h-full w-full select-none object-contain object-bottom"
            />
          </div>
        </div>

        {front.map(([item, i]) => (
          <Floater key={i} item={item} i={i} />
        ))}
      </div>
    </div>
  );
}
