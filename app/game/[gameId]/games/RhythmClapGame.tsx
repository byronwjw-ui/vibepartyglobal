'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { RHYTHM_PATTERNS, BEAT_LABEL, type Beat } from '@/data/zh-CN/rhythm';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function RhythmClapGame() {
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(RHYTHM_PATTERNS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [pat, setPat] = useState(() => pick(pool.length ? pool : RHYTHM_PATTERNS));
  const [running, setRunning] = useState(false);
  const [idx, setIdx] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const interval = (60 / pat.bpm) * 1000;
    ref.current = window.setInterval(() => setIdx((i) => (i + 1) % pat.pattern.length), interval) as any;
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [running, pat]);

  const reroll = () => { setPat(pick(pool.length ? pool : RHYTHM_PATTERNS)); setIdx(0); };

  return (
    <GameLayout title="节奏拍拍 👏"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={() => setRunning((v) => !v)}>{running ? <Pause size={16}/> : <Play size={16}/>}{running ? '暂停' : '开始'}</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换节奏</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="yellow" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">BPM</div>
          <div className="text-2xl font-black doodle-title">{pat.bpm}</div>
          <div className="text-xs text-paper-900/65 font-semibold mt-2">跟不上节奏的人接受一次轻挑战。</div>
        </GlassCard>

        <div className="grid grid-cols-4 gap-2 md:grid-cols-7">
          {pat.pattern.map((b: Beat, i: number) => (
            <motion.div key={i}
              animate={{ scale: running && i === idx ? 1.15 : 1, rotate: running && i === idx ? [-2,2,0] : 0 }}
              className={`aspect-square grid place-items-center rounded-2xl border-3 border-paper-900 text-xs font-black p-1 text-center ${i === idx && running ? 'bg-sticker-pink shadow-sticker-lg' : 'bg-paper-100 shadow-sticker-sm'}`}>
              {BEAT_LABEL[b]}
            </motion.div>
          ))}
        </div>

        <GlassCard>
          <div className="font-black mb-2">玩法</div>
          <ul className="text-sm font-semibold text-paper-900/85 space-y-1">
            <li>· 跟着节奏一起做对应动作</li>
            <li>· 拍手 / 拍腿 / 跨拍（左手拍右、右手拍左）</li>
            <li>· 提速：每 8 拍后点&ldquo;换节奏&rdquo;</li>
          </ul>
        </GlassCard>
      </div>
    </GameLayout>
  );
}
