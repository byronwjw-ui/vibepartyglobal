'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import ScoreBoard from '@/components/ScoreBoard';
import { MOST_LIKELY_TO } from '@/data/zh-CN/mostLikelyTo';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';

export default function MostLikelyToGame() {
  const players = usePartyStore((s) => s.players);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const [q, setQ] = useState<{ k: string; text: string } | null>(null);
  const [target, setTarget] = useState<string | null>(null);

  const draw = () => { setQ({ k: randomId(), text: pick(MOST_LIKELY_TO) }); setTarget(null); };
  const winner = target ? players.find((p) => p.id === target) : null;

  return (
    <GameLayout title="Most Likely To 谁最可能" rules="全场投票选出最符合的人。">
      <motion.div key={q?.k || 'init'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4">
        <div className="glass p-6 min-h-[100px] grid place-items-center text-center">
          <div className="text-lg font-semibold leading-relaxed">{q?.text || '点击下方抽一题'}</div>
        </div>
      </motion.div>

      {q && (
        <>
          <div className="text-sm text-white/60 mt-2 mb-2">选出今晚最可能的人</div>
          <div className="grid grid-cols-2 gap-2">
            {players.map((p) => (
              <button key={p.id} onClick={() => setTarget(p.id)} className={`flex items-center gap-2 p-3 rounded-2xl border ${target === p.id ? 'border-neon-pink bg-neon-pink/15 shadow-neon' : 'border-white/10 bg-white/5'}`}>
                <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-bold" style={{ backgroundColor: p.avatarColor }}>{p.name.slice(0,1)}</span>
                <span className="text-sm truncate">{p.name}</span>
              </button>
            ))}
          </div>
          {winner && (
            <div className="mt-4 glass p-4 text-center">
              <div className="text-sm text-white/60">今晚最可能是</div>
              <div className="text-2xl font-black neon-text mt-1">{winner.name}</div>
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
