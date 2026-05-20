import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => { setStatus("Message sent successfully!"); setForm({ name: "", email: "", message: "" }); }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">Get In <span className="gradient-text">Touch</span></motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-6">Let us talk about everything</h3>
            <p className="text-[var(--text-secondary)] mb-8">Feel free to reach out for collaborations, freelance projects, or just a friendly chat about technology and innovation.</p>
            <div className="space-y-6">
              {[{ icon: FaEnvelope, label: "Email", value: "abishek@example.com" }, { icon: FaMapMarkerAlt, label: "Location", value: "Chennai, India" }, { icon: FaPhone, label: "Phone", value: "+91 98765 43210" }].map((item, i) => (
                <div key={i} className="flex items-center gap-4"><div className="p-3 rounded-xl glass"><item.icon className="text-xl text-[var(--accent-primary)]"/></div><div><p className="text-sm text-[var(--text-secondary)]">{item.label}</p><p className="font-medium">{item.value}</p></div></div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (<motion.a key={i} href="#" className="p-3 glass rounded-full hover:bg-white/10 transition-all" whileHover={{ y: -5 }}><Icon/></motion.a>))}
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
            <div><label className="block text-sm font-medium mb-2">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent-primary)] focus:outline-none transition-colors" placeholder="Your Name" required/></div>
            <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent-primary)] focus:outline-none transition-colors" placeholder="your.email@example.com" required/></div>
            <div><label className="block text-sm font-medium mb-2">Message</label><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="5" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-none" placeholder="Your message..." required/></div>
            <motion.button type="submit" className="w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--accent-primary)]/50 transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{status || "Send Message"}</motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}