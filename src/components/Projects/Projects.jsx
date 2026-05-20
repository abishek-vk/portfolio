import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  { title: "Nitron Browser", desc: "A modern web browser built with PyQt5 featuring tab management, bookmarks, and privacy controls.", tech: ["Python", "PyQt5", "WebEngine"], color: "from-blue-500 to-cyan-500" },
  { title: "Battle Turtle", desc: "An engaging arcade game developed with Pygame featuring multiple levels and scoring system.", tech: ["Python", "Pygame", "AI"], color: "from-green-500 to-emerald-500" },
  { title: "Fusion Tech", desc: "A comprehensive tech hub platform with resources, tutorials, and community features.", tech: ["React", "Node.js", "MongoDB"], color: "from-purple-500 to-pink-500" },
  { title: "RFID Door Lock", desc: "IoT-based smart door lock system with RFID authentication and mobile control.", tech: ["Arduino", "RFID", "IoT"], color: "from-orange-500 to-red-500" },
  { title: "ZenX Drone", desc: "Autonomous drone project with obstacle avoidance and flight path planning capabilities.", tech: ["Python", "OpenCV", "ROS"], color: "from-indigo-500 to-violet-500" }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">Featured <span className="gradient-text">Projects</span></motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="glass rounded-2xl overflow-hidden group cursor-pointer">
              <div className={`h-48 bg-gradient-to-br ${proj.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"/>
                <span className="text-6xl group-hover:scale-110 transition-transform">🚀</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((t, j) => (<span key={j} className="px-3 py-1 text-xs rounded-full bg-white/10">{t}</span>))}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"><FaGithub/> GitHub</a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"><FaExternalLinkAlt/> Demo</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}