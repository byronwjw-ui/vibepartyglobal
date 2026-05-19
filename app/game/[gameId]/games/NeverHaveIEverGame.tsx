'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import ScoreBoard from '@/components/ScoreBoard';
import { NEVER_HAVE_I_EVER } from '@/data/zh-CN/neverHaveIEver';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';

export default function NeverHaveIEverGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const [card, setCard] = useState<{ k: string; text: string } | null>(null);
  const [hands, setHands] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(0);

  const pool = useMemo(() => filterByModeAndLevel(NEVER_HAVE_I_EVER, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = () => {
    const item = pick(pool.length ? pool : NEVER_HAVE_I_EVER);
    setCard({ k: randomId(), text: item.text });
    setHands({});
    setDone((n) => n + 1);
  };

  const toggleHand = (id: string) => {
    setHands((h) => ({ ...h, [id]: !h[id] }));
  };

  const lockAndNext = () => {
    // 举手的所有玩家扣 1 分（可选记分机制）
    Object.entries(hands).forEach(([id, lifted]) => {
      if (lifted) bumpScore(id, -1);
    });
    draw();
  };

  const handCount = Object.values(hands).filter(Boolean).length;

  return (
    <GameLayout title="我从来没有 ✋" rules={`已出题 ${done} · 做过的人点一下自己`}>
      <AnimatePresence mode="wait">
        <motion.div key={card?.k || 'empty'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4">
          <div className="sticker p-6 min-h-[140px] grid place-items-center text-center bg-sticker-cyan">
            <div className="text-xl font-black doodle-title leading-relaxed text-paper-900">{card?.text || '点击下方抽一题。'}</div>
          </div>
          {settings.drinkingEnabled && card && (
            <div className="text-center text-xs text-paper-900/60 mt-2 font-semibold">喝酒模式：做过的人可自愿小酌一口，不强迫。</div>
          )}
        </motion.div>
      </AnimatePresence>

      {card && (
        <>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm font-bold text-paper-900/70">点你自己（做过的人）</div>
            <div className="text-xs font-black px-2 py-0.5 rounded-full border-2 border-paper-900 bg-sticker-yellow">已举手 {handCount}</div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {players.map((p) => {
              const lifted = !!hands[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => toggleHand(p.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl border-3 border-paper-900 press-down transition-all ${lifted ? 'bg-sticker-pink shadow-sticker scale-105' : 'bg-paper-50 shadow-sticker-sm'}`}
                >
                  <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-black border-2 border-paper-900" style={{ background: p.avatarColor }}>{p.name.slice(0, 1)}</span>
                  <span className="text-sm font-bold truncate flex-1 text-left">{p.name}</span>
                  <span className="text-base">{lifted ? '✋' : '·'}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <NeonButton onClick={card ? lockAndNext : draw} size="lg">{card ? '下一题' : '抽一题'}</NeonButton>
        <NeonButton size="lg" variant="secondary" onClick={() => { setCard(null); setHands({}); }}>重置</NeonButton>
      </div>
      <div className="mt-4"><ScoreBoard players={players} /></div>
    </GameLayout>
  );
}
