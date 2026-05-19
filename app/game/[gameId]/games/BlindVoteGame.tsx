'use client';
import { useMemo, useState } from 'react';
import { usePartyStore } from '@/store/usePartyStore';
import GameLayout from '@/components/GameLayout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import { BLIND_VOTE } from '@/data/zh-CN/blindVote';
import { filterByModeAndLevel } from '@/lib/modeFilter';
import { pick } from '@/lib/random';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Eye, EyeOff } from 'lucide-react';

export default function BlindVoteGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const pool = useMemo(() => filterByModeAndLevel(BLIND_VOTE, settings.mode, settings.contentLevel), [settings.mode, settings.contentLevel]);
  const [q, setQ] = useState(() => pick(pool.length ? pool : BLIND_VOTE).text);
  const [phase, setPhase] = useState<'eyes-closed' | 'count' | 'reveal'>('eyes-closed');
  const [winnerId, setWinnerId] = useState('');

  const reroll = () => { setQ(pick(pool.length ? pool : BLIND_VOTE).text); setPhase('eyes-closed'); setWinnerId(''); };

  return (
    <GameLayout title="盲投票 🙈"
      footer={(
        <div className="flex gap-2">
          {phase === 'eyes-closed' && <NeonButton full onClick={() => setPhase('count')}><ArrowRight size={16}/> 开始 3-2-1 指认</NeonButton>}
          {phase === 'count' && <NeonButton full onClick={() => setPhase('reveal')}><Eye size={16}/> 睁眼揭晓</NeonButton>}
          {phase === 'reveal' && (
            <>
              <NeonButton full onClick={() => { if (winnerId) bumpScore(winnerId, 1); reroll(); }}><ArrowRight size={16}/> 给+1分并下一题</NeonButton>
              <NeonButton variant="secondary" onClick={reroll}><RotateCcw size={16}/> 跳过此分</NeonButton>
            </>
          )}
        </div>
      )}>
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div key={q + phase} initial={{ rotate: -2, opacity: 0, y: 12 }} animate={{ rotate: 0, opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard tone="cyan" tilt="l">
              <div className="text-xs text-paper-900/70 font-bold">题目</div>
              <div className="mt-2 text-xl font-black doodle-title leading-snug">{q}</div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {phase === 'eyes-closed' && (
          <GlassCard tone="yellow">
            <div className="text-lg font-black"><EyeOff size={16} className="inline mr-1"/> 现在所有人闭眼</div>
            <div className="mt-2 text-sm font-semibold text-paper-900/85">主持人喊&ldquo;开始&rdquo;后，倒数 3-2-1，所有人闭眼同时用手指向心里的那个人。</div>
          </GlassCard>
        )}

        {phase === 'count' && (
          <GlassCard tone="pink">
            <div className="text-xl font-black doodle-title">3 · 2 · 1 · 指！</div>
            <div className="mt-2 text-sm font-semibold text-paper-900/85">保持闭眼，主持人统计票数。</div>
          </GlassCard>
        )}

        {phase === 'reveal' && (
          <GlassCard>
            <div className="font-black mb-2">主持人选择得票最多的人</div>
            <PlayerSelector players={players} selectedId={winnerId} onSelect={setWinnerId} />
            {winnerId && <div className="mt-3 text-sm font-bold">今晚最被指认的是：{players.find((p) => p.id === winnerId)?.name}</div>}
          </GlassCard>
        )}
      </div>
    </GameLayout>
  );
}
