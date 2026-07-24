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
        isScrolled ? 'border-b border-white/20 bg-[#0b0f19]/90 backdrop-blur-lg py-4 md:py-5 shadow-xl' : 'bg-transparent py-7 md:py-8'
      }`}
    >
      <div className="container-max flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-3xl md:text-4xl font-bold gradient-rose-text"
          whileHover={{ scale: 1.05 }}
        >
          Abishek V
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="px-1 py-2 text-base font-bold text-white hover:text-[var(--accent-rose)] transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {link.name}
              <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-[var(--accent-rose)] to-[var(--accent-coral)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="hidden md:block px-7 py-3 rounded-full text-base font-bold bg-gradient-to-r from-[var(--accent-rose)]/30 to-[var(--accent-coral)]/20 border border-[var(--accent-rose)]/50 text-[var(--accent-rose)] hover:border-[var(--accent-rose)] hover:bg-gradient-to-r hover:from-[var(--accent-rose)]/40 hover:to-[var(--accent-coral)]/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Get In Touch
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white"
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
            className="md:hidden border border-white/20 bg-[#0b0f19]/95 backdrop-blur-lg mt-2 mx-4 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="py-4 px-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-white hover:text-[var(--accent-rose)] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                href="#contact"
                className="px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[var(--accent-rose)]/30 to-[var(--accent-coral)]/20 border border-[var(--accent-rose)]/50 text-[var(--accent-rose)] text-center"
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