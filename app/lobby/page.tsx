'use client';
import AppShell from '@/components/AppShell';
import PageHeader from '@/components/PageHeader';
import GameCard from '@/components/GameCard';
import Link from 'next/link';
import { GAMES, GAME_CATEGORIES } from '@/data/games';
import { usePartyStore } from '@/store/usePartyStore';
import { Settings as SettingsIcon } from 'lucide-react';

export default function LobbyPage() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  return (
    <AppShell>
      <PageHeader title="游戏大厅" backHref="/setup" right={<Link href="/settings" className="h-10 w-10 grid place-items-center rounded-full bg-white/10 border border-white/10"><SettingsIcon size={18}/></Link>}/>
      <main className="px-4 pb-20 space-y-6">
        <div className="glass p-4 flex items-center gap-3">
          <div className="text-sm">
            <div className="text-white/60">当前局</div>
            <div className="font-semibold">{players.length} 位玩家 · {labelOf(settings.mode)}{settings.drinkingEnabled ? ' · 喝酒' : ''}</div>
          </div>
          <Link href="/setup" className="ml-auto text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/10">修改</Link>
        </div>

        {GAME_CATEGORIES.map((cat) => {
          const list = GAMES.filter((g) => g.category === cat.id && g.enabled);
          if (!list.length) return null;
          return (
            <section key={cat.id}>
              <div className="px-1 text-sm text-white/60 mb-2">{cat.label}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {list.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
              </div>
            </section>
          );
        })}
      </main>
    </AppShell>
  );
}

function labelOf(mode: string) {
  return ({
    friends: '朋友局', icebreaker: '破冰局', funny: '搞笑局', spicy: '暧昧局', sober: '无酒精局', drinking: '喝酒模式',
  } as Record<string, string>)[mode] || '朋友局';
}
