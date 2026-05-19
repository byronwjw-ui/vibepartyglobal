'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import { WOULD_YOU_RATHER } from '@/data/zh-CN/wouldYouRather';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';

type Item = { a: string; b: string; level?: 'soft'|'funny'|'spicy' };

export default function WouldYouRatherGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const [q, setQ] = useState<{ k: string; a: string; b: string } | null>(null);
  const [votes, setVotes] = useState<Record<string, 'a' | 'b'>>({});
  const [done, setDone] = useState(0);

  const pool = useMemo(() => filterByModeAndLevel(WOULD_YOU_RATHER as Item[], settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = () => {
    const item = pick(pool.length ? pool : (WOULD_YOU_RATHER as Item[]));
    setQ({ k: randomId(), a: item.a, b: item.b });
    setVotes({});
    setDone((n) => n + 1);
  };

  const tallyA = Object.values(votes).filter((v) => v === 'a').length;
  const tallyB = Object.values(votes).filter((v) => v === 'b').length;
  const total = Math.max(1, tallyA + tallyB);

  const setVote = (id: string, side: 'a' | 'b') => {
    setVotes((v) => ({ ...v, [id]: side }));
  };

  return (
    <GameLayout title="二选一 ⚖️" rules={`已出题 ${done} · 点头像投票，让现场讲理由`}>
      <AnimatePresence mode="wait">
        <motion.div key={q?.k || 'init'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4 space-y-3">
          {q ? (
            <>
              <VoteCard side="A" text={q.a} tone="bg-sticker-yellow" count={tallyA} total={total} onClick={() => {}} />
              <div className="text-center text-xs font-bold text-paper-900/50">— 或 —</div>
              <VoteCard side="B" text={q.b} tone="bg-sticker-cyan" count={tallyB} total={total} onClick={() => {}} />
              <div className="mt-2">
                <div className="text-xs font-bold text-paper-900/70 mb-1">点头像投票</div>
                <div className="grid grid-cols-2 gap-2">
                  {players.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 p-2 rounded-2xl border-3 border-paper-900 bg-paper-50 shadow-sticker-sm">
                      <span className="h-6 w-6 rounded-full grid place-items-center text-[10px] font-black border-2 border-paper-900" style={{ background: p.avatarColor }}>{p.name.slice(0,1)}</span>
                      <span className="text-xs font-bold truncate flex-1">{p.name}</span>
                      <button onClick={() => setVote(p.id, 'a')} className={`h-7 w-7 rounded-full border-2 border-paper-900 text-xs font-black ${votes[p.id] === 'a' ? 'bg-sticker-yellow' : 'bg-paper-50'}`}>A</button>
                      <button onClick={() => setVote(p.id, 'b')} className={`h-7 w-7 rounded-full border-2 border-paper-900 text-xs font-black ${votes[p.id] === 'b' ? 'bg-sticker-cyan' : 'bg-paper-50'}`}>B</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="sticker p-6 text-center"><div className="text-paper-900/70 font-semibold">点击下方抽一题</div></div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <NeonButton onClick={draw} size="lg">{q ? '下一题' : '开始'}</NeonButton>
        <NeonButton size="lg" variant="secondary" onClick={() => { setQ(null); setVotes({}); }}>重置</NeonButton>
      </div>
    </GameLayout>
  );
}

function VoteCard({ side, text, tone, count, total, onClick }: { side: 'A'|'B'; text: string; tone: string; count: number; total: number; onClick: () => void }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <button onClick={onClick} className={`relative w-full overflow-hidden p-5 rounded-2xl text-left text-lg font-black border-3 border-paper-900 shadow-sticker-sm ${tone}`}>
      <div className="relative z-10">
        <div className="text-xs font-bold text-paper-900/70 mb-1 flex items-center justify-between">
          <span>选择 {side}</span>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-paper-900 bg-paper-50">{count} 票 · {pct}%</span>
        </div>
        <div className="text-paper-900">{text}</div>
      </div>
      <div className="absolute inset-y-0 left-0 bg-paper-900/10 transition-all" style={{ width: `${pct}%` }} />
    </button>
  );
}
