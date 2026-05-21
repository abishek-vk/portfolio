import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "CodingLabPlatform",
    liveUrl: "https://codelab.612151820.xyz/",
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
    liveUrl: "https://bloodflow-hub.onrender.com/",
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
    liveUrl: "#",
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
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute -left-32 top-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-cyan)]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide border border-[var(--accent-cyan)]/30">
              Featured Work
            </span>
          </motion.div>
          
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-6 text-5xl md:text-6xl font-bold">
            Showcase of <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl leading-relaxed">
            Full-stack projects demonstrating expertise in building scalable, user-focused applications with modern architecture.
          </motion.p>
        </motion.div>

        {/* Projects Grid - 2 Columns with Extra Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="h-full flex flex-col">

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 group-hover:gradient-text transition-all leading-tight">{project.title}</h3>
                
                {/* Description */}
                <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 md:mb-10 lg:mb-12">
                  {project.desc}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-8 md:mb-10 lg:mb-12" />

                {/* Highlights as List */}
                <div className="mb-10 md:mb-12 lg:mb-14 space-y-4 md:space-y-5 lg:space-y-6 flex-grow">
                  <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">Key Features</p>
                  {project.highlights.map((highlight, j) => (
                    <motion.div 
                      key={j} 
                      className="flex gap-4 items-start group/feature"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent-cyan)]/30 to-[var(--accent-teal)]/20 mt-0.5">
                        <svg className="w-3 h-3 text-[var(--accent-cyan)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[var(--text-secondary)] text-xs md:text-sm leading-relaxed group-hover/feature:text-white/90 transition-colors">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mb-8 md:mb-10 lg:mb-12 mt-auto" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                  <motion.a
                    href="https://github.com/abishek-vk"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)] hover:from-[var(--accent-cyan)]/30 hover:to-[var(--accent-teal)]/20 transition-all font-medium text-sm md:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-base" /> View Code
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border border-white/10 text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:bg-white/5 transition-all font-medium text-sm md:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="text-base" /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}