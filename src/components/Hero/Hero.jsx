import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaArrowDown, FaLinkedin } from "react-icons/fa";
import abiImage from "../../assets/abi image.jpeg";
import { fadeUp, slideLeft, scaleUp, badgePop, staggerContainer, defaultViewport } from "../../utils/animations";

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
    <span className="gradient-rose-text font-bold">
      {displayText}
      <span className="inline-block w-1 h-6 bg-gradient-to-b from-[var(--accent-rose)] to-[var(--accent-coral)] ml-1 animate-pulse" />
    </span>
  );
};

export default function Hero() {
  const roles = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Innovator"];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-40 pb-32">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient opacity-30" />

      {/* Floating Blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[var(--accent-rose)]/25 to-[var(--accent-coral)]/15 rounded-full blur-3xl blob"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[var(--accent-amber)]/25 to-[var(--accent-rose)]/15 rounded-full blur-3xl blob"
      />

      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="container-max relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            variants={slideLeft()}
            className="lg:col-span-7 w-full flex flex-col"
          >
            {/* Heading & Role Text Group */}
            <div className="flex flex-col gap-6">
              <motion.h1
                variants={fadeUp(0.1)}
                className="leading-tight text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              >
                Hi, I'm <span className="gradient-rose-text">Abishek V</span>
              </motion.h1>

              <motion.div
                variants={fadeUp(0.2)}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white"
              >
                <TypingText texts={roles} speed={80} />
              </motion.div>
            </div>

            {/* Description Paragraph Block */}
            <motion.p
              variants={fadeUp(0.3)}
              className="text-white leading-relaxed mt-12 max-w-xl text-base md:text-lg font-medium drop-shadow-sm"
            >
              Crafting elegant, scalable solutions through clean code and innovative design. Passionate about building exceptional digital experiences that make an impact.
            </motion.p>

            {/* Social Icons Group */}
            <motion.div
              variants={fadeUp(0.45)}
              className="flex flex-col gap-3 mt-20"
            >
              <span className="text-white text-base md:text-lg font-bold">Connect with me</span>
              <motion.div
                variants={staggerContainer(0.1, 0)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="flex gap-6"
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
                    className="p-3.5 rounded-full bg-white/10 border border-white/20 hover:border-[var(--accent-rose)] hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-300"
                    variants={badgePop(0.5 + i * 0.1)}
                    whileHover={{ y: -4, scale: 1.1 }}
                  >
                    <social.icon className="text-2xl text-[var(--accent-rose)]" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            variants={scaleUp(0.3)}
            className="relative hidden lg:flex justify-center items-center lg:col-span-5"
          >
            {/* Glowing Sunset Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute w-80 h-80 border-2 border-[var(--accent-rose)]/60 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.5)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-96 h-96 border-2 border-[var(--accent-coral)]/40 rounded-full shadow-[0_0_40px_rgba(251,113,133,0.3)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Profile Card */}
            <motion.div
              className="rounded-3xl p-8 w-80 h-80 flex items-center justify-center relative z-10 border border-white/20 bg-[#13192b]/90 backdrop-blur-md shadow-2xl overflow-hidden"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-center w-full h-full flex flex-col items-center justify-center">
                <img src={abiImage} alt="Abishek V" className="w-64 h-64 object-cover rounded-full mb-4 border-2 border-[var(--accent-rose)]/70 shadow-[0_0_30px_rgba(244,63,94,0.5)]" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: [0, 10, 0] }}
          viewport={{ once: false }}
          transition={{ opacity: { delay: 0.8, duration: 0.6 }, y: { delay: 0.8, duration: 2, repeat: Infinity } }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-xs md:text-sm font-semibold">Scroll to explore</span>
            <FaArrowDown className="text-[var(--accent-rose)] animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}