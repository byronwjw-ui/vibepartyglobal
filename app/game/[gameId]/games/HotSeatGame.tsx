'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import PlayerSelector from '@/components/PlayerSelector';
import { HOT_SEAT } from '@/data/zh-CN/hotSeat';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';

export default function HotSeatGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const [seatId, setSeatId] = useState<string | null>(null);
  const [rounds, setRounds] = useState(3);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState<{ k: string; text: string } | null>(null);

  const seat = players.find((p) => p.id === seatId);

  const start = () => {
    if (!seatId) return;
    setStep(1);
    next();
  };
  const next = () => {
    const pool = HOT_SEAT.filter((p) => settings.contentLevel === 'spicy' ? true : p.level !== 'spicy');
    setQ({ k: randomId(), text: pick(pool.length ? pool : HOT_SEAT).text });
  };
  const finish = () => {
    if (step >= rounds) { setQ(null); setSeatId(null); setStep(0); return; }
    setStep((s) => s + 1);
    next();
  };

  return (
    <GameLayout title="Hot Seat 热座拷问" rules={`选择一位玩家坐上热座，连玩 ${rounds} 题。可跳过。`}>
      {!seat ? (
        <div className="space-y-4 py-4">
          <div className="text-sm text-white/60">选个人上热座</div>
          <PlayerSelector players={players} selectedId={seatId || undefined} onSelect={setSeatId} />
          <div className="text-sm text-white/60 mt-4">连玩几题？</div>
          <div className="flex gap-2">
            {[3,5,7].map((n) => (
              <button key={n} onClick={() => setRounds(n)} className={`flex-1 h-12 rounded-2xl ${rounds === n ? 'bg-neon-grad text-white' : 'bg-white/10'}`}>{n} 题</button>
            ))}
          </div>
          <NeonButton full size="lg" disabled={!seatId} onClick={start}>开始</NeonButton>
        </div>
      ) : (
        <motion.div key={q?.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4">
          <div className="text-center text-sm text-white/60">热座：<b>{seat.name}</b> · 第 {step}/{rounds} 题</div>
          <div className="glass p-6 mt-3 min-h-[120px] grid place-items-center text-center">
            <div className="text-lg font-semibold leading-relaxed">{q?.text}</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <SkipButton onClick={finish} />
            <NeonButton onClick={finish}>{step >= rounds ? '结束' : '下一题'}</NeonButton>
          </div>
        </motion.div>
      )}
    </GameLayout>
  );
}
