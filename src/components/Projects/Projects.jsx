import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  fadeUp, badgePop, cardReveal, staggerContainer, drawLine,
  defaultViewport
} from "../../utils/animations";

const projects = [
  {
    title: "CodingLabPlatform",
    githubUrl: "https://github.com/jebarson-caleb/CodingLabPlatform",
    liveUrl: "https://codelab.612151820.xyz/",
    desc: "Full-stack institutional coding and assessment platform with role-based access and advanced features.",
    highlights: [
      "Role-based system for students, teachers, coordinators, and admins",
      "Coding labs, quizzes, and automated assessment management",
      "Secure authentication with containerized microservices",
      "Real-time notifications and comprehensive analytics"
    ]
  },
  {
    title: "Bloodflowhub",
    githubUrl: "https://github.com/geeve-b/Bloodflow-Hub",
    liveUrl: "https://bloodflow-hub.onrender.com/",
    desc: "Comprehensive blood bank and donor management platform for streamlined operations.",
    highlights: [
      "Real-time blood request processing and inventory tracking",
      "Automated alert systems for urgent requests",
      "Modular backend services with responsive frontend",
      "Efficient donor-patient matching algorithm"
    ]
  },
  {
    title: "AutoML",
    githubUrl: "https://github.com/ReginSamRobinson/AutoML",
    liveUrl: "#",
    desc: "Automated machine learning platform for model selection and hyperparameter optimization.",
    highlights: [
      "Intelligent model selection with performance ranking",
      "Resource-aware hyperparameter tuning",
      "Interactive dashboards with leaderboard generation",
      "Automated report generation and insights"
    ]
  }
];

const featureItemVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(2px)" },
  visible: (j) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: j * 0.06,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export default function Projects() {
  return (
    <section id="projects" className="py-40 lg:py-48 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2 }}
        className="absolute -left-32 top-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-rose)]/20 to-[var(--accent-coral)]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-amber)]/20 to-[var(--accent-rose)]/10 rounded-full blur-3xl"
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
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold text-[var(--accent-rose)] uppercase tracking-widest border border-[var(--accent-rose)]/40 bg-[var(--accent-rose)]/15 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
              Featured Work
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp(0.05)} className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Showcase of <span className="gradient-rose-text">Projects</span>
          </motion.h2>
          <motion.p variants={fadeUp(0.1)} className="text-white leading-relaxed max-w-3xl text-base md:text-lg font-medium">
            Full-stack projects demonstrating expertise in building scalable, user-focused applications with modern architecture.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardReveal(i * 0.1)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group flex flex-col relative"
            >
              <div className="h-full flex flex-col">
                {/* Title */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-[var(--accent-rose)] transition-colors leading-tight"
                >
                  {project.title}
                </motion.h3>

                {/* Description */}
                <p className="text-white text-base md:text-lg leading-relaxed mb-8 font-medium">
                  {project.desc}
                </p>

                {/* Divider */}
                <motion.div
                  variants={drawLine(0.1 + i * 0.05)}
                  className="h-px bg-gradient-to-r from-white/25 via-[var(--accent-rose)]/50 to-transparent mb-8 origin-left"
                />

                {/* Highlights as List */}
                <div className="mb-8 flex flex-col gap-4 flex-grow">
                  <p className="text-xs font-bold text-[var(--accent-rose)] uppercase tracking-widest">Key Features</p>
                  {project.highlights.map((highlight, j) => (
                    <motion.div
                      key={j}
                      custom={j}
                      variants={featureItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      className="flex gap-3.5 items-start group/feature"
                    >
                      <motion.div
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent-rose)]/40 to-[var(--accent-coral)]/30 mt-1 border border-[var(--accent-rose)]/50"
                        whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                      >
                        <svg className="w-3 h-3 text-[var(--accent-rose)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <span className="text-white text-sm md:text-base leading-relaxed font-medium group-hover/feature:text-white transition-colors">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <motion.div
                  variants={drawLine(0.2 + i * 0.05)}
                  className="h-px bg-gradient-to-r from-white/20 to-transparent mb-6 mt-auto origin-left"
                />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent-rose)]/25 to-[var(--accent-coral)]/15 border border-[var(--accent-rose)]/50 text-[var(--accent-rose)] hover:border-[var(--accent-rose)] hover:from-[var(--accent-rose)]/35 hover:to-[var(--accent-coral)]/25 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all font-bold text-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-lg" /> View Code
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/25 bg-white/10 text-white hover:border-[var(--accent-rose)] hover:bg-white/20 transition-all font-bold text-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="text-lg" /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
