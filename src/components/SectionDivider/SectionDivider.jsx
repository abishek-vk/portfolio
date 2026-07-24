import { motion } from "framer-motion";

/**
 * Animated divider that plays between sections every time on scroll.
 * Uses the Rose / Coral sunset glowing line animation matching the Get in Touch section.
 */
export default function SectionDivider({ color = "rose" }) {
  const gradient = "linear-gradient(90deg, transparent, var(--accent-rose), var(--accent-coral), var(--accent-amber), transparent)";
  const dotColor = "var(--accent-rose)";
  const glowShadow = "0 0 20px rgba(244, 63, 94, 0.6), 0 0 40px rgba(244, 63, 94, 0.35)";

  return (
    <div className="relative py-6 overflow-hidden">
      {/* Main animated line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px mx-auto max-w-4xl origin-center"
        style={{ background: gradient }}
      />

      {/* Center glow dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
        style={{
          background: dotColor,
          boxShadow: glowShadow
        }}
      />

      {/* Expanding glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0, 1.5, 2.2], opacity: [0, 0.5, 0] }}
        viewport={{ once: false, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border"
        style={{ borderColor: dotColor }}
      />
    </div>
  );
}
