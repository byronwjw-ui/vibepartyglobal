'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import PlayerSelector from '@/components/PlayerSelector';
import GameEndScreen from '@/components/GameEndScreen';
import { HOT_SEAT } from '@/data/zh-CN/hotSeat';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { filterByModeAndLevel } from '@/lib/modeFilter';

type Phase = 'setup' | 'play' | 'end';

export default function HotSeatGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const [seatId, setSeatId] = useState<string | null>(null);
  const [rounds, setRounds] = useState(3);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState<{ k: string; text: string } | null>(null);
  const [phase, setPhase] = useState<Phase>('setup');
  const [tally, setTally] = useState({ answered: 0, skipped: 0 });

  const pool = useMemo(() => filterByModeAndLevel(HOT_SEAT, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const seat = players.find((p) => p.id === seatId);

  const nextQ = () => setQ({ k: randomId(), text: pick(pool.length ? pool : HOT_SEAT).text });

  const start = () => { if (!seatId) return; setStep(1); setTally({ answered: 0, skipped: 0 }); setPhase('play'); nextQ(); };

  const advance = (kind: 'answered' | 'skipped') => {
    const nextTally = { ...tally, [kind]: tally[kind] + 1 };
    setTally(nextTally);
    if (step >= rounds) { setPhase('end'); return; }
    setStep((s) => s + 1); nextQ();
  };

  const restart = () => { setQ(null); setSeatId(null); setStep(0); setPhase('setup'); setTally({ answered: 0, skipped: 0 }); };

  if (phase === 'end' && seat) {
    return (
      <GameLayout title="热座拷问 🪑" rules="本轮热座结束">
        <GameEndScreen
          title={`${seat.name} 下热座`}
          emoji="🪑"
          subtitle="可以换下一位玩家坐上去"
          stats={[
            { label: '回答', value: tally.answered },
            { label: '跳过', value: tally.skipped },
          ]}
          onRestart={restart}
        />
      </GameLayout>
    );
  }

  return (
    <GameLayout title="热座拷问 🪑" rules={`选一位玩家坐上热座，连玩 ${rounds} 题。可跳过。`}>
      {phase === 'setup' ? (
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
      ) : seat ? (
        <div className="py-4">
          {/* 进度条 */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-10 w-10 rounded-2xl border-3 border-paper-900 grid place-items-center text-sm font-black" style={{ background: seat.avatarColor }}>{seat.name.slice(0,2)}</div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-paper-900/60">热座</div>
              <div className="font-black text-paper-900 leading-tight">{seat.name}</div>
            </div>
            <div className="text-xs font-black px-2 py-1 rounded-full border-2 border-paper-900 bg-sticker-yellow">{step} / {rounds}</div>
          </div>
          <div className="h-2 rounded-full border-2 border-paper-900 bg-paper-50 overflow-hidden">
            <motion.div initial={false} animate={{ width: `${(step / rounds) * 100}%` }} className="h-full bg-sticker-pink" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={q?.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="sticker p-6 mt-4 min-h-[140px] grid place-items-center text-center bg-sticker-cyan">
              <div className="text-xl font-black doodle-title leading-relaxed text-paper-900">{q?.text}</div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <SkipButton onClick={() => advance('skipped')} />
            <NeonButton onClick={() => advance('answered')}>{step >= rounds ? '结束' : '下一题'}</NeonButton>
          </div>
        </div>
      ) : null}
    </GameLayout>
  );
}
