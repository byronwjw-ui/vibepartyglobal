'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { POET_SEEDS, POET_RULES } from '@/data/zh-CN/chainPoet';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function ChainPoetGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const turn = useTurn(players);
  const pool = useMemo(() => filterByModeAndLevel(POET_SEEDS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [seed, setSeed] = useState(() => pool[0]?.text ?? POET_SEEDS[0].text);
  const [round, setRound] = useState(1);

  const reroll = () => { setSeed(pick(pool).text); setRound(1); turn.reset(); };
  const advance = () => { turn.next(); setRound((r) => r + 1); };

  return (
    <GameLayout title="接龙诗人 ✍️"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={advance}><ArrowRight size={16}/> 下一位接句</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换开头</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="lime" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">开场句</div>
          <div className="mt-2 text-2xl font-black doodle-title leading-snug">{seed}</div>
        </GlassCard>

        <AnimatePresence mode="wait">
          <motion.div key={turn.current?.id + '_' + round}
            initial={{ y: 12, opacity: 0, rotate: -1 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0 }}>
            <GlassCard tone="yellow" tilt="r">
              <div className="text-xs text-paper-900/70 font-bold">轮到</div>
              <div className="text-xl font-black mt-1">{turn.current?.name ?? '－'}</div>
              <div className="mt-2 text-sm font-semibold text-paper-900/85">接一句 6–8 个字，不重复上一句最后三个字。</div>
              <div className="mt-2 text-xs text-paper-900/60 font-semibold">第 {round} 句</div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <GlassCard>
          <div className="font-black mb-2">规则速读</div>
          <ul className="text-sm font-semibold text-paper-900/85 space-y-1">
            {POET_RULES.map((r, i) => <li key={i}>· {r}</li>)}
          </ul>
        </GlassCard>
      </div>
    </GameLayout>
  );
}
