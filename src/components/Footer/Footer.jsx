import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaArrowUp, FaLinkedin } from "react-icons/fa";
import {
  fadeUp, scaleUp, staggerContainer,
  defaultViewport
} from "../../utils/animations";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/20 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]/50">
      <div className="container-max py-20 md:py-24 lg:py-28 w-full">
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 mb-20 w-full"
        >
          {/* Branding */}
          <motion.div variants={fadeUp()}>
            <h3 className="text-3xl md:text-4xl font-bold gradient-rose-text mb-6">Abishek V</h3>
            <p className="text-white text-base md:text-lg leading-relaxed max-w-xs font-medium">
              Full Stack Developer passionate about building beautiful, functional solutions that make an impact.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp(0.1)}>
            <h4 className="font-bold text-xl mb-8 text-white">Quick Links</h4>
            <div className="space-y-4">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
                { name: "Education", href: "#experience" },
                { name: "Contact", href: "#contact" }
              ].map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-white hover:text-[var(--accent-rose)] transition-colors text-base font-bold"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp(0.2)}>
            <h4 className="font-bold text-xl mb-8 text-white">Connect</h4>
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="flex gap-5"
            >
              {[
                { href: "https://github.com/abishek-vk", icon: FaGithub },
                { href: "https://www.linkedin.com/in/vabishek13/", icon: FaLinkedin },
                { href: "mailto:abishekvenkatachalam2007@gmail.com", icon: FaEnvelope }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : "_self"}
                  rel={social.href.startsWith("http") ? "noreferrer" : ""}
                  className="p-4 rounded-full text-[var(--accent-rose)] bg-[#13192b]/95 border border-white/20 hover:border-[var(--accent-rose)] hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                  variants={scaleUp(i * 0.08)}
                  whileHover={{ y: -4, scale: 1.1 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.4 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px bg-gradient-to-r from-transparent via-[var(--accent-rose)]/50 to-transparent mb-12 origin-center"
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-base text-white font-medium"
          >
            &copy; {year} Abishek V. All rights reserved.
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="p-4 rounded-full text-[var(--accent-rose)] bg-[#13192b]/95 border border-white/20 hover:border-[var(--accent-rose)] hover:bg-white/10 transition-all hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-rose)]/15 to-[var(--accent-coral)]/0 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}