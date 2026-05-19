import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> { padded?: boolean; }
const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard({ className, padded = true, ...rest }, ref) {
  return <div ref={ref} className={cn('glass shadow-glass', padded && 'p-5', className)} {...rest} />;
});
export default GlassCard;
