import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward, FaCertificate } from "react-icons/fa";

const timeline = [
  { icon: FaGraduationCap, title: "B.Tech Computer Science", org: "Anna University", period: "2023 - Present", type: "education", desc: "Pursuing degree with focus on Software Engineering, Data Structures, and Algorithms." },
  { icon: FaBriefcase, title: "Web Development Intern", org: "Tech Startup", period: "Summer 2024", type: "work", desc: "Built responsive web applications using React and contributed to frontend architecture." },
  { icon: FaCertificate, title: "AWS Cloud Practitioner", org: "Amazon Web Services", period: "2024", type: "certification", desc: "Certified in cloud computing fundamentals and AWS services." },
  { icon: FaAward, title: "Hackathon Winner", org: "College Tech Fest", period: "2024", type: "achievement", desc: "Won first place for developing an innovative IoT-based smart home solution." }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">Experience & <span className="gradient-text">Education</span></motion.h2>
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2"/>
          {timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative flex items-start mb-12 ${i % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"}`}>
              <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transform -translate-x-1/2 mt-6`}/>
              <div className={`ml-8 md:ml-0 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"} glass rounded-xl p-6 w-full`}>
                <div className="flex items-center gap-3 mb-2"><div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"><item.icon/></div><span className="text-xs uppercase tracking-wider text-[var(--accent-primary)]">{item.type}</span></div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-[var(--accent-primary)] font-medium mb-1">{item.org}</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">{item.period}</p>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}