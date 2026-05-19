'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export default function CountdownTimer({ seconds, onDone, running = true, className }: { seconds: number; onDone?: () => void; running?: boolean; className?: string }) {
  const [left, setLeft] = useState(seconds);
  const ref = useRef<number | null>(null);
  useEffect(() => { setLeft(seconds); }, [seconds]);
  useEffect(() => {
    if (!running) return;
    ref.current = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) { window.clearInterval(ref.current!); onDone?.(); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [running, onDone]);
  const critical = left <= 3;
  return (
    <div className={cn('text-6xl font-black tabular-nums', critical ? 'text-neon-pink animate-pulse' : 'text-white', className)}>{left}</div>
  );
}
