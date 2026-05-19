'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import CountdownTimer from '@/components/CountdownTimer';
import { FIVE_SECOND } from '@/data/zh-CN/fiveSecond';
import { CHALLENGES } from '@/data/zh-CN/challenges';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import { vibrate } from '@/lib/gameUtils';

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

  const start = () => {
    setQ(pick(FIVE_SECOND));
    setPhase('count');
    setTick((t) => t + 1);
  };
  const onDone = () => {
    if (settings.vibrationEnabled) vibrate([20, 40, 80]);
    setPhase('judge');
  };
  const succeed = () => { if (current) bumpScore(current.id, 1); setPhase('idle'); next(); };
  const fail = () => { setPenalty(pick(CHALLENGES).text); setPhase('fail'); };
  const finishFail = () => { setPhase('idle'); next(); };

  return (
    <GameLayout title="Five Second Challenge 5秒挑战" currentPlayer={current?.name} rules="轮到的玩家在 5 秒内说出 3 个答案。">
      <motion.div key={phase + tick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-4 space-y-4">
        <div className="glass p-6 min-h-[120px] grid place-items-center text-center">
          <div className="text-lg font-semibold leading-relaxed">
            {phase === 'idle' ? '点击开始，随机抽题' : q}
          </div>
        </div>
        {phase === 'count' && (
          <div className="grid place-items-center"><CountdownTimer seconds={5} onDone={onDone} /></div>
        )}
        {phase === 'fail' && (
          <div className="glass p-5 border border-neon-pink/40">
            <div className="text-xs text-white/60 mb-1">未能完成 · 接受轻挑战</div>
            <div className="font-semibold">{penalty}</div>
          </div>
        )}
      </motion.div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {phase === 'idle' && <NeonButton full size="lg" onClick={start} className="col-span-2">开始挑战</NeonButton>}
        {phase === 'judge' && (<><NeonButton variant="secondary" size="lg" onClick={fail}>失败</NeonButton><NeonButton size="lg" onClick={succeed}>成功 +1</NeonButton></>)}
        {phase === 'fail' && <NeonButton full size="lg" onClick={finishFail} className="col-span-2">下一位</NeonButton>}
      </div>
    </GameLayout>
  );
}
