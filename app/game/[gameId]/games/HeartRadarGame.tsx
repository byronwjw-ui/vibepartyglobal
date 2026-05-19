'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { HEART_RADAR } from '@/data/zh-CN/heartRadar';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function HeartRadarGame() {
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(HEART_RADAR, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [q, setQ] = useState(() => pick(pool.length ? pool : HEART_RADAR).text);
  const [countdown, setCountdown] = useState<number | null>(null);

  const reroll = () => { setQ(pick(pool.length ? pool : HEART_RADAR).text); setCountdown(null); };

  const startCountdown = () => {
    setCountdown(3);
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c === null) { clearInterval(id); return null; }
        if (c <= 1) { clearInterval(id); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  return (
    <GameLayout title="心动雷达 💘"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={startCountdown}>3-2-1 同时指</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换一题</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="pink" tilt="r">
          <div className="text-xs text-paper-900/70 font-bold">题目</div>
          <div className="mt-2 text-2xl font-black doodle-title leading-snug">{q}</div>
          <div className="mt-3 text-xs text-paper-900/70 font-semibold">所有人都可以选&ldquo;不指&rdquo;，不解释。</div>
        </GlassCard>

        <div className="grid place-items-center py-8">
          <AnimatePresence mode="wait">
            {countdown !== null && (
              <motion.div key={countdown} initial={{ scale: 0.7, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 1.4, opacity: 0 }} className="text-[140px] font-black doodle-title">
                {countdown === 0 ? '💘' : countdown}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <GlassCard>
          <div className="font-black mb-2">怎么玩</div>
          <ul className="text-sm font-semibold text-paper-900/85 space-y-1">
            <li>· 看完题之后，主持人喊&ldquo;开始&rdquo;</li>
            <li>· 倒数 3-2-1，所有人同时用手指指向心里的那个人</li>
            <li>· 被指最多的人 +1 心动度（保留隐私，不必解释）</li>
            <li>· 任何人都可以选择&ldquo;不指&rdquo;</li>
          </ul>
        </GlassCard>

        <div className="text-xs text-center text-paper-900/60 font-semibold">所有问题保持轻度暧昧，不强迫表态、不强迫接触。</div>
      </div>
    </GameLayout>
  );
}
