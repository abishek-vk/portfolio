import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaArrowUp, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--glass-border)] bg-gradient-to-b from-transparent to-[var(--bg-secondary)]/30">
      <div className="container-max py-20 md:py-24 lg:py-28 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 mb-20 w-full">
          {/* Branding */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-6">Abishek V</h3>
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-xs">
              Full Stack Developer passionate about building beautiful, functional solutions that make an impact.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="font-bold text-lg mb-8 text-[var(--text-primary)]">Quick Links</h4>
            <div className="space-y-4">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <a key={link.name} href={link.href} className="block text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors text-base font-medium">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="font-bold text-lg mb-8 text-[var(--text-primary)]">Connect</h4>
            <div className="flex gap-5">
              <motion.a
                href="https://github.com/abishek-vk"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full text-[var(--accent-cyan)] border border-white/10 hover:border-[var(--accent-cyan)] hover:bg-white/10 transition-all"
                whileHover={{ y: -4, scale: 1.1 }}
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/vabishek13/"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full text-[var(--accent-cyan)] border border-white/10 hover:border-[var(--accent-cyan)] hover:bg-white/10 transition-all"
                whileHover={{ y: -4, scale: 1.1 }}
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
              <motion.a
                href="mailto:abishekvenkatachalam2007@gmail.com"
                className="p-4 rounded-full text-[var(--accent-cyan)] border border-white/10 hover:border-[var(--accent-cyan)] hover:bg-white/10 transition-all"
                whileHover={{ y: -4, scale: 1.1 }}
              >
                <FaEnvelope className="text-xl" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent mb-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-base text-[var(--text-tertiary)]">
            &copy; {year} Abishek V. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="p-4 rounded-full text-[var(--accent-cyan)] border border-white/10 hover:border-[var(--accent-cyan)] hover:bg-white/10 transition-all"
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/5 to-[var(--accent-teal)]/0 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}