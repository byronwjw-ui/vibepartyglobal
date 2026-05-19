'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import ScoreBoard from '@/components/ScoreBoard';
import ShareResultCard from '@/components/ShareResultCard';
import { MOST_LIKELY_TO } from '@/data/zh-CN/mostLikelyTo';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { vibrate } from '@/lib/gameUtils';

export default function MostLikelyToGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const [q, setQ] = useState<{ k: string; text: string } | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [history, setHistory] = useState<{ q: string; name: string }[]>([]);
  const [showShare, setShowShare] = useState(false);

  const pool = useMemo(
    () => filterByModeAndLevel(
      MOST_LIKELY_TO.map((t) => ({ text: t, level: 'funny' as const })),
      settings.mode,
      settings.contentLevel
    ),
    [settings.mode, settings.contentLevel]
  );

  const draw = () => {
    vibrate(15);
    setQ({ k: randomId(), text: pick(pool.length ? pool : MOST_LIKELY_TO.map((t) => ({ text: t, level: 'funny' as const }))).text });
    setTarget(null);
  };

  const winner = target ? players.find((p) => p.id === target) : null;

  const lockResult = () => {
    if (q && winner) {
      setHistory((h) => [...h, { q: q.text, name: winner.name }]);
    }
  };

  if (showShare && history.length > 0) {
    const shareText = `🗳️ 今晚谁最可能 · 全场判决\n\n${history.map((h) => `${h.q}\n→ ${h.name}`).join('\n\n')}\n\nvibepartyglobal.vercel.app`;
    return (
      <GameLayout title="今晚的判决书" subtitle={`共 ${history.length} 条`}>
        <ShareResultCard shareText={shareText} filename="most-likely-to.png">
          <div className="space-y-3 p-3 rounded-3xl bg-paper-50 border-3 border-paper-900">
            <div className="text-center sticker p-3 bg-sticker-pink">
              <div className="text-2xl">🗳️</div>
              <div className="text-xs font-black text-paper-900/70 mt-1">今晚谁最可能 · 判决书</div>
            </div>
            {history.map((h, i) => (
              <div key={i} className="border-3 border-paper-900 rounded-2xl shadow-sticker-sm p-3 bg-sticker-yellow">
                <div className="text-xs font-bold text-paper-900/70">{h.q}</div>
                <div className="font-black text-paper-900 mt-1">→ {h.name}</div>
              </div>
            ))}
            <div className="text-center text-[10px] font-bold text-paper-900/50">vibepartyglobal.vercel.app</div>
          </div>
        </ShareResultCard>
        <div className="pt-3">
          <NeonButton full variant="secondary" onClick={() => setShowShare(false)}>← 继续玩</NeonButton>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout title="谁最可能 🗳️" rules="全场投票选出最符合的人">
      <AnimatePresence mode="wait">
        <motion.div key={q?.k || 'init'} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4">
          <div className="sticker p-6 min-h-[120px] grid place-items-center text-center bg-sticker-cyan">
            <div className="text-xl font-black leading-relaxed text-paper-900">{q?.text || '点击下方抽一题'}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {q && (
        <>
          <div className="text-sm font-bold text-paper-900/70 mt-3 mb-2">选出今晚最可能的人</div>
          <div className="grid grid-cols-2 gap-2">
            {players.map((p) => (
              <button
                key={p.id}
                onClick={() => { vibrate(10); setTarget(p.id); }}
                className={`flex items-center gap-2 p-3 rounded-2xl border-3 border-paper-900 press-down transition-all ${target === p.id ? 'bg-sticker-pink shadow-sticker scale-105' : 'bg-paper-100 shadow-sticker-sm'}`}
              >
                <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-black border-2 border-paper-900" style={{ backgroundColor: p.avatarColor }}>{p.name.slice(0, 1)}</span>
                <span className="text-sm font-bold truncate">{p.name}</span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {winner && (
              <motion.div
                key={winner.id}
                initial={{ scale: 0.7, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="mt-4 sticker p-5 text-center bg-sticker-yellow tilt-r-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl"
                >
                  🏆
                </motion.div>
                <div className="text-xs font-bold text-paper-900/70 mt-2">今晚最可能是</div>
                <div className="text-3xl font-black mt-1 text-paper-900">{winner.name}</div>
                <div className="mt-3 flex justify-center gap-2">
                  <NeonButton size="sm" variant="secondary" onClick={() => bumpScore(winner.id, -1)}>-1分</NeonButton>
                  <NeonButton size="sm" onClick={() => bumpScore(winner.id, 1)}>+1分</NeonButton>
                </div>
                <button onClick={lockResult} className="mt-3 text-xs font-black underline text-paper-900/70">📌 记入今晚判决书</button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <NeonButton size="lg" onClick={draw}>{q ? '下一题' : '开始'}</NeonButton>
        <NeonButton size="lg" variant="secondary" onClick={() => { setQ(null); setTarget(null); }}>重置</NeonButton>
      </div>

      {history.length > 0 && (
        <div className="mt-3">
          <NeonButton full variant="secondary" size="sm" onClick={() => setShowShare(true)}>
            📜 查看今晚判决书（{history.length}）
          </NeonButton>
        </div>
      )}

      <div className="mt-4"><ScoreBoard players={players} /></div>
    </GameLayout>
  );
}
