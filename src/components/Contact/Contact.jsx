import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  fadeUp, badgePop, scaleUp,
  staggerContainer, cardReveal, defaultViewport
} from "../../utils/animations";

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
    { icon: FaEnvelope, label: "Email", value: "abishekvenkatachalam2007@gmail.com", href: "mailto:abishekvenkatachalam2007@gmail.com" },
    { icon: FaGithub, label: "GitHub", value: "@abishek-vk", href: "https://github.com/abishek-vk" },
    { icon: FaLinkedin, label: "LinkedIn", value: "@vabishek13", href: "https://www.linkedin.com/in/vabishek13/" }
  ];

  const contactCardVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(2px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <section id="contact" className="py-40 lg:py-48 relative overflow-hidden">
      {/* Decorative Rose & Sunset Coral Backgrounds */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2 }}
        className="absolute -right-32 top-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-rose)]/20 to-[var(--accent-coral)]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute -left-32 bottom-0 w-96 h-96 bg-gradient-to-br from-[var(--accent-amber)]/15 to-[var(--accent-rose)]/10 rounded-full blur-3xl"
      />

      <div className="container-max relative z-10 w-full">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-24"
        >
          <motion.span variants={badgePop()} className="inline-block px-4 py-2 rounded-full text-xs font-bold text-[var(--accent-rose)] uppercase tracking-widest mb-6 border border-[var(--accent-rose)]/40 bg-[var(--accent-rose)]/15 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            Get In Touch
          </motion.span>

          <motion.h2 variants={fadeUp(0.05)} className="mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Let's Build Something <span className="gradient-rose-text">Amazing Together</span>
          </motion.h2>
          <motion.p variants={fadeUp(0.1)} className="text-white leading-relaxed max-w-3xl mx-auto text-base md:text-lg font-medium">
            Open to new opportunities, collaborations, and exciting projects. I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-14 items-center mb-20 w-full max-w-5xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : "_self"}
                rel={info.href.startsWith("http") ? "noreferrer" : ""}
                custom={i}
                variants={contactCardVariants}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="group rounded-2xl p-7 flex items-start gap-5 cursor-pointer transition-all duration-300 bg-[#13192b]/95 border border-white/20 hover:border-[var(--accent-rose)] shadow-xl"
              >
                <motion.div
                  className="p-4 rounded-xl bg-gradient-to-br from-[var(--accent-rose)]/30 to-[var(--accent-coral)]/20 group-hover:from-[var(--accent-rose)]/50 group-hover:to-[var(--accent-coral)]/40 transition-all group-hover:scale-110 flex-shrink-0"
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <info.icon className="text-3xl text-[var(--accent-rose)]" />
                </motion.div>
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">{info.label}</p>
                  <p className="font-bold text-white group-hover:text-[var(--accent-rose)] transition-colors text-base md:text-lg break-all">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={cardReveal(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            onSubmit={handleSubmit}
            className="w-full md:col-span-2 justify-self-stretch rounded-3xl p-6 md:p-8 space-y-6 bg-[#13192b]/95 backdrop-blur-xl border border-white/20 hover:border-[var(--accent-rose)]/60 transition-all duration-300 shadow-2xl" style={{ maxWidth: "640px" }}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Name Input */}
              <motion.div
                custom={0}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <label className="block text-sm md:text-base font-bold mb-2.5 text-white">Your Name</label>
                <motion.input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/60 font-semibold focus:outline-none focus:border-[var(--accent-rose)] focus:bg-white/20 focus:shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-all duration-300 text-base"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                custom={1}
                variants={formFieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <label className="block text-sm md:text-base font-bold mb-2.5 text-white">Your Email</label>
                <motion.input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/60 font-semibold focus:outline-none focus:border-[var(--accent-rose)] focus:bg-white/20 focus:shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-all duration-300 text-base"
                />
              </motion.div>
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              custom={2}
              variants={formFieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <label className="block text-sm md:text-base font-bold mb-2.5 text-white">Message</label>
              <motion.textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={3}
                required
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/60 font-semibold focus:outline-none focus:border-[var(--accent-rose)] focus:bg-white/20 focus:shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-all duration-300 resize-none text-base leading-relaxed"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={3}
              variants={formFieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <motion.button
                type="submit"
                className="w-fit px-7 py-3.5 rounded-xl font-bold text-white text-base bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-coral)] shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:shadow-[0_0_35px_rgba(244,63,94,0.7)] transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">{status || "Send Message"}</span>
              </motion.button>
            </motion.div>

            {/* Status Message */}
            {status && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-base font-bold text-[var(--accent-rose)]">
                {status}
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* CTA Section */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center"
        >
          <motion.p variants={fadeUp()} className="text-white mb-8 text-lg font-bold">
            Or connect with me on social platforms
          </motion.p>
          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="flex justify-center gap-6"
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
                className="p-4 rounded-full bg-[#13192b]/95 border border-white/20 hover:border-[var(--accent-rose)] transition-all duration-300 group hover:shadow-[0_0_20px_rgba(244,63,94,0.45)]"
                variants={scaleUp(i * 0.1)}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <social.icon className="text-2xl text-[var(--accent-rose)] group-hover:scale-110 transition-transform" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}