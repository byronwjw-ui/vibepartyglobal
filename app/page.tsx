'use client';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import { Sparkles, Users, Wine, Flame } from 'lucide-react';
import { usePartyStore } from '@/store/usePartyStore';
import { GAMES } from '@/data/games';
import { MODE_THEME } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function HomePage() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const hydrated = usePartyStore((s) => s.hydrated);
  const recent = usePartyStore((s) => s.recentGames);
  const theme = MODE_THEME[settings.mode];

  // 智能推荐 3 款：当前模式 affinity + 满足人数 + 未玩过优先
  const recommendations = hydrated
    ? [...GAMES]
        .filter((g) => g.enabled && players.length >= g.minPlayers)
        .sort((a, b) => {
          const aHit = a.modeAffinity?.includes(settings.mode) ? 1 : 0;
          const bHit = b.modeAffinity?.includes(settings.mode) ? 1 : 0;
          if (aHit !== bHit) return bHit - aHit;
          const aRecent = recent.indexOf(a.id);
          const bRecent = recent.indexOf(b.id);
          // 没玩过的优先
          const aScore = aRecent < 0 ? 0 : 1;
          const bScore = bRecent < 0 ? 0 : 1;
          return aScore - bScore;
        })
        .slice(0, 3)
    : [];

  const hasPlayers = hydrated && players.length >= 2;

  return (
    <AppShell>
      <main className="px-5 pt-10 pb-24">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-neon-grad shadow-neon grid place-items-center font-black">V</div>
          <span className="text-lg font-extrabold tracking-wider neon-text">VibeParty</span>
        </div>

        <section className="mt-12">
          <h1 className="text-4xl font-black leading-tight">让聚会<br/><span className="neon-text">马上热起来</span></h1>
          <p className="mt-4 text-paper-900/70 font-semibold leading-relaxed">32 款多人派对游戏·派对人格测试·谁是 AI · 现场 Tier List。打开网页就能玩。</p>
        </section>

        <section className="mt-8 flex flex-col gap-3">
          <Link href={hasPlayers ? '/lobby' : '/setup'}>
            <NeonButton full size="lg">{hasPlayers ? '🎉 继续上次的局' : '开始组局'}</NeonButton>
          </Link>
          <Link href="/lobby"><NeonButton full size="lg" variant="secondary">先看看游戏</NeonButton></Link>
        </section>

        {/* 今晚先玩 · 智能推荐 */}
        {hasPlayers && recommendations.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center gap-2 mb-3 px-1">
              <Flame size={16} className="text-paper-900" />
              <div className="font-black text-paper-900">今晚先玩 · {theme.label}</div>
            </div>
            <div className="grid gap-2">
              {recommendations.map((g, i) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link href={`/game/${g.id}`}>
                    <div className={`flex items-center gap-3 p-3 rounded-2xl border-3 border-paper-900 shadow-sticker-sm press-down ${i === 0 ? 'bg-sticker-pink' : i === 1 ? 'bg-sticker-cyan' : 'bg-sticker-yellow'}`}>
                      <div className="h-11 w-11 rounded-xl border-3 border-paper-900 bg-paper-50 grid place-items-center text-2xl">{g.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-paper-900 truncate">{g.title}</div>
                        <div className="text-[11px] font-bold text-paper-900/70 truncate">{g.subtitle}</div>
                      </div>
                      <div className="text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-paper-900 bg-paper-50">{g.duration}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 grid gap-3">
          <GlassCard tone="yellow" className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper-50 border-3 border-paper-900 grid place-items-center"><Sparkles size={18} /></div>
            <div><div className="font-black text-paper-900">新增派对实验室 🧬</div><div className="text-sm text-paper-900/70 font-semibold mt-1">VibeType 人格 · 谁是 AI · 一句一图 · 现场 Tier List。</div></div>
          </GlassCard>
          <GlassCard tone="cyan" className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper-50 border-3 border-paper-900 grid place-items-center"><Users size={18} /></div>
            <div><div className="font-black text-paper-900">支持多人轮流互动</div><div className="text-sm text-paper-900/70 font-semibold mt-1">围着一台手机就能开局，2 人到 8 人都好玩。</div></div>
          </GlassCard>
          <GlassCard tone="orange" className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper-50 border-3 border-paper-900 grid place-items-center"><Wine size={18} /></div>
            <div><div className="font-black text-paper-900">喝酒与无酒精模式自由切换</div><div className="text-sm text-paper-900/70 font-semibold mt-1">默认安全，开启喝酒模式需年龄确认。</div></div>
          </GlassCard>
        </section>

        <div className="mt-12 text-center text-xs text-paper-900/60 font-bold">
          <Link href="/safety" className="underline underline-offset-4">理性游戏，尊重边界，所有挑战都可以跳过</Link>
        </div>
      </main>
    </AppShell>
  );
}
