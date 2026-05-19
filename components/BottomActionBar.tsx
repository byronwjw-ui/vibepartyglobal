import { cn } from '@/lib/cn';

export default function BottomActionBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('sticky bottom-0 inset-x-0 px-4 pt-3 pb-6 bg-gradient-to-t from-paper-50 via-paper-50/95 to-transparent', className)}>
      {children}
    </div>
  );
}
