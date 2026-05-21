import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaArrowDown, FaLinkedin } from "react-icons/fa";
import abiImage from "../../assets/abi image.jpeg";

const TypingText = ({ texts, speed = 80 }) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < texts[textIndex].length) {
          setDisplayText(texts[textIndex].substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(texts[textIndex].substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return (
    <span className="gradient-text font-semibold">
      {displayText}
      <span className="inline-block w-1 h-6 bg-gradient-to-b from-[var(--accent-cyan)] to-[var(--accent-teal)] ml-1 animate-pulse" />
    </span>
  );
};

export default function Hero() {
  const roles = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Innovator"];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient opacity-40" />

      {/* Floating Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-teal)]/5 rounded-full blur-3xl blob opacity-40" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[var(--accent-purple)]/10 to-[var(--accent-cyan)]/5 rounded-full blur-3xl blob opacity-30" />

      <div className="container-max relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 text-4xl md:text-5xl lg:text-6xl">
              Hi, I'm <span className="gradient-text">Abishek V</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 h-auto md:h-10">
              <TypingText texts={roles} speed={80} />
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-[var(--text-secondary)] text-sm md:text-base lg:text-lg leading-relaxed mb-10 max-w-xl">
              Crafting elegant, scalable solutions through clean code and innovative design. Passionate about building exceptional digital experiences that make an impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 mb-12">
              <motion.a
                href="#projects"
                className="glow-button px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-white transition-all duration-300 group text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-[var(--text-primary)] border border-white/20 hover:border-[var(--accent-cyan)] hover:glow-text transition-all duration-300 text-sm md:text-base text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
              <span className="text-[var(--text-tertiary)] text-xs md:text-sm">Connect with me</span>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/abishek-vk"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-white/10 hover:glow-border hover:border-[var(--accent-cyan)] transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <FaGithub className="text-xl text-[var(--accent-cyan)]" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/vabishek13/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-white/10 hover:glow-border hover:border-[var(--accent-cyan)] transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <FaLinkedin className="text-xl text-[var(--accent-cyan)]" />
                </motion.a>
                <motion.a
                  href="mailto:abishekvenkatachalam2007@gmail.com"
                  className="p-3 rounded-full border border-white/10 hover:glow-border hover:border-[var(--accent-cyan)] transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <FaEnvelope className="text-xl text-[var(--accent-cyan)]" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:flex justify-center items-center lg:col-span-5">
            {/* Glowing Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div className="absolute w-80 h-80 border border-[var(--accent-cyan)]/30 rounded-full glow-pulse" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute w-96 h-96 border border-[var(--accent-teal)]/20 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
            </div>

            {/* Profile Card */}
            <motion.div
              className="rounded-3xl p-8 w-80 h-80 flex items-center justify-center relative z-10 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 overflow-hidden"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-center w-full h-full flex flex-col items-center justify-center">
                <img src={abiImage} alt="Abishek V" className="w-64 h-64 object-cover rounded-full mb-4 border-2 border-[var(--accent-cyan)]/30" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[var(--text-tertiary)] text-xs md:text-sm">Scroll to explore</span>
            <FaArrowDown className="text-[var(--accent-cyan)] animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}