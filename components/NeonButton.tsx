'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: Variant; size?: Size; full?: boolean;
}

const variantCls: Record<Variant, string> = {
  primary: 'bg-neon-grad text-white shadow-neon',
  secondary: 'bg-white/10 text-white border border-white/15 backdrop-blur-md',
  ghost: 'bg-transparent text-white/80 hover:text-white',
  danger: 'bg-red-500/90 text-white',
};
const sizeCls: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm rounded-xl',
  md: 'h-12 px-5 text-base rounded-2xl',
  lg: 'h-14 px-6 text-lg rounded-2xl',
};

const NeonButton = forwardRef<HTMLButtonElement, Props>(function NeonButton(
  { variant = 'primary', size = 'md', full, className, children, ...rest }, ref
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      className={cn('font-semibold tracking-wide select-none active:opacity-90 inline-flex items-center justify-center gap-2', variantCls[variant], sizeCls[size], full && 'w-full', className)}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
});
export default NeonButton;
