'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export default function AnimatedCard({ children, className, tone = 'paper', tilt = 'none' }: { children: React.ReactNode; className?: string; tone?: 'paper'|'yellow'|'pink'|'cyan'|'lime'|'orange'; tilt?: 'l'|'r'|'none' }) {
  const toneCls: Record<string,string> = {
    paper: 'bg-paper-100',
    yellow: 'bg-sticker-yellow',
    pink: 'bg-sticker-pink',
    cyan: 'bg-sticker-cyan',
    lime: 'bg-sticker-lime',
    orange: 'bg-sticker-orange',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: -2, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, rotate: tilt === 'l' ? -1.5 : tilt === 'r' ? 1.5 : 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className={cn('border-3 border-paper-900 rounded-3xl shadow-sticker p-6', toneCls[tone], className)}
    >
      {children}
    </motion.div>
  );
}
