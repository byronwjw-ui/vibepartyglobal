'use client';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GameCard from '@/components/GameCard';
import Link from 'next/link';
import { GAMES, GAME_CATEGORIES } from '@/data/games';
import { usePartyStore } from '@/store/usePartyStore';
import { MODE_THEME } from '@/lib/constants';
import { Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function LobbyPage() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const theme = MODE_THEME[settings.mode];

  /** 按模式亲和度排序：亲和的游戏会排在同分类顶部 */
  const sorted = [...GAMES].sort((a, b) => {
    const aHit = a.modeAffinity?.includes(settings.mode) ? 1 : 0;
    const bHit = b.modeAffinity?.includes(settings.mode) ? 1 : 0;
    return bHit - aHit;
  });

  return (
    <AppShell>
      <PageHeader
        title="游戏大厅"
        backHref="/setup"
        right={<Link href="/settings" className="h-10 w-10 grid place-items-center rounded-full bg-paper-50 border-3 border-paper-900 shadow-sticker-sm press-down"><SettingsIcon size={18}/></Link>}
      />
      <main className="px-4 pb-20 space-y-6">
        {/* 当前氛围条 — 模式颜色跳出变化 */}
        <div className={cn('border-3 border-paper-900 rounded-3xl shadow-sticker p-4 flex items-center gap-3 tilt-r-sm', theme.bg)}>
          <div className="text-3xl">{theme.emoji}</div>
          <div className="text-sm">
            <div className="text-paper-900/70 font-bold">当前氛围</div>
            <div className="font-black text-paper-900">{theme.label} · {players.length} 位玩家{settings.drinkingEnabled ? ' · 🍻' : ''}</div>
            <div className="text-[11px] text-paper-900/70 font-semibold">{theme.tagline}；题库已按模式过滤</div>
          </div>
          <Link href="/setup" className="ml-auto text-xs font-bold px-3 py-1.5 rounded-full bg-paper-50 border-3 border-paper-900 shadow-sticker-sm press-down">修改</Link>
        </div>

        {GAME_CATEGORIES.map((cat) => {
          const list = sorted.filter((g) => g.category === cat.id && g.enabled);
          if (!list.length) return null;
          return (
            <section key={cat.id}>
              <div className="px-1 mb-2 flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded-md bg-paper-900 text-paper-50 text-xs font-black tilt-l-sm">{cat.label}</span>
                <span className="text-xs text-paper-900/50 font-bold">{list.length} 个</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
              </div>
            </section>
          );
        })}
      </main>
    </AppShell>
  );
}
