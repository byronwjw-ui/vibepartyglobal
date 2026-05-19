'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AppShell from './AppShell';

export default function GameLayout({ title, subtitle, currentPlayer, rules, children, footer }: { title: string; subtitle?: string; currentPlayer?: string; rules?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <AppShell>
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 pt-6 pb-3 flex items-center gap-2">
          <Link href="/lobby" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 border border-white/10"><ArrowLeft size={18}/></Link>
          <div className="min-w-0 flex-1">
            <div className="font-bold truncate">{title}</div>
            {subtitle ? <div className="text-xs text-white/60 truncate">{subtitle}</div> : null}
          </div>
          {currentPlayer ? <div className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">轮到 <b className="text-white">{currentPlayer}</b></div> : null}
        </header>
        {rules ? <div className="px-4 pb-2 text-[11px] text-white/50">{rules}</div> : null}
        <main className="flex-1 px-4 pb-4">{children}</main>
        {footer}
      </div>
    </AppShell>
  );
}
