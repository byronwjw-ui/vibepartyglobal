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
  primary:   'bg-sticker-yellow text-paper-900',
  secondary: 'bg-paper-50 text-paper-900',
  ghost:     'bg-transparent text-paper-900',
  danger:    'bg-sticker-red text-paper-900',
};
const sizeCls: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm rounded-2xl',
  md: 'h-12 px-5 text-base rounded-2xl',
  lg: 'h-14 px-6 text-lg rounded-2xl',
};

/** 贴纸风按钮：粗黑描边 + 偏移阴影 + 按下贴到底 */
const NeonButton = forwardRef<HTMLButtonElement, Props>(function NeonButton(
  { variant = 'primary', size = 'md', full, className, children, ...rest }, ref
) {
  const isGhost = variant === 'ghost';
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'font-extrabold tracking-wide select-none inline-flex items-center justify-center gap-2 press-down',
        !isGhost && 'border-3 border-paper-900 shadow-sticker',
        variantCls[variant], sizeCls[size], full && 'w-full', className
      )}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
});
export default NeonButton;
