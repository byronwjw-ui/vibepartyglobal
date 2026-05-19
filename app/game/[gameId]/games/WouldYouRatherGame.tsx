'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import { WOULD_YOU_RATHER } from '@/data/zh-CN/wouldYouRather';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';

type Item = { a: string; b: string; level?: 'soft'|'funny'|'spicy' };

export default function WouldYouRatherGame() {
  const settings = usePartyStore((s) => s.settings);
  const [q, setQ] = useState<{ k: string; a: string; b: string } | null>(null);
  const [voted, setVoted] = useState<'a' | 'b' | null>(null);

  const pool = useMemo(() => filterByModeAndLevel(WOULD_YOU_RATHER as Item[], settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = () => {
    const item = pick(pool.length ? pool : (WOULD_YOU_RATHER as Item[]));
    setQ({ k: randomId(), a: item.a, b: item.b });
    setVoted(null);
  };

  return (
    <GameLayout title="二选一 ⚖️" rules="必须二选一，可以说出理由。">
      <motion.div key={q?.k || 'init'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4 space-y-3">
        {q ? (
          <>
            <button onClick={() => setVoted('a')} className={`w-full p-5 rounded-2xl text-left text-lg font-black border-3 border-paper-900 press-down ${voted === 'a' ? 'bg-sticker-yellow shadow-sticker' : 'bg-paper-100 shadow-sticker-sm'}`}>
              <div className="text-xs font-bold text-paper-900/70 mb-1">选择 A</div>{q.a}
            </button>
            <div className="text-center text-xs font-bold text-paper-900/50">或</div>
            <button onClick={() => setVoted('b')} className={`w-full p-5 rounded-2xl text-left text-lg font-black border-3 border-paper-900 press-down ${voted === 'b' ? 'bg-sticker-cyan shadow-sticker' : 'bg-paper-100 shadow-sticker-sm'}`}>
              <div className="text-xs font-bold text-paper-900/70 mb-1">选择 B</div>{q.b}
            </button>
          </>
        ) : (
          <div className="sticker p-6 text-center"><div className="text-paper-900/70 font-semibold">点击下方抽一题</div></div>
        )}
      </motion.div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <NeonButton onClick={draw} size="lg">{q ? '下一题' : '开始'}</NeonButton>
        <NeonButton size="lg" variant="secondary" onClick={() => { setQ(null); setVoted(null); }}>重置</NeonButton>
      </div>
    </GameLayout>
  );
}
