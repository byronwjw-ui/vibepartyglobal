'use client';
import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import CountdownTimer from '@/components/CountdownTimer';
import TurnIndicator from '@/components/TurnIndicator';
import GameEndScreen from '@/components/GameEndScreen';
import { CHARADES } from '@/data/zh-CN/charades';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';

type Phase = 'idle' | 'play' | 'end';

export default function CharadesGame() {
  const players = usePartyStore((s) => s.players);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [phase, setPhase] = useState<Phase>('idle');
  const [word, setWord] = useState<{ k: string; text: string; cat: string } | null>(null);
  const [seconds] = useState(60);
  const [stats, setStats] = useState({ correct: 0, skipped: 0 });
  const tickRef = useRef(0);

  const draw = () => { const w = pick(CHARADES); setWord({ k: randomId(), text: w.text, cat: w.category }); };
  const start = () => { setStats({ correct: 0, skipped: 0 }); tickRef.current++; setPhase('play'); draw(); };
  const mark = (k: 'correct' | 'skipped') => { setStats((s) => ({ ...s, [k]: s[k] + 1 })); if (k === 'correct') vibrate(20); draw(); };
  const onEnd = () => { if (current) bumpScore(current.id, stats.correct); setPhase('end'); next(); };
  const restart = () => { setPhase('idle'); setWord(null); setStats({ correct: 0, skipped: 0 }); };

  if (phase === 'end') {
    return (
      <GameLayout title="你演我猜 🎭" rules="本轮结束">
        <GameEndScreen
          title={`${current?.name || '上位'} 本轮得分 +${stats.correct}`}
          emoji="🎭"
          subtitle="可以对着下一位玩家再来一轮"
          stats={[
            { label: '猜对', value: stats.correct },
            { label: '跳过', value: stats.skipped },
          ]}
          onRestart={restart}
        />
      </GameLayout>
    );
  }

  return (
    <GameLayout title="你演我猜 🎭" rules="表演者不能说话 · 60 秒内尽量让别人猜对">
      <TurnIndicator player={current} label="本轮表演" />
      <AnimatePresence mode="wait">
        {phase === 'idle' ? (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 text-center space-y-3">
            <div className="text-7xl">🎭</div>
            <div className="text-sm font-bold text-paper-900/70 max-w-xs mx-auto">表演者拿手机、背对他人。上方是要表演的词，被猜对 · 点“猜对”；猜不出 · 点“跳过”。</div>
            <NeonButton full size="lg" onClick={start}>🚀 开始 60 秒</NeonButton>
          </motion.div>
        ) : word ? (
          <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-black px-2 py-1 rounded-full border-2 border-paper-900 bg-sticker-yellow">猜对 {stats.correct}</div>
              <CountdownTimer seconds={seconds} running onEnd={onEnd} />
              <div className="text-xs font-black px-2 py-1 rounded-full border-2 border-paper-900 bg-paper-50">跳过 {stats.skipped}</div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={word.k} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.3 }} className="sticker p-8 text-center min-h-[200px] grid place-items-center bg-sticker-cyan">
                <div>
                  <div className="text-xs font-bold text-paper-900/70 mb-2">{word.cat}</div>
                  <div className="text-4xl font-black doodle-title leading-tight">{word.text}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-2">
              <NeonButton size="lg" variant="secondary" onClick={() => mark('skipped')}>⏭ 跳过</NeonButton>
              <NeonButton size="lg" onClick={() => mark('correct')}>✅ 猜对</NeonButton>
            </div>
            <NeonButton full variant="ghost" size="sm" onClick={onEnd}>提前结束</NeonButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GameLayout>
  );
}
