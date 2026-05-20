import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools, FaUsers } from "react-icons/fa";

const skillCategories = [
  {
    icon: FaCode,
    title: "Frontend",
    color: "from-cyan-500/20 to-blue-500/10",
    accentColor: "cyan",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS", "Framer Motion"]
  },
  {
    icon: FaServer,
    title: "Backend",
    color: "from-purple-500/20 to-pink-500/10",
    accentColor: "purple",
    skills: ["Node.js", "Python", "Express", "REST APIs", "Authentication", "Microservices"]
  },
  {
    icon: FaDatabase,
    title: "Database",
    color: "from-green-500/20 to-emerald-500/10",
    accentColor: "green",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "SQL", "NoSQL"]
  },
  {
    icon: FaTools,
    title: "Tools",
    color: "from-orange-500/20 to-red-500/10",
    accentColor: "orange",
    skills: ["Git", "Docker", "VS Code", "Figma", "Postman", "Linux"]
  },
  {
    icon: FaUsers,
    title: "Soft Skills",
    color: "from-indigo-500/20 to-violet-500/10",
    accentColor: "indigo",
    skills: ["Leadership", "Communication", "Problem-Solving", "Teamwork", "Adaptability", "Time Management"]
  }
];

// Render Icon Component
const IconRenderer = ({ IconComponent, className }) => <IconComponent className={className} />;

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4">
            <span className="inline-block px-3 py-1 glass rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide">
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

        {/* Responsive Grid Layout - Compact with Auto Heights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className={`glass rounded-2xl p-6 bg-gradient-to-br ${category.color} backdrop-blur-xl border border-[var(--glass-border)] hover:border-[var(--accent-cyan)] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,217,255,0.2)]`}>
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/15 group-hover:to-white/10 transition-all group-hover:scale-110">
                    <IconRenderer IconComponent={category.icon} className="text-lg text-[var(--accent-cyan)]" />
                  </div>
                  <h3 className="font-bold text-lg leading-none">{category.title}</h3>
                </div>

                {/* Skills Pills Container */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      whileHover={{ scale: 1.08, y: -1 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/8 border border-white/12 text-white/85 hover:bg-white/12 hover:border-white/25 hover:text-white transition-all duration-300 backdrop-blur-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}