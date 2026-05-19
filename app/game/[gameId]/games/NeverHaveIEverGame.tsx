'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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

  const pool = useMemo(() => filterByModeAndLevel(NEVER_HAVE_I_EVER, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = () => {
    const item = pick(pool.length ? pool : NEVER_HAVE_I_EVER);
    setCard({ k: randomId(), text: item.text });
  };

  return (
    <GameLayout title="我从来没有 ✋" rules="做过的人举手；可选手动加减分。">
      <motion.div key={card?.k || 'empty'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4">
        <div className="sticker p-6 min-h-[140px] grid place-items-center text-center">
          <div className="text-xl font-black doodle-title leading-relaxed">{card?.text || '点击下方抽一题。'}</div>
        </div>
        {settings.drinkingEnabled && card && (
          <div className="text-center text-xs text-paper-900/60 mt-2 font-semibold">喝酒模式：做过的人可自愿小酌一口，不强迫。</div>
        )}
      </motion.div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <NeonButton onClick={draw} size="lg">{card ? '下一题' : '抽一题'}</NeonButton>
        <NeonButton size="lg" variant="secondary" onClick={() => setCard(null)}>重置</NeonButton>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {players.map((p) => (
          <div key={p.id} className="sticker-sm p-3 flex items-center gap-2">
            <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-black border-2 border-paper-900" style={{ backgroundColor: p.avatarColor }}>{p.name.slice(0,1)}</span>
            <span className="text-sm font-bold truncate flex-1">{p.name}</span>
            <button onClick={() => bumpScore(p.id, -1)} className="h-7 w-7 rounded-full bg-paper-50 border-2 border-paper-900 font-bold">-</button>
            <span className="w-6 text-center tabular-nums font-black">{p.score}</span>
            <button onClick={() => bumpScore(p.id, 1)} className="h-7 w-7 rounded-full bg-sticker-yellow border-2 border-paper-900 font-bold">+</button>
          </div>
        ))}
      </div>
      <div className="mt-4"><ScoreBoard players={players} /></div>
    </GameLayout>
  );
}
