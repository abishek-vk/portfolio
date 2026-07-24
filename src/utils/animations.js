/**
 * Shared animation variants for consistent scroll-triggered animations.
 * Used across all section components via framer-motion.
 */

// ── Section wrapper: fades in the entire section container ──
export const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

// ── Stagger container for groups of children ──
export const staggerContainer = (staggerDelay = 0.1, childDelay = 0.15) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childDelay
    }
  }
});

// ── Fade up (default for most elements) ──
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Fade down ──
export const fadeDown = (delay = 0) => ({
  hidden: { opacity: 0, y: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Slide in from left ──
export const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Slide in from right ──
export const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Scale up (for cards, images, icons) ──
export const scaleUp = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Badge / tag pill animation ──
export const badgePop = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.34, 1.56, 0.64, 1] // overshoot spring
    }
  }
});

// ── Staggered list item (used with custom index) ──
export const staggerItem = {
  hidden: { opacity: 0, x: -20, filter: "blur(2px)" },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// ── Card variant with lift ──
export const cardReveal = (delay = 0) => ({
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Divider / line draw animation ──
export const drawLine = (delay = 0) => ({
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
});

// ── Counter / stat number pop ──
export const numberPop = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
});

// ── Shared viewport config ──
export const defaultViewport = { once: true, margin: "0px 0px -80px 0px" };
export const earlyViewport = { once: true, margin: "0px 0px -150px 0px" };
