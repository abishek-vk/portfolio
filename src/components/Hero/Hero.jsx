import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

const TypingText = ({ texts, speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < texts[textIndex].length) { setDisplayText(texts[textIndex].substring(0, charIndex + 1)); setCharIndex(charIndex + 1); }
        else { setTimeout(() => setIsDeleting(true), 2000); }
      } else {
        if (charIndex > 0) { setDisplayText(texts[textIndex].substring(0, charIndex - 1)); setCharIndex(charIndex - 1); }
        else { setIsDeleting(false); setTextIndex((prev) => (prev + 1) % texts.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed]);
  return <span className="gradient-text">{displayText}<span className="cursor"/></span>;
};

export default function Hero() {
  const roles = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "CSE Student"];
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-30"/>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <motion.p className="text-[var(--accent-primary)] font-semibold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Hi, I am</motion.p>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Abishek Venkat<span className="gradient-text"> Kumar</span></motion.h1>
          <motion.div className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 h-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}><TypingText texts={roles} speed={80}/></motion.div>
          <motion.p className="text-[var(--text-secondary)] text-lg max-w-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>Passionate about crafting innovative solutions through code. Specializing in building exceptional digital experiences.</motion.p>
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <motion.a href="#projects" className="px-8 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full font-semibold hover:shadow-lg hover:shadow-[var(--accent-primary)]/50 transition-all" whileHover={{ scale: 1.05 }}>View Projects</motion.a>
            <motion.button className="px-8 py-3 glass rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all" whileHover={{ scale: 1.05 }}><FaDownload/>Download Resume</motion.button>
          </motion.div>
          <motion.div className="flex gap-6 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>{[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (<motion.a key={i} href="#" className="text-2xl text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" whileHover={{ y: -5 }}><Icon/></motion.a>))}</motion.div>
        </motion.div>
        <motion.div className="hidden md:block" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <motion.div className="relative w-96 h-96 mx-auto" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] blur-3xl opacity-30"/>
            <div className="absolute inset-8 rounded-full bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-cyan)] blur-2xl opacity-40"/>
            <motion.div className="absolute inset-16 rounded-full bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] flex items-center justify-center glass" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}><span className="text-8xl">👨‍💻</span></motion.div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><div className="w-6 h-10 border-2 border-[var(--text-secondary)] rounded-full flex justify-center pt-2"><div className="w-1.5 h-3 bg-[var(--accent-primary)] rounded-full"/></div></motion.div>
    </section>
  );
}