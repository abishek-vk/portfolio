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
      {/* Decorative Rose & Coral Glow Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2 }}
        className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-rose)]/20 to-[var(--accent-coral)]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-[var(--accent-amber)]/20 to-[var(--accent-rose)]/10 rounded-full blur-3xl"
      />

      <div className="container-max relative z-10 w-full">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-32 text-center max-w-3xl mx-auto"
        >
          <motion.div variants={badgePop()} className="mb-6 inline-block">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold text-[var(--accent-rose)] uppercase tracking-widest border border-[var(--accent-rose)]/40 bg-[var(--accent-rose)]/15 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
              Technical Stack
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp(0.05)} className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Skills & <span className="gradient-rose-text">Expertise</span>
          </motion.h2>
          <motion.p variants={fadeUp(0.1)} className="text-white leading-relaxed text-base md:text-lg font-medium">
            A comprehensive toolkit of technologies and expertise for building modern, scalable applications.
          </motion.p>
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto w-full"
        >
          {/* Professional Column 1 */}
          <motion.div
            variants={columnVariants}
            className="p-8 md:p-10 rounded-3xl bg-[#13192b]/95 backdrop-blur-md border border-white/20 hover:border-[var(--accent-rose)]/60 transition-all duration-300 shadow-xl group"
          >
            <div className="flex flex-col gap-6">
              {skillCategories[0].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  viewport={{ once: false }}
                  className="flex items-center gap-5 cursor-default p-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-[var(--accent-rose)]/20 hover:border-[var(--accent-rose)]/50 transition-all"
                >
                  <motion.span
                    className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-coral)] shadow-[0_0_12px_rgba(244,63,94,0.7)]"
                    whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                  />
                  <span className="text-white font-bold text-lg md:text-xl">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Column 2 */}
          <motion.div
            variants={columnVariants}
            className="p-8 md:p-10 rounded-3xl bg-[#13192b]/95 backdrop-blur-md border border-white/20 hover:border-[var(--accent-rose)]/60 transition-all duration-300 shadow-xl group"
          >
            <div className="flex flex-col gap-6">
              {skillCategories[1].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  viewport={{ once: false }}
                  className="flex items-center gap-5 cursor-default p-3.5 rounded-xl bg-white/10 border border-white/20 hover:bg-[var(--accent-rose)]/20 hover:border-[var(--accent-rose)]/50 transition-all"
                >
                  <motion.span
                    className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-amber)] shadow-[0_0_12px_rgba(251,113,133,0.7)]"
                    whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                  />
                  <span className="text-white font-bold text-lg md:text-xl">
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