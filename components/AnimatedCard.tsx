'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export default function AnimatedCard({ children, className, k }: { children: React.ReactNode; className?: string; k?: string | number }) {
  return (
    <motion.div key={k} initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: 90, opacity: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className={cn('glass p-6', className)}>
      {children}
    </motion.div>
  );
}
