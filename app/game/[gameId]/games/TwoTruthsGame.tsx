'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { TWO_TRUTHS_HINTS } from '@/data/zh-CN/twoTruths';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TwoTruthsGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const turn = useTurn(players);
  const pool = useMemo(() => filterByModeAndLevel(TWO_TRUTHS_HINTS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [hint, setHint] = useState(() => pool[0]?.text ?? TWO_TRUTHS_HINTS[0].text);
  const [revealed, setRevealed] = useState(false);

  const reroll = () => { setHint(pick(pool).text); setRevealed(false); };
  const nextPlayer = () => { turn.next(); reroll(); };

  return (
    <GameLayout title="谎言侦探 🕵️‍♀️"
      footer={(
        <div className="flex gap-2">
          <NeonButton full onClick={nextPlayer}><ArrowRight size={16}/> 下一位</NeonButton>
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换提示</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="cyan" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">轮到</div>
          <div className="text-2xl font-black doodle-title mt-1">{turn.current?.name ?? '－'}</div>
        </GlassCard>

        <AnimatePresence mode="wait">
          <motion.div key={hint}
            initial={{ rotate: -2, y: 12, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}>
            <GlassCard tone="yellow">
              <div className="text-xs text-paper-900/70 font-bold">题目</div>
              <div className="text-xl font-black mt-2">{hint}</div>
              <div className="mt-3 text-sm font-semibold text-paper-900/85">说出三件事，其中两真一假。其他玩家投票哪一句是假的。</div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {revealed && (
          <GlassCard tone="lime">
            <div className="font-black"><CheckCircle2 size={16} className="inline mr-1"/> 揭晓</div>
            <div className="text-sm font-semibold text-paper-900/85 mt-1">由本人公布哪一句是假的。猜对的玩家+1 分（可在大厅设置里调整记分）。</div>
          </GlassCard>
        )}

        <NeonButton variant="secondary" onClick={() => setRevealed((v) => !v)}>
          {revealed ? '收起揭晓' : '揭晓答案'}
        </NeonButton>
      </div>
    </GameLayout>
  );
}
