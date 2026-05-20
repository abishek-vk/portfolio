import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const navLinks = [{name:'Home',href:'#home'},{name:'About',href:'#about'},{name:'Skills',href:'#skills'},{name:'Projects',href:'#projects'},{name:'Experience',href:'#experience'},{name:'Contact',href:'#contact'}];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
        <motion.a href='#home' className='text-2xl font-bold gradient-text' whileHover={{ scale: 1.05 }}>{'<AV />'}</motion.a>
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <motion.a key={link.name} href={link.href} className='text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative group' whileHover={{ y: -2 }}>{link.name}<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] group-hover:w-full transition-all duration-300'/></motion.a>
          ))}
          <ThemeToggle />
        </div>
        <button className='md:hidden text-2xl text-[var(--text-primary)]' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <FaTimes /> : <FaBars />}</button>
      </div>
      <AnimatePresence>{isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className='md:hidden glass mt-3 mx-4 rounded-xl overflow-hidden'>
          <div className='py-4 px-6 flex flex-col gap-4'>
            {navLinks.map((link) => (<a key={link.name} href={link.href} className='text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors' onClick={() => setIsMobileMenuOpen(false)}>{link.name}</a>))}
            <ThemeToggle />
          </div>
        </motion.div>
      )}</AnimatePresence>
    </motion.nav>
  );
}