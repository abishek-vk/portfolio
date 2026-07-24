import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool } from "react-icons/fa";
import {
  fadeUp, badgePop, slideLeft, scaleUp, staggerContainer,
  defaultViewport
} from "../../utils/animations";

const timeline = [
  {
    icon: FaSchool,
    title: "High School",
    org: "EKHN Higher Secondary School",
    period: "2010 - 2024",
    desc: "Developed analytical thinking, communication skills, teamwork, and problem-solving abilities through academics and extracurricular activities."
  },
  {
    icon: FaGraduationCap,
    title: "Bachelor of Technology",
    org: "Karunya University",
    period: "2024 - 2028",
    desc: "Pursuing a degree in Computer Science and Engineering with focus on software development, web technologies, and innovative project development."
  }
];

const timelineCardVariants = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

const timelineLineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function Experience() {
  return (
    <section id="experience" className="py-40 lg:py-48 relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 0.2 }}
        viewport={defaultViewport}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent-cyan)]/50 via-[var(--accent-teal)]/30 to-transparent origin-top"
      />
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2 }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl"
      />

      <div className="container-max relative z-10 w-full">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-32"
        >
          <motion.div variants={badgePop()} className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/5">
              Learning Path
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp(0.05)} className="mb-8">
            Education & <span className="gradient-text">Background</span>
          </motion.h2>
          <motion.p variants={fadeUp(0.1)} className="text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            My academic journey and continuous learning path in Computer Science and technology.
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={timelineCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="relative mb-20 last:mb-0 group"
            >
              {/* Timeline Node */}
              <div className="absolute -left-12 top-8 flex items-center justify-center">
                <motion.div
                  className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-teal)] flex items-center justify-center text-white border-4 border-[var(--bg-primary)] z-10 glow-pulse"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.2 }}
                >
                  <item.icon className="text-lg" />
                </motion.div>

                {/* Connecting Line to Next Item */}
                {i < timeline.length - 1 && (
                  <motion.div
                    variants={timelineLineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="absolute top-10 left-4 w-0.5 h-40 bg-gradient-to-b from-[var(--accent-cyan)]/50 to-transparent origin-top"
                  />
                )}
              </div>

              {/* Content Card */}
              <motion.div
                className="ml-12 rounded-2xl p-10 md:p-12 border border-white/10 group-hover:border-[var(--accent-cyan)] transition-all duration-300"
                whileHover={{ x: 8, transition: { duration: 0.25 } }}
              >
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.15 }}
                      className="text-[var(--accent-cyan)] font-bold text-lg"
                    >
                      {item.org}
                    </motion.p>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    className="px-5 py-3 rounded-lg text-xs font-bold bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 whitespace-nowrap"
                  >
                    {item.period}
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 + i * 0.15 }}
                  className="text-[var(--text-secondary)] leading-relaxed text-lg"
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}