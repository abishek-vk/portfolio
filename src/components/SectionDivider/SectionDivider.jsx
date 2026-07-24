import { motion } from "framer-motion";

/**
 * Animated divider that plays between sections on scroll.
 * Creates a glowing gradient line with expanding animation.
 */
export default function SectionDivider() {
  return (
    <div className="relative py-4 overflow-hidden">
      {/* Main animated line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px mx-auto max-w-3xl origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-teal), var(--accent-cyan), transparent)"
        }}
      />

      {/* Center glow dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          background: "var(--accent-cyan)",
          boxShadow: "0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.3)"
        }}
      />

      {/* Expanding glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0, 1.5, 2], opacity: [0, 0.4, 0] }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[var(--accent-cyan)]/40"
      />
    </div>
  );
}
