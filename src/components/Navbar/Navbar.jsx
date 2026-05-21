import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-white/10 bg-black/50 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-max flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Abishek V
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {link.name}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-teal)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="hidden md:block px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/60 hover:bg-gradient-to-r hover:from-[var(--accent-cyan)]/30 hover:to-[var(--accent-teal)]/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Get In Touch
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[var(--text-primary)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border border-white/10 bg-black/50 mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                href="#contact"
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--accent-cyan)]/20 to-[var(--accent-teal)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] text-center"
                whileHover={{ scale: 1.05 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}