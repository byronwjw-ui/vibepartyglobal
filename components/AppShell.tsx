'use client';
import { useEffect } from 'react';
import { usePartyStore } from '@/store/usePartyStore';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const hydrate = usePartyStore((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  return (
    <div className="relative min-h-[100dvh] safe-area overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-neon-pink/30 animate-pulse-glow" />
      <div className="pointer-events-none absolute top-40 -right-24 h-80 w-80 rounded-full bg-neon-purple/30 animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-neon-cyan/20 animate-pulse-glow" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
