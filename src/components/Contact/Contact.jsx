import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1500);
  };

  const contactInfo = [
    { icon: FaEnvelope, label: "Email", value: "abishekvankatachalam2007@gmail.com", href: "mailto:abishekvankatachalam2007@gmail.com" },
    { icon: FaPhone, label: "Phone", value: "+91 82203 87244", href: "tel:+918220387244" },
    { icon: FaGithub, label: "GitHub", value: "@abishek-vk", href: "https://github.com/abishek-vk" }
  ];

  return (
    <section id="contact" className="py-40 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="absolute -right-32 top-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/5 rounded-full blur-3xl opacity-20" />
      <div className="absolute -left-32 bottom-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-cyan)]/5 rounded-full blur-3xl opacity-20" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[var(--accent-cyan)] uppercase tracking-wide mb-4 border border-[var(--accent-cyan)]/30">
            Get In Touch
          </motion.span>
          
          <h2 className="mb-4">
            Let's Build Something <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Open to new opportunities, collaborations, and exciting projects. I'd love to hear from you.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-stretch mb-16">
          {/* Contact Methods */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : "_self"}
                rel={info.href.startsWith("http") ? "noreferrer" : ""}
                whileHover={{ x: 8 }}
                className="group rounded-2xl p-6 flex items-start gap-4 cursor-pointer transition-all duration-300 border border-transparent hover:border-[var(--accent-cyan)] hover:glow-text"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)]/30 to-[var(--accent-teal)]/20 group-hover:from-[var(--accent-cyan)]/50 group-hover:to-[var(--accent-teal)]/30 transition-all group-hover:scale-110 flex-shrink-0">
                  <info.icon className="text-2xl text-[var(--accent-cyan)]" />
                </div>
                <div>
                  <p className="text-[var(--text-tertiary)] text-xs font-semibold uppercase tracking-wide mb-1">{info.label}</p>
                  <p className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors text-sm md:text-base break-all">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="md:col-span-2 rounded-3xl p-6 md:p-8 lg:p-10 space-y-6 border border-white/10 hover:border-[var(--accent-cyan)]/30 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2 md:mb-3 text-[var(--text-primary)]">Your Name</label>
                <motion.input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-[var(--glass-border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-300 text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2 md:mb-3 text-[var(--text-primary)]">Your Email</label>
                <motion.input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-[var(--glass-border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-300 text-sm"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-2 md:mb-3 text-[var(--text-primary)]">Message</label>
              <motion.textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={4}
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white/5 border border-[var(--glass-border)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-300 resize-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full glow-button px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{status || "Send Message"}</span>
            </motion.button>

            {/* Status Message */}
            {status && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm font-medium text-[var(--accent-cyan)]">
                {status}
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* CTA Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <p className="text-[var(--text-secondary)] mb-6">
            Or connect with me on social platforms
          </p>
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/abishek-vk"
              target="_blank"
              rel="noreferrer"
              className="p-4 glass rounded-full hover:border-[var(--accent-cyan)] transition-all duration-300 group hover:glow-text"
              whileHover={{ scale: 1.1, y: -4 }}
            >
              <FaGithub className="text-2xl text-[var(--accent-cyan)] group-hover:scale-110 transition-transform" />
            </motion.a>
            <motion.a
              href="mailto:abishekvankatachalam2007@gmail.com"
              className="p-4 glass rounded-full hover:border-[var(--accent-cyan)] transition-all duration-300 group hover:glow-text"
              whileHover={{ scale: 1.1, y: -4 }}
            >
              <FaEnvelope className="text-2xl text-[var(--accent-cyan)] group-hover:scale-110 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}