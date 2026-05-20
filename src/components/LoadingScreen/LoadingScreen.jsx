import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="text-6xl font-bold gradient-text mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>AV</motion.div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" animate={{ y: [0, -20, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}/>
          ))}
        </div>
        <motion.p className="mt-4 text-[var(--text-secondary)]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>Loading...</motion.p>
      </motion.div>
    </div>
  );
}