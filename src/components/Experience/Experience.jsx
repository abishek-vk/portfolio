import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 }
  }
};

export default function Experience() {
  return (
    <section id="experience" className="py-40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent-cyan)]/50 via-[var(--accent-teal)]/30 to-transparent opacity-20" />
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4">
            <span className="inline-block px-3 py-1 glass rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide">
              Learning Path
            </span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-4">
            Education & <span className="gradient-text">Background</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[var(--text-secondary)] text-lg max-w-2xl">
            My academic journey and continuous learning path in Computer Science and technology.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-3xl"
        >
          {timeline.map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="relative mb-12 last:mb-0 group">
              {/* Timeline Node */}
              <div className="absolute -left-12 top-6 flex items-center justify-center">
                <motion.div
                  className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-teal)] flex items-center justify-center text-white border-4 border-[var(--bg-primary)] z-10 glow-pulse"
                  whileHover={{ scale: 1.2 }}
                >
                  <item.icon className="text-sm" />
                </motion.div>

                {/* Connecting Line to Next Item */}
                {i < timeline.length - 1 && (
                  <div className="absolute top-8 left-3.5 w-0.5 h-32 bg-gradient-to-b from-[var(--accent-cyan)]/50 to-transparent" />
                )}
              </div>

              {/* Content Card */}
              <div className="ml-12 glass rounded-2xl p-8 group-hover:border-[var(--accent-cyan)] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[var(--accent-cyan)] font-semibold text-base">{item.org}</p>
                  </div>
                  <span className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed text-base">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}