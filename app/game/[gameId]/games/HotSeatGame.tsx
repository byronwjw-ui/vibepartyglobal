'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import PlayerSelector from '@/components/PlayerSelector';
import { HOT_SEAT } from '@/data/zh-CN/hotSeat';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';

export default function HotSeatGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const [seatId, setSeatId] = useState<string | null>(null);
  const [rounds, setRounds] = useState(3);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState<{ k: string; text: string } | null>(null);

  const pool = useMemo(() => filterByModeAndLevel(HOT_SEAT, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const seat = players.find((p) => p.id === seatId);

  const start = () => { if (!seatId) return; setStep(1); next(); };
  const next = () => { setQ({ k: randomId(), text: pick(pool.length ? pool : HOT_SEAT).text }); };
  const finish = () => {
    if (step >= rounds) { setQ(null); setSeatId(null); setStep(0); return; }
    setStep((s) => s + 1); next();
  };

  return (
    <GameLayout title="热座拷问 🪑" rules={`选一位玩家坐上热座，连玩 ${rounds} 题。可跳过。`}>
      {!seat ? (
        <div className="space-y-4 py-4">
          <div className="text-sm font-bold text-paper-900/70">选个人上热座</div>
          <PlayerSelector players={players} selectedId={seatId || undefined} onSelect={setSeatId} />
          <div className="text-sm font-bold text-paper-900/70 mt-4">连玩几题？</div>
          <div className="flex gap-2">
            {[3,5,7].map((n) => (
              <button key={n} onClick={() => setRounds(n)} className={`flex-1 h-12 rounded-2xl border-3 border-paper-900 font-black press-down ${rounds === n ? 'bg-sticker-yellow shadow-sticker' : 'bg-paper-50 shadow-sticker-sm'}`}>{n} 题</button>
            ))}
          </div>
          <NeonButton full size="lg" disabled={!seatId} onClick={start}>开始</NeonButton>
        </div>
      ) : (
        <motion.div key={q?.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4">
          <div className="text-center text-sm font-bold text-paper-900/70">热座：<b>{seat.name}</b> · 第 {step}/{rounds} 题</div>
          <div className="sticker p-6 mt-3 min-h-[120px] grid place-items-center text-center">
            <div className="text-xl font-black doodle-title leading-relaxed">{q?.text}</div>
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
