import { cn } from '@/lib/cn';

export default function BottomActionBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('sticky bottom-0 inset-x-0 px-4 pt-3 pb-6 bg-gradient-to-t from-ink-900 via-ink-900/95 to-transparent', className)}>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
