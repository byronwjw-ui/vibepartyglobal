'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import { MAILBOX_PROMPTS } from '@/data/zh-CN/secretMailbox';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { ArrowRight, RotateCcw, SkipForward, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretMailboxGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const pool = useMemo(() => filterByModeAndLevel(MAILBOX_PROMPTS, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [q, setQ] = useState(() => pick(pool.length ? pool : MAILBOX_PROMPTS).text);
  const [targetId, setTargetId] = useState<string>('');

  const reroll = () => { setQ(pick(pool.length ? pool : MAILBOX_PROMPTS).text); };
  const next = () => { setTargetId(''); reroll(); };

  const target = players.find((p) => p.id === targetId);

  return (
    <GameLayout title="真心话信箱 💌"
      footer={(
        <div className="flex gap-2">
          {!target && <NeonButton full disabled={!players.length} onClick={() => setTargetId(pick(players).id)}>🎲 随机一封信</NeonButton>}
          {target && <NeonButton full onClick={next}><Check size={16}/> 回答完毕</NeonButton>}
          {target && <NeonButton variant="secondary" onClick={next}><SkipForward size={16}/> 跳过</NeonButton>}
          <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 换问题</NeonButton>
        </div>
      )}>
      <div className="space-y-4">
        <GlassCard tone="pink" tilt="l">
          <div className="text-xs text-paper-900/70 font-bold">匿名问题</div>
          <div className="mt-2 text-xl font-black doodle-title leading-snug">{q}</div>
        </GlassCard>

        <GlassCard>
          <div className="font-black mb-2">投递给谁</div>
          <PlayerSelector players={players} selectedId={targetId} onSelect={setTargetId} />
        </GlassCard>

        <AnimatePresence>
          {target && (
            <motion.div initial={{ scale: 0.96, opacity: 0, rotate: -1 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}>
              <GlassCard tone="yellow" tilt="r">
                <div className="text-sm font-bold text-paper-900/70">这封信送给</div>
                <div className="text-2xl font-black mt-1">{target.name}</div>
                <div className="text-sm font-semibold text-paper-900/85 mt-2">公开回答或跳过都可以。所有问题都不需要解释。</div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs text-center text-paper-900/60 font-semibold">VibeParty 不记录任何答案，匿名只在房间里有效。</div>
      </div>
    </GameLayout>
  );
}
