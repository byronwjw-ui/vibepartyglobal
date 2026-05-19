'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

export default function CountdownTimer({ seconds, running, onEnd }: { seconds: number; running: boolean; onEnd?: () => void }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => { setLeft(seconds); }, [seconds]);
  useEffect(() => {
    if (!running) return;
    if (left <= 0) { onEnd?.(); return; }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left, running, onEnd]);
  const danger = left <= 3;
  return (
    <div className={cn('inline-grid place-items-center h-16 w-16 rounded-full border-3 border-paper-900 font-black text-2xl shadow-sticker-sm', danger ? 'bg-sticker-red text-paper-900 animate-wiggle' : 'bg-sticker-yellow text-paper-900')}>
      {left}
    </div>
  );
}
