'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import { UNDERCOVER_PAIRS } from '@/data/zh-CN/undercoverWords';
import { pick, randomInt, shuffle } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';

type Phase = 'setup' | 'view' | 'discuss' | 'reveal';

interface Assignment {
  playerId: string;
  role: 'civilian' | 'undercover' | 'blank';
  word: string;
}

export default function UndercoverGame() {
  const players = usePartyStore((s) => s.players);
  const [phase, setPhase] = useState<Phase>('setup');
  const [useBlank, setUseBlank] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [viewIdx, setViewIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const [eliminatedId, setEliminatedId] = useState<string | null>(null);

  const start = () => {
    const pair = pick(UNDERCOVER_PAIRS);
    const idxs = shuffle(players.map((_, i) => i));
    const undercoverIdx = idxs[0];
    const blankIdx = useBlank && players.length >= 4 ? idxs[1] : -1;
    const list: Assignment[] = players.map((p, i) => {
      if (i === undercoverIdx) return { playerId: p.id, role: 'undercover', word: pair.undercover };
      if (i === blankIdx) return { playerId: p.id, role: 'blank', word: '（白板）你没有词，请伪装' };
      return { playerId: p.id, role: 'civilian', word: pair.civilian };
    });
    setAssignments(list);
    setViewIdx(0); setShown(false);
    setPhase('view');
  };

  const cur = assignments[viewIdx];
  const curPlayer = cur ? players.find((p) => p.id === cur.playerId) : undefined;

  const eliminated = eliminatedId ? assignments.find((a) => a.playerId === eliminatedId) : null;
  const eliminatedPlayer = eliminated ? players.find((p) => p.id === eliminated.playerId) : null;
  const civilianWord = assignments.find((a) => a.role === 'civilian')?.word;
  const undercoverWord = assignments.find((a) => a.role === 'undercover')?.word;

  return (
    <GameLayout title="Undercover 谁是卧底" rules="手机依次传给每位玩家查看词；逐个描述但不能说出词；投票淘汰。">
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-6xl">🕵️</div>
            <div className="text-white/70">将随机抽取一对近义词。1 名玩家为卧底。</div>
            <label className="flex items-center justify-center gap-2 text-sm">
              <input type="checkbox" checked={useBlank} onChange={(e) => setUseBlank(e.target.checked)} className="accent-neon-pink"/>
              加入 1 名白板（无词玩家）{players.length < 4 && <span className="text-white/40">需 ≥4 人</span>}
            </label>
            <NeonButton full size="lg" onClick={start}>分配身份</NeonButton>
          </motion.div>
        )}
        {phase === 'view' && cur && (
          <motion.div key={'v' + viewIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-sm text-white/60">轮到：<b>{curPlayer?.name}</b></div>
            <div className="glass p-8 min-h-[180px] grid place-items-center">
              {!shown ? (
                <div><div className="text-white/70 mb-3">手机传给 {curPlayer?.name}</div><NeonButton onClick={() => setShown(true)}>查看我的词</NeonButton></div>
              ) : (
                <div>
                  <div className="text-xs text-white/60">你的词是</div>
                  <div className="text-3xl font-black neon-text mt-2">{cur.word}</div>
                </div>
              )}
            </div>
            <NeonButton full size="lg" disabled={!shown} onClick={() => {
              setShown(false);
              if (viewIdx + 1 >= assignments.length) setPhase('discuss'); else setViewIdx((i) => i + 1);
            }}>{viewIdx + 1 >= assignments.length ? '全员查看完毕' : '下一位查看'}</NeonButton>
          </motion.div>
        )}
        {phase === 'discuss' && (
          <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="glass p-5 text-center">
              <div className="text-white/70 text-sm">轮流描述，不能直接说出词。</div>
              <div className="text-white/60 text-xs mt-1">讨论后投票，选出被淘汰的玩家。</div>
            </div>
            <div className="text-sm text-white/60">选择被投票淘汰的玩家</div>
            <PlayerSelector players={players} selectedId={eliminatedId || undefined} onSelect={setEliminatedId}/>
            <NeonButton full size="lg" disabled={!eliminatedId} onClick={() => setPhase('reveal')}>揭晓身份</NeonButton>
          </motion.div>
        )}
        {phase === 'reveal' && eliminated && (
          <motion.div key="r" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6 space-y-4 text-center">
            <div className="text-5xl">{eliminated.role === 'undercover' ? '🎯' : eliminated.role === 'blank' ? '⬜' : '👤'}</div>
            <div className="text-white/70">{eliminatedPlayer?.name} 的身份是</div>
            <div className="text-3xl font-black neon-text">{eliminated.role === 'undercover' ? '卧底' : eliminated.role === 'blank' ? '白板' : '平民'}</div>
            <div className="glass p-4 text-sm">
              <div>平民词：<b>{civilianWord}</b></div>
              <div className="mt-1">卧底词：<b>{undercoverWord}</b></div>
            </div>
            <NeonButton full size="lg" onClick={() => { setPhase('setup'); setEliminatedId(null); setAssignments([]); }}>开始新一局</NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
