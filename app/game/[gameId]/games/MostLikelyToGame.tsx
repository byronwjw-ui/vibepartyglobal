'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import ScoreBoard from '@/components/ScoreBoard';
import { MOST_LIKELY_TO } from '@/data/zh-CN/mostLikelyTo';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';

export default function MostLikelyToGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const [q, setQ] = useState<{ k: string; text: string } | null>(null);
  const [target, setTarget] = useState<string | null>(null);

  // 老题库只是 string[]，包装为默认 level=funny
  const pool = useMemo(() => filterByModeAndLevel(MOST_LIKELY_TO.map((t) => ({ text: t, level: 'funny' as const })), settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = () => { setQ({ k: randomId(), text: pick(pool.length ? pool : MOST_LIKELY_TO.map((t) => ({ text: t, level: 'funny' as const }))).text }); setTarget(null); };
  const winner = target ? players.find((p) => p.id === target) : null;

  return (
    <GameLayout title="谁最可能 🗳️" rules="全场投票选出最符合的人。">
      <motion.div key={q?.k || 'init'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4">
        <div className="sticker p-6 min-h-[100px] grid place-items-center text-center">
          <div className="text-xl font-black doodle-title leading-relaxed">{q?.text || '点击下方抽一题'}</div>
        </div>
      </motion.div>

      {q && (
        <>
          <div className="text-sm font-bold text-paper-900/70 mt-3 mb-2">选出今晚最可能的人</div>
          <div className="grid grid-cols-2 gap-2">
            {players.map((p) => (
              <button key={p.id} onClick={() => setTarget(p.id)} className={`flex items-center gap-2 p-3 rounded-2xl border-3 border-paper-900 press-down ${target === p.id ? 'bg-sticker-pink shadow-sticker' : 'bg-paper-100 shadow-sticker-sm'}`}>
                <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-black border-2 border-paper-900" style={{ backgroundColor: p.avatarColor }}>{p.name.slice(0,1)}</span>
                <span className="text-sm font-bold truncate">{p.name}</span>
              </button>
            ))}
          </div>
          {winner && (
            <div className="mt-4 sticker p-4 text-center">
              <div className="text-sm font-bold text-paper-900/70">今晚最可能是</div>
              <div className="text-2xl font-black doodle-title mt-1">{winner.name}</div>
              <div className="mt-3 flex justify-center gap-2">
                <NeonButton size="sm" variant="secondary" onClick={() => bumpScore(winner.id, -1)}>-1分</NeonButton>
                <NeonButton size="sm" onClick={() => bumpScore(winner.id, 1)}>+1分</NeonButton>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <NeonButton size="lg" onClick={draw}>{q ? '下一题' : '开始'}</NeonButton>
        <NeonButton size="lg" variant="secondary" onClick={() => { setQ(null); setTarget(null); }}>重置</NeonButton>
      </div>

      <div className="mt-4"><ScoreBoard players={players} /></div>
    </GameLayout>
  );
}
