import { useEffect, useRef } from "react";
import { gsap, REDUCED_MOTION, FINE_POINTER } from "../../lib/motion";

/**
 * A rotating 3D "globe" of skill words built with plain DOM + transforms
 * (no WebGL needed). Words sit on a Fibonacci sphere; each frame we rotate
 * the points, then map depth to scale / opacity / z-index.
 *
 * - Idles with a slow spin; the pointer steers the spin direction & speed.
 * - Dragging (or swiping) flings it.
 * - `active` (array of skill names) highlights a category.
 * - `labels` optionally maps a skill name to a shorter display label.
 * - Decorative only: the category list beside it carries the real content.
 */
export default function SkillSphere({ skills, labels = {}, active }) {
  const wrap = useRef(null);
  const items = useRef([]);
  const activeRef = useRef(active);
  const drawRef = useRef(null);

  // Keep the latest highlight available to the render loop, and redraw
  // immediately so it also updates when the sphere isn't spinning.
  useEffect(() => {
    activeRef.current = active;
    drawRef.current?.();
  }, [active]);

  useEffect(() => {
    const el = wrap.current;
    const n = skills.length;

    // Fibonacci sphere: evenly spread points
    const pts = skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    let radius = 0;
    const measure = () => (radius = el.clientWidth * 0.4);
    measure();

    let ax = 0.3;
    let ay = 0;
    const vel = { x: 0.0012, y: 0.0035 };
    const target = { x: 0.0012, y: 0.0035 };
    let dragging = false;
    let last = null;

    const draw = () => {
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      const hl = activeRef.current;
      pts.forEach((p, i) => {
        // rotate around Y then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const node = items.current[i];
        if (!node) return;
        const on = !hl || hl.includes(skills[i]);
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${0.6 + depth * 0.6})`;
        node.style.opacity = on ? 0.25 + depth * 0.75 : 0.08 + depth * 0.12;
        node.style.zIndex = String(Math.round(depth * 100));
        node.dataset.on = hl && on ? "true" : "false";
      });
    };

    const tick = () => {
      if (!dragging) {
        vel.x += (target.x - vel.x) * 0.04;
        vel.y += (target.y - vel.y) * 0.04;
      }
      ax += vel.x;
      ay += vel.y;
      draw();
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      if (dragging && last) {
        vel.y = (e.clientX - last.x) * 0.004;
        vel.x = -(e.clientY - last.y) * 0.004;
        last = { x: e.clientX, y: e.clientY };
        return;
      }
      // Hover steering: spin toward where the pointer is
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      target.y = nx * 0.02;
      target.x = -ny * 0.02;
    };
    const onDown = (e) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture?.(e.pointerId);
    };
    const onUp = () => {
      dragging = false;
      last = null;
    };
    const onLeave = () => {
      target.x = 0.0012;
      target.y = 0.0035;
    };

    drawRef.current = draw;
    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(el);
    draw();

    if (REDUCED_MOTION) return () => ro.disconnect();

    // Only spin while on screen
    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) gsap.ticker.add(tick);
      if (!entry.isIntersecting && running) gsap.ticker.remove(tick);
      running = entry.isIntersecting;
    });
    io.observe(el);

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointermove", onMove);
    if (FINE_POINTER) el.addEventListener("pointerleave", onLeave);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [skills]);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      data-cursor="Drag"
      className="relative mx-auto aspect-square w-full max-w-[560px] touch-pan-y select-none"
    >
      {/* Orbital guides */}
      <div className="absolute inset-[14%] rounded-full border border-line" />
      <div className="absolute inset-[30%] rounded-full border border-dashed border-line" />
      <div className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgb(0_217_255/0.25),transparent_70%)] blur-2xl" />

      {skills.map((skill, i) => (
        <span
          key={skill}
          ref={(node) => (items.current[i] = node)}
          className="absolute left-1/2 top-1/2 whitespace-nowrap font-display text-[clamp(0.85rem,1.4vw,1.2rem)] font-medium tracking-[-0.02em] text-fg transition-[color,text-shadow] duration-500 will-change-transform data-[on=true]:text-accent data-[on=true]:[text-shadow:0_0_24px_rgb(0_217_255/0.6)]"
        >
          {labels[skill] ?? skill}
        </span>
      ))}
    </div>
  );
}
