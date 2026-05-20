import { motion } from "framer-motion";
import { FaGraduationCap, FaHeart, FaRocket } from "react-icons/fa";

const infoCards = [
  { icon: FaGraduationCap, title: "Education", desc: "B.Tech in Computer Science Engineering, passionate about technology and innovation." },
  { icon: FaHeart, title: "Interests", desc: "Software Development, UI/UX Design, Cybersecurity, AI/ML, Open Source Contributions." },
  { icon: FaRocket, title: "Goals", desc: "Building impactful products, contributing to tech communities, continuous learning." }
];

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">About <span className="gradient-text">Me</span></motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="w-72 h-72 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-[var(--bg-secondary)] flex items-center justify-center"><span className="text-9xl">👤</span></div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50"/>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-40"/>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">I am a dedicated Computer Science Engineering student with a strong passion for software development and creating innovative solutions. My journey in tech has led me to explore various domains including web development, UI/UX design, and emerging technologies.</p>
            <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">I believe in the power of technology to transform ideas into reality. Whether it is building scalable applications, crafting intuitive user interfaces, or solving complex problems through clean code, I approach every challenge with enthusiasm and determination.</p>
            <div className="grid gap-4">
              {infoCards.map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 flex items-start gap-4 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:scale-110 transition-transform"><card.icon className="text-2xl"/></div>
                  <div><h3 className="font-semibold text-lg mb-1">{card.title}</h3><p className="text-[var(--text-secondary)] text-sm">{card.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}