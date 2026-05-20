import { motion } from "framer-motion";
import { FaCode, FaServer, FaCogs, FaToolbox } from "react-icons/fa";

const skillCategories = [
  { icon: FaCode, title: "Frontend", skills: [{ name: "React", level: 85 }, { name: "JavaScript", level: 90 }, { name: "Tailwind CSS", level: 88 }, { name: "HTML/CSS", level: 92 }] },
  { icon: FaServer, title: "Backend", skills: [{ name: "Node.js", level: 75 }, { name: "MongoDB", level: 70 }, { name: "Python", level: 80 }, { name: "Express", level: 72 }] },
  { icon: FaCogs, title: "Languages", skills: [{ name: "Python", level: 88 }, { name: "JavaScript", level: 90 }, { name: "C++", level: 75 }, { name: "Java", level: 68 }] },
  { icon: FaToolbox, title: "Tools", skills: [{ name: "Git", level: 92 }, { name: "VS Code", level: 95 }, { name: "Figma", level: 78 }, { name: "PyQt5", level: 65 }] }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">My <span className="gradient-text">Skills</span></motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-6"><div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:scale-110 transition-transform"><cat.icon className="text-2xl"/></div><h3 className="text-xl font-bold">{cat.title}</h3></div>
              <div className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-1"><span className="text-sm font-medium">{skill.name}</span><span className="text-sm text-[var(--accent-primary)]">{skill.level}%</span></div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" initial={{ width: "0%" }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + j * 0.1 }}/></div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}