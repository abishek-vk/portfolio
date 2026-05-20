import { motion } from "framer-motion";

const skillCategories = [
  {
    column: "Professional",
    skills: ["Python", "React", "TypeScript", "Docker", "MongoDB"]
  },
  {
    column: "Professional",
    skills: ["PostgreSQL", "Git", "C", "Java", "Testing & Debugging"]
  },
  {
    column: "Personal",
    skills: ["Leadership & Teamwork", "Communication Skills", "Time Management", "Problem-Solving"]
  }
];

// Render Icon Component
// const IconRenderer = ({ IconComponent, className }) => <IconComponent className={className} />;

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      x: 8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="skills" className="py-40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide border border-[var(--accent-cyan)]/30">
              Technical Stack
            </span>
          </motion.div>
          
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[var(--text-secondary)] text-lg max-w-2xl">
            A comprehensive toolkit of technologies and expertise for building modern, scalable applications.
          </motion.p>
        </motion.div>

        {/* Clean 3-Column Skills Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Professional Column 1 */}
          <motion.div
            variants={columnVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
              <h3 className="font-bold text-lg text-white">Professional</h3>
            </div>
            <div className="space-y-3">
              {skillCategories[0].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={skillVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <span className="text-[var(--accent-cyan)] font-bold">•</span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-200">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Column 2 */}
          <motion.div
            variants={columnVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
              <h3 className="font-bold text-lg text-white">Professional</h3>
            </div>
            <div className="space-y-3">
              {skillCategories[1].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={skillVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <span className="text-[var(--accent-cyan)] font-bold">•</span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-200">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Column */}
          <motion.div
            variants={columnVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
              <h3 className="font-bold text-lg text-white">Personal</h3>
            </div>
            <div className="space-y-3">
              {skillCategories[2].skills.map((skill, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={skillVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <span className="text-[var(--accent-cyan)] font-bold">•</span>
                  <span className="text-white/80 group-hover:text-white transition-colors duration-200">
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