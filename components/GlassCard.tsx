import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

type Tone = 'paper' | 'yellow' | 'pink' | 'cyan' | 'lime' | 'orange' | 'teal' | 'purple' | 'red' | 'blue' | 'coral';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  tilt?: 'l' | 'r' | 'none';
  tone?: Tone;
}

const toneMap: Record<Tone, string> = {
  paper:  'bg-paper-100',
  yellow: 'bg-sticker-yellow/85',
  pink:   'bg-sticker-pink/80',
  cyan:   'bg-sticker-cyan/80',
  lime:   'bg-sticker-lime/85',
  orange: 'bg-sticker-orange/85',
  teal:   'bg-sticker-teal/80',
  purple: 'bg-sticker-purple/75',
  red:    'bg-sticker-red/80',
  blue:   'bg-sticker-blue/75',
  coral:  'bg-sticker-coral/80',
};

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { className, padded = true, tilt = 'none', tone = 'paper', ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'border-3 border-paper-900 rounded-3xl shadow-sticker',
        toneMap[tone],
        padded && 'p-5',
        tilt === 'l' && 'tilt-l-sm',
        tilt === 'r' && 'tilt-r-sm',
        className
      )}
      {...rest}
    />
  );
});
export default GlassCard;
