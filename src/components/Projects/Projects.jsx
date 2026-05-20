import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "CodingPlatform",
    desc: "Full-stack institutional coding and assessment platform with role-based access and advanced features.",
    highlights: [
      "Role-based system for students, teachers, coordinators, and admins",
      "Coding labs, quizzes, and automated assessment management",
      "Secure authentication with containerized microservices",
      "Real-time notifications and comprehensive analytics"
    ],
    gradient: "from-cyan-500/20 to-blue-500/10",
    borderColor: "from-cyan-400 to-blue-400"
  },
  {
    title: "Bloodflowhub",
    desc: "Comprehensive blood bank and donor management platform for streamlined operations.",
    highlights: [
      "Real-time blood request processing and inventory tracking",
      "Automated alert systems for urgent requests",
      "Modular backend services with responsive frontend",
      "Efficient donor-patient matching algorithm"
    ],
    gradient: "from-red-500/20 to-pink-500/10",
    borderColor: "from-red-400 to-pink-400"
  },
  {
    title: "AutoML",
    desc: "Automated machine learning platform for model selection and hyperparameter optimization.",
    highlights: [
      "Intelligent model selection with performance ranking",
      "Resource-aware hyperparameter tuning",
      "Interactive dashboards with leaderboard generation",
      "Automated report generation and insights"
    ],
    gradient: "from-purple-500/20 to-indigo-500/10",
    borderColor: "from-purple-400 to-indigo-400"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function Projects() {
  return (
    <section id="projects" className="py-40 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute -left-32 top-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-cyan)]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-4">
            <span className="inline-block px-3 py-1 glass rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide">
              Featured Work
            </span>
          </motion.div>
          
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-4">
            Showcase of <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[var(--text-secondary)] text-lg max-w-2xl">
            Full-stack projects demonstrating expertise in building scalable, user-focused applications with modern architecture.
          </motion.p>
        </motion.div>

        {/* Horizontal Projects - Alternating Layout */}
        <div className="space-y-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'md:auto-cols-reverse' : ''}`}>
                {/* Content - Alternates position */}
                <motion.div className={`${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 text-[var(--accent-cyan)] uppercase tracking-wide">
                      Project {i + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 group-hover:gradient-text transition-all">{project.title}</h3>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  {/* Highlights as List */}
                  <div className="mb-8 space-y-3">
                    <p className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Key Features</p>
                    {project.highlights.map((highlight, j) => (
                      <motion.div key={j} className="flex gap-3 items-start" whileHover={{ x: 4 }}>
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent-cyan)]/30 to-[var(--accent-teal)]/20">
                          <span className="text-xs text-[var(--accent-cyan)]">✓</span>
                        </div>
                        <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href="https://github.com/abishek-vk"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] hover:from-[var(--accent-cyan)]/30 hover:to-[var(--accent-teal)]/20 transition-all font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaGithub /> View Code
                    </motion.a>
                    <motion.a
                      href="#"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] transition-all font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </motion.a>
                  </div>
                </motion.div>

                {/* Visual Card */}
                <motion.div
                  className={`relative group/card h-96 md:h-full min-h-96 ${i % 2 === 1 ? 'md:order-1' : ''}`}
                  whileHover={{ y: -8 }}
                >
                  {/* Glowing Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r rounded-3xl opacity-0 group/card-hover:opacity-100 transition-all duration-300 blur" style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0, 217, 255, 0.4), rgba(6, 182, 212, 0.2))`
                  }} />

                  {/* Main Card */}
                  <div className={`glass rounded-3xl p-8 h-full bg-gradient-to-br ${project.gradient} backdrop-blur-xl border border-[var(--glass-border)] group/card-hover:border-[var(--accent-cyan)] relative transition-all duration-300 flex flex-col`}>
                    {/* Top Gradient Border */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.borderColor} rounded-t-3xl opacity-0 group/card-hover:opacity-100 transition-all duration-300`} />

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)]/30 to-[var(--accent-teal)]/20 group/card-hover:from-[var(--accent-cyan)]/50 group/card-hover:to-[var(--accent-teal)]/30 transition-all group/card-hover:scale-110">
                        <span className="text-4xl">
                          {i === 0 ? '💻' : i === 1 ? '🩸' : '🤖'}
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack Preview */}
                    <div className="mt-auto">
                      <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'MongoDB'].map((tech, j) => (
                          <span key={j} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-[var(--glass-border)] text-[var(--text-secondary)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}