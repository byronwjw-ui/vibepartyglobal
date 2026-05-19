'use client';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';

export default function RevealScreen({ open, title, body, onClose, accent = '#FF2DAA' }: { open: boolean; title: string; body?: React.ReactNode; onClose: () => void; accent?: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 grid place-items-center px-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80" />
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} className="relative glass p-8 w-full max-w-md text-center" style={{ boxShadow: `0 0 60px ${accent}55` }}>
            <div className="text-3xl font-black neon-text">{title}</div>
            <div className="mt-3 text-white/80">{body}</div>
            <div className="mt-6"><NeonButton full onClick={onClose}>继续</NeonButton></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
