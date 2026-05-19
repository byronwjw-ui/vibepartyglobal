'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import CountdownTimer from '@/components/CountdownTimer';
import TurnIndicator from '@/components/TurnIndicator';
import { FIVE_SECOND } from '@/data/zh-CN/fiveSecond';
import { CHALLENGES } from '@/data/zh-CN/challenges';
import { pick } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';
import { filterByModeAndLevel } from '@/lib/modeFilter';

type Phase = 'idle' | 'count' | 'judge' | 'fail';

export default function FiveSecondGame() {
  const players = usePartyStore((s) => s.players);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [phase, setPhase] = useState<Phase>('idle');
  const [q, setQ] = useState<string>('');
  const [penalty, setPenalty] = useState<string>('');
  const [tick, setTick] = useState(0);

  const pool = useMemo(() => filterByModeAndLevel(FIVE_SECOND.map((t) => ({ text: t, level: 'funny' as const })), settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const penalties = useMemo(() => filterByModeAndLevel(CHALLENGES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);

  const start = () => { setQ(pick(pool.length ? pool : FIVE_SECOND.map((t) => ({ text: t, level: 'funny' as const }))).text); setPhase('count'); setTick((t) => t + 1); };
  const onDone = () => { if (settings.vibrationEnabled) vibrate([20, 40, 80]); setPhase('judge'); };
  const succeed = () => { if (current) bumpScore(current.id, 1); setPhase('idle'); next(); };
  const fail = () => { setPenalty(pick(penalties.length ? penalties : CHALLENGES).text); setPhase('fail'); };
  const finishFail = () => { setPhase('idle'); next(); };

  return (
    <GameLayout title="5秒挑战 ⏱️" rules="轮到的玩家在 5 秒内说出 3 个答案。">
      <TurnIndicator player={current} label="本轮玩家" />
      <AnimatePresence mode="wait">
        <motion.div key={phase + tick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
          {phase !== 'fail' ? (
            <motion.div
              animate={phase === 'count' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 1, repeat: phase === 'count' ? Infinity : 0 }}
              className={`sticker p-6 min-h-[140px] grid place-items-center text-center ${phase === 'count' ? 'bg-sticker-yellow' : 'bg-paper-50'}`}
            >
              <div className="text-xl font-black doodle-title leading-relaxed text-paper-900">
                {phase === 'idle' ? '点击开始，随机抽题' : q}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="sticker p-5 bg-sticker-pink"
            >
              <div className="text-center text-3xl mb-2">⏰</div>
              <div className="text-xs font-bold text-paper-900/70 mb-1 text-center">{current?.name} 未能完成 · 轻挑战</div>
              <div className="font-black text-center">{penalty}</div>
            </motion.div>
          )}
          {phase === 'count' && (
            <div className="grid place-items-center">
              <CountdownTimer seconds={5} running onEnd={onDone} />
              <div className="mt-2 text-xs font-bold text-paper-900/60 animate-pulse">说出 3 个答案！</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {phase === 'idle' && <NeonButton full size="lg" onClick={start} className="col-span-2">🚀 开始挑战</NeonButton>}
        {phase === 'judge' && (<><NeonButton variant="secondary" size="lg" onClick={fail}>❌ 失败</NeonButton><NeonButton size="lg" onClick={succeed}>✅ 成功 +1</NeonButton></>)}
        {phase === 'fail' && <NeonButton full size="lg" onClick={finishFail} className="col-span-2">下一位</NeonButton>}
      </div>
    </GameLayout>
  );
}
