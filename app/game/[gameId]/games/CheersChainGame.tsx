'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { CHEERS_LINES } from '@/data/zh-CN/cheersChain';
import { filterByModeAndLevel, localizeDrinkCopy } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function CheersChainGame() {
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(CHEERS_LINES, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [line, setLine] = useState(() => pick(pool.length ? pool : CHEERS_LINES).text);
  const reroll = () => setLine(pick(pool.length ? pool : CHEERS_LINES).text);

  const display = localizeDrinkCopy(line, settings.mode, settings.drinkingEnabled);
  const isBoozy = settings.mode === 'drinking' && settings.drinkingEnabled;

  return (
    <GameLayout title="干杯链 🥂"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={reroll}><ArrowRight size={16}/> 下一题</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 重抽</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone={isBoozy ? 'orange' : 'cyan'} tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">当前模式</div>
          <div className="font-black text-lg mt-1">{isBoozy ? '🍻 喝酒模式（请理性饮酒）' : '🧃 无酒精 / 友好模式'}</div>
          <div className="text-xs text-paper-900/65 font-semibold mt-1">题目里的动作会按当前模式自动切换。</div>
        </GlassCard>

        <AnimatePresence mode="wait">
          <motion.div key={display} initial={{ rotate: -3, y: 16, opacity: 0 }} animate={{ rotate: 0, y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>
            <GlassCard tone="yellow">
              <div className="text-xs text-paper-900/70 font-bold">本轮题</div>
              <div className="mt-2 text-2xl font-black doodle-title leading-snug">{display}</div>
              <div className="mt-3 text-sm font-semibold text-paper-900/85">符合条件的人公开起立或举手，按当前模式做对应动作。</div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="text-xs text-center text-paper-900/60 font-semibold">所有动作都可跳过，喝酒模式请确认已成年。</div>
      </div>
    </GameLayout>
  );
}
