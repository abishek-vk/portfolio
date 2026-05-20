import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => { document.body.classList.toggle("light-mode", !isDark); }, [isDark]);
  return (
    <motion.button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <motion.div initial={false} animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {isDark ? <FaMoon className="text-[var(--accent-secondary)]"/> : <FaSun className="text-yellow-500"/>}
      </motion.div>
    </motion.button>
  );
}
