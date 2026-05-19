'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import HandoffScreen from '@/components/HandoffScreen';
import TurnIndicator from '@/components/TurnIndicator';
import { TRUTHS, DARES } from '@/data/zh-CN/truthOrDare';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { vibrate } from '@/lib/gameUtils';

type Mode = 'truth' | 'dare' | 'random';

export default function TruthOrDareGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [picked, setPicked] = useState<{ k: string; mode: 'truth' | 'dare'; text: string } | null>(null);
  const [round, setRound] = useState(1);
  const [handoff, setHandoff] = useState(false);
  const [stats, setStats] = useState({ done: 0, skip: 0 });

  const truthsPool = useMemo(() => filterByModeAndLevel(TRUTHS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const daresPool  = useMemo(() => filterByModeAndLevel(DARES,  settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const draw = (mode: Mode) => {
    vibrate(15);
    const actual: 'truth' | 'dare' = mode === 'random' ? (Math.random() < 0.5 ? 'truth' : 'dare') : mode;
    const pool = actual === 'truth' ? truthsPool : daresPool;
    const fallback = actual === 'truth' ? TRUTHS : DARES;
    const card = pick(pool.length ? pool : fallback);
    setPicked({ k: randomId(), mode: actual, text: card.text });
  };

  const advance = (kind: 'done' | 'skip') => {
    setStats((s) => ({ ...s, [kind]: s[kind] + 1 }));
    setPicked(null);
    next();
    setRound((r) => r + 1);
    setHandoff(true);
  };

  return (
    <GameLayout title="真心话大冒险 🔥" rules={`已完成 ${stats.done} · 跳过 ${stats.skip} · 可随时跳过`}>
      <TurnIndicator player={current} round={round} label="本轮玩家" />
      <AnimatePresence mode="wait">
        {!picked ? (
          <motion.div key="pick" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4 space-y-3">
            <div className="text-center text-sm font-bold text-paper-900/70 mb-2">选一个：</div>
            <NeonButton full size="lg" onClick={() => draw('truth')}>💬 真心话</NeonButton>
            <NeonButton full size="lg" variant="secondary" onClick={() => draw('dare')}>🔥 大冒险</NeonButton>
            <NeonButton full size="lg" variant="ghost" onClick={() => draw('random')}>🎲 交给运气</NeonButton>
          </motion.div>
        ) : (
          <motion.div
            key={picked.k}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="py-4"
          >
            <div className={`sticker p-6 ${picked.mode === 'truth' ? 'bg-sticker-cyan' : 'bg-sticker-pink'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full border-2 border-paper-900 bg-paper-50 font-black">
                  {picked.mode === 'truth' ? '💬 真心话' : '🔥 大冒险'}
                </span>
                <span className="text-xs font-bold text-paper-900/70">轮到 {current?.name}</span>
              </div>
              <div className="text-xl font-black leading-relaxed text-paper-900">{picked.text}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <SkipButton onClick={() => advance('skip')} label="跳过 · 下一位" />
              <NeonButton onClick={() => advance('done')}>✓ 完成 · 下一位</NeonButton>
            </div>
            <div className="mt-2">
              <NeonButton full variant="secondary" size="sm" onClick={() => draw(picked.mode)}>🔄 重抽一张</NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {current && (
        <HandoffScreen
          open={handoff}
          nextPlayerName={current.name}
          hint="轮到你了"
          seconds={2}
          onDone={() => setHandoff(false)}
        />
      )}
    </GameLayout>
  );
}
