'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import HandoffScreen from '@/components/HandoffScreen';
import PhaseProgress from '@/components/PhaseProgress';
import { UNDERCOVER_PAIRS } from '@/data/zh-CN/undercoverWords';
import { pick, shuffle } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { vibrate } from '@/lib/gameUtils';

type Phase = 'setup' | 'handoff' | 'view' | 'discuss' | 'reveal';

interface Assignment { playerId: string; role: 'civilian' | 'undercover' | 'blank'; word: string; }

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
    setPhase('handoff');
  };

  const cur = assignments[viewIdx];
  const curPlayer = cur ? players.find((p) => p.id === cur.playerId) : undefined;
  const eliminated = eliminatedId ? assignments.find((a) => a.playerId === eliminatedId) : null;
  const eliminatedPlayer = eliminated ? players.find((p) => p.id === eliminated.playerId) : null;
  const civilianWord = assignments.find((a) => a.role === 'civilian')?.word;
  const undercoverWord = assignments.find((a) => a.role === 'undercover')?.word;

  return (
    <GameLayout title="谁是卧底 🕵️" rules="依次传手机查词 · 描述不能说词 · 投票淘汰">
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-6xl">🕵️</div>
            <div className="font-bold text-paper-900/75">将随机抽取一对近义词。1 名玩家为卧底。</div>
            <label className="flex items-center justify-center gap-2 text-sm font-bold text-paper-900/85">
              <input type="checkbox" checked={useBlank} onChange={(e) => setUseBlank(e.target.checked)} className="h-4 w-4 accent-sticker-pink"/>
              加入 1 名白板（无词玩家）{players.length < 4 && <span className="text-paper-900/50">需 ≥4 人</span>}
            </label>
            <NeonButton full size="lg" onClick={start}>🎲 分配身份</NeonButton>
          </motion.div>
        )}

        {phase === 'view' && cur && (
          <motion.div key={'v' + viewIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <PhaseProgress value={viewIdx + 1} total={assignments.length} label="查词进度" tone="cyan" />
            <div className="text-sm font-bold text-paper-900/70 text-center">轮到：<b>{curPlayer?.name}</b></div>
            <div className="sticker p-8 min-h-[200px] grid place-items-center bg-paper-50">
              {!shown ? (
                <div className="text-center">
                  <div className="text-5xl mb-3">🔒</div>
                  <div className="font-bold text-paper-900/70 mb-4">手机已交给 {curPlayer?.name}</div>
                  <NeonButton onClick={() => { vibrate(20); setShown(true); }}>👁 查看我的词</NeonButton>
                </div>
              ) : (
                <motion.div
                  initial={{ rotateY: 90, scale: 0.9 }}
                  animate={{ rotateY: 0, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="text-center"
                >
                  <div className="text-xs font-black text-paper-900/70">你的词是</div>
                  <div className="text-4xl font-black mt-2 text-paper-900">{cur.word}</div>
                  <div className="text-[11px] font-bold text-paper-900/50 mt-3">记住后点下方传给下一位</div>
                </motion.div>
              )}
            </div>
            <NeonButton full size="lg" disabled={!shown} onClick={() => {
              setShown(false);
              if (viewIdx + 1 >= assignments.length) setPhase('discuss');
              else { setViewIdx((i) => i + 1); setPhase('handoff'); }
            }}>
              {viewIdx + 1 >= assignments.length ? '✓ 全员查看完毕 · 开始讨论' : '✓ 记住了 · 传下一位'}
            </NeonButton>
          </motion.div>
        )}

        {phase === 'discuss' && (
          <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="sticker p-5 text-center bg-sticker-cyan">
              <div className="text-3xl">🎤</div>
              <div className="font-black text-paper-900 mt-2">轮流描述，不能直接说出词</div>
              <div className="text-paper-900/65 text-xs mt-1 font-semibold">讨论后投票，选出被淘汰的玩家</div>
            </div>
            <div className="text-sm font-bold text-paper-900/70">选择被投票淘汰的玩家</div>
            <PlayerSelector players={players} selectedId={eliminatedId || undefined} onSelect={setEliminatedId}/>
            <NeonButton full size="lg" disabled={!eliminatedId} onClick={() => setPhase('reveal')}>🎯 揭晓身份</NeonButton>
          </motion.div>
        )}

        {phase === 'reveal' && eliminated && (
          <motion.div key="r" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 180 }} className="py-4 space-y-4 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.6 }}
              className="text-7xl"
            >
              {eliminated.role === 'undercover' ? '🎯' : eliminated.role === 'blank' ? '⬜' : '👤'}
            </motion.div>
            <div className={`sticker p-5 ${eliminated.role === 'undercover' ? 'bg-sticker-pink' : eliminated.role === 'blank' ? 'bg-sticker-yellow' : 'bg-sticker-cyan'} tilt-r-sm`}>
              <div className="font-bold text-paper-900/70 text-sm">{eliminatedPlayer?.name} 的身份是</div>
              <div className="text-3xl font-black mt-1 text-paper-900">
                {eliminated.role === 'undercover' ? '卧底' : eliminated.role === 'blank' ? '白板' : '平民'}
              </div>
            </div>
            <div className="sticker p-4 text-sm font-semibold bg-paper-50 text-left">
              <div>平民词：<b>{civilianWord}</b></div>
              <div className="mt-1">卧底词：<b>{undercoverWord}</b></div>
            </div>
            <NeonButton full size="lg" onClick={() => { setPhase('setup'); setEliminatedId(null); setAssignments([]); }}>🔄 开始新一局</NeonButton>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'handoff' && curPlayer && (
        <HandoffScreen
          open
          nextPlayerName={curPlayer.name}
          hint="查看你的词，看完后传给下一位"
          onDone={() => setPhase('view')}
        />
      )}
    </GameLayout>
  );
}
