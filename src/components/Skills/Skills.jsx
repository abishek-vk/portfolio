import { motion } from "framer-motion";
import {
  fadeUp, badgePop, staggerContainer, staggerItem,
  defaultViewport
} from "../../utils/animations";

const skillCategories = [
  {
    column: "Professional",
    skills: ["Python", "React", "TypeScript", "Docker", "MongoDB"]
  },
  {
    column: "Professional",
    skills: ["PostgreSQL", "Git", "C", "Java", "Testing & Debugging"]
  }
];

export default function Skills() {
  const columnVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="skills" className="py-40 lg:py-48 relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2 }}
        className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl"
      />

      <div className="container-max relative z-10 w-full">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-32"
        >
          <motion.div variants={badgePop()} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-widest border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/5">
              Technical Stack
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp(0.05)} className="mb-8">
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p variants={fadeUp(0.1)} className="text-[var(--text-secondary)] leading-relaxed max-w-4xl">
            A comprehensive toolkit of technologies and expertise for building modern, scalable applications.
          </motion.p>
        </motion.div>

        {/* Skills Layout */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-3xl mx-auto w-full"
        >
          {/* Professional Column 1 */}
          <motion.div
            variants={columnVariants}
            className="space-y-10"
          >
            <div className="space-y-7">
              {skillCategories[0].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 group cursor-default"
                >
                  <motion.span
                    className="text-[var(--accent-cyan)] font-bold text-xl"
                    whileHover={{ scale: 1.4, rotate: 90, transition: { duration: 0.3 } }}
                  >
                    •
                  </motion.span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-200 text-lg md:text-xl">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Column 2 */}
          <motion.div
            variants={columnVariants}
            className="space-y-10"
          >
            <div className="space-y-7">
              {skillCategories[1].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 group cursor-default"
                >
                  <motion.span
                    className="text-[var(--accent-cyan)] font-bold text-xl"
                    whileHover={{ scale: 1.4, rotate: 90, transition: { duration: 0.3 } }}
                  >
                    •
                  </motion.span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-200 text-lg md:text-xl">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}