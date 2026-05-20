import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const links = [{ name: "Home", href: "#home" }, { name: "About", href: "#about" }, { name: "Skills", href: "#skills" }, { name: "Projects", href: "#projects" }, { name: "Contact", href: "#contact" }];
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">Abishek Venkat Kumar</h3>
            <p className="text-[var(--text-secondary)] text-sm">CSE Student | Full Stack Developer</p>
          </div>
          <div className="flex gap-4">{[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (<a key={i} href="#" className="p-2 glass rounded-full hover:bg-white/10 transition-all"><Icon/></a>))}</div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">&copy; 2024 Abishek Venkat Kumar. All rights reserved.</p>
          <div className="flex gap-6">{links.map((link, i) => (<a key={i} href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">{link.name}</a>))}</div>
        </div>
      </div>
    </footer>
  );
}