import { motion } from "framer-motion";
import { FaCode, FaPalette, FaLightbulb, FaRocket } from "react-icons/fa";
import {
  fadeUp, badgePop, numberPop, cardReveal, staggerContainer, defaultViewport
} from "../../utils/animations";

const features = [
  {
    icon: FaCode,
    title: "Full Stack Development",
    desc: "Building scalable applications with modern tech stacks across frontend, backend, and database layers."
  },
  {
    icon: FaPalette,
    title: "UI/UX Design",
    desc: "Creating visually stunning, intuitive interfaces with attention to user experience and accessibility."
  },
  {
    icon: FaLightbulb,
    title: "Problem Solving",
    desc: "Tackling complex challenges with innovative solutions and clean, maintainable code architecture."
  },
  {
    icon: FaRocket,
    title: "Performance Driven",
    desc: "Optimizing applications for speed, efficiency, and delivering exceptional user experiences at scale."
  }
];

export default function About() {
  return (
    <section id="about" className="py-40 lg:py-48 relative overflow-hidden">
      {/* Decorative Rose & Coral Glow Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2 }}
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[var(--accent-rose)]/20 to-[var(--accent-coral)]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute -right-32 bottom-10 w-80 h-80 bg-gradient-to-br from-[var(--accent-amber)]/15 to-[var(--accent-rose)]/10 rounded-full blur-3xl"
      />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 lg:gap-20 items-start w-full">
          {/* Left - Text Content */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.div variants={badgePop()} className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-bold text-[var(--accent-rose)] uppercase tracking-widest border border-[var(--accent-rose)]/40 bg-[var(--accent-rose)]/15 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                About Me
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp(0.05)} className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Crafting Digital <span className="gradient-rose-text">Excellence</span>
            </motion.h2>

            <motion.div variants={fadeUp(0.1)} className="flex flex-col gap-6 md:gap-8 mb-16">
              <p className="text-white leading-relaxed text-base md:text-lg font-medium">
                I'm an aspiring Software Developer with a passion for web development and building modern, user-centric applications. With hands-on experience in React, TypeScript, Python, and UI/UX design principles, I focus on delivering responsive interfaces and seamless experiences.
              </p>
              <p className="text-white leading-relaxed text-base md:text-lg font-medium">
                My journey spans building scalable backend systems to crafting intuitive frontend interfaces. I'm driven by solving complex problems through clean code, innovative thinking, and continuous learning.
              </p>
            </motion.div>

            {/* Quick Stats with Rose Glow Card */}
            <motion.div
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="grid grid-cols-3 gap-6 sm:gap-8 w-full p-6 rounded-2xl bg-[#13192b]/95 border border-white/20 shadow-xl"
            >
              {[
                { num: "5+", label: "Projects Completed" },
                { num: "3+", label: "Years Learning" },
                { num: "15+", label: "Tech Skills" }
              ].map((stat, i) => (
                <motion.div key={i} variants={numberPop(i * 0.1)} className="text-center sm:text-left">
                  <p className="font-bold gradient-rose-text text-2xl md:text-3xl mb-1">{stat.num}</p>
                  <p className="text-white font-bold text-xs md:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Staggered Feature Cards with Rose Accents */}
          <motion.div
            variants={staggerContainer(0.12, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardReveal(i * 0.08)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-rose)]/30 to-[var(--accent-coral)]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md" />

                <div className="rounded-2xl p-8 md:p-10 relative bg-[#13192b]/95 backdrop-blur-md border border-white/20 group-hover:border-[var(--accent-rose)]/70 transition-all duration-300 h-full shadow-xl">
                  <div className="flex items-start gap-5">
                    <motion.div
                      className="p-4 rounded-xl bg-gradient-to-br from-[var(--accent-rose)]/30 to-[var(--accent-coral)]/20 group-hover:from-[var(--accent-rose)]/50 group-hover:to-[var(--accent-coral)]/35 transition-all flex-shrink-0 group-hover:scale-110"
                      whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                    >
                      <feature.icon className="text-3xl text-[var(--accent-rose)]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-3 text-white group-hover:text-[var(--accent-rose)] transition-colors">{feature.title}</h3>
                      <p className="text-white text-base md:text-lg leading-relaxed font-medium">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}