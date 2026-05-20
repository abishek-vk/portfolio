import { motion } from "framer-motion";
import { FaCode, FaPalette, FaLightbulb, FaRocket } from "react-icons/fa";

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-40 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[var(--accent-purple)]/10 to-[var(--accent-cyan)]/5 rounded-full blur-3xl opacity-20" />
      
      <div className="container-max relative z-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left - Text Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide border border-[var(--accent-cyan)]/30">
                About Me
              </span>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-6">
              Crafting Digital <span className="gradient-text">Excellence</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6 mb-10">
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                I'm an aspiring Software Developer with a passion for web development and building modern, user-centric applications. With hands-on experience in React, TypeScript, Python, and UI/UX design principles, I focus on delivering responsive interfaces and seamless experiences.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                My journey spans building scalable backend systems to crafting intuitive frontend interfaces. I'm driven by solving complex problems through clean code, innovative thinking, and continuous learning.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} className="flex gap-8">
              <div>
                <p className="text-3xl font-bold gradient-text">5+</p>
                <p className="text-[var(--text-tertiary)] text-sm mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">3+</p>
                <p className="text-[var(--text-tertiary)] text-sm mt-1">Years Learning</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">15+</p>
                <p className="text-[var(--text-tertiary)] text-sm mt-1">Tech Skills</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Staggered Feature Cards */}
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40, y: i % 2 === 0 ? 0 : 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                className={`group relative ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
                
                <div className="rounded-2xl p-6 md:p-8 relative border border-white/10 group-hover:border-[var(--accent-cyan)] transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 group-hover:from-[var(--accent-cyan)]/30 group-hover:to-[var(--accent-teal)]/20 transition-all flex-shrink-0 group-hover:scale-110">
                      <feature.icon className="text-2xl text-[var(--accent-cyan)]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">{feature.title}</h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}