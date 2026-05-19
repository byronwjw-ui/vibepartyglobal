'use client';
import { useEffect } from 'react';
import { usePartyStore } from '@/store/usePartyStore';

/**
 * 涂鸦贴纸风 Shell：四角飘点缀贴纸 + 整页轻微旋转的氛围色块
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const hydrate = usePartyStore((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  return (
    <div className="relative min-h-[100dvh] safe-area overflow-hidden">
      {/* 飘在背景上的贴纸 */}
      <div aria-hidden className="pointer-events-none absolute -top-6 -left-4 h-16 w-16 rounded-2xl bg-sticker-yellow border-3 border-paper-900 rotate-[-14deg] shadow-sticker-sm" />
      <div aria-hidden className="pointer-events-none absolute top-24 -right-6 h-14 w-14 rounded-full bg-sticker-pink border-3 border-paper-900 rotate-[10deg] shadow-sticker-sm" />
      <div aria-hidden className="pointer-events-none absolute bottom-32 -left-5 h-14 w-14 bg-sticker-cyan border-3 border-paper-900 rotate-[8deg] shadow-sticker-sm" style={{ borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-10 right-2 h-12 w-12 rounded-2xl bg-sticker-lime border-3 border-paper-900 rotate-[-6deg] shadow-sticker-sm" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
