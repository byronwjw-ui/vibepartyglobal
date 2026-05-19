'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import CountdownTimer from '@/components/CountdownTimer';
import ScoreBoard from '@/components/ScoreBoard';
import PlayerSelector from '@/components/PlayerSelector';
import { CHARADES } from '@/data/zh-CN/charades';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';

export default function CharadesGame() {
  const players = usePartyStore((s) => s.players);
  const bumpScore = usePartyStore((s) => s.bumpScore);
  const [actorId, setActorId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [word, setWord] = useState<{ k: string; w: string; c: string } | null>(null);
  const [round, setRound] = useState({ correct: 0, skip: 0 });

  const actor = players.find((p) => p.id === actorId);

  const start = () => {
    if (!actorId) return;
    const c = pick(CHARADES);
    setWord({ k: randomId(), w: c.word, c: c.category });
    setRunning(true);
    setRound({ correct: 0, skip: 0 });
  };
  const nextWord = () => { const c = pick(CHARADES); setWord({ k: randomId(), w: c.word, c: c.category }); };
  const onCorrect = () => { setRound((r) => ({ ...r, correct: r.correct + 1 })); nextWord(); };
  const onSkip = () => { setRound((r) => ({ ...r, skip: r.skip + 1 })); nextWord(); };
  const onDone = () => { if (actorId) bumpScore(actorId, round.correct); setRunning(false); setWord(null); };

  return (
    <GameLayout title="你演我猜 🎭" rules="表演者只能表演不能说话，其他人猜。默认 60 秒。">
      {!running ? (
        <div className="py-4 space-y-4">
          <div className="text-sm font-bold text-paper-900/70">选一位表演者</div>
          <PlayerSelector players={players} selectedId={actorId || undefined} onSelect={setActorId} />
          <NeonButton full size="lg" disabled={!actorId} onClick={start}>开始表演</NeonButton>
          <ScoreBoard players={players} />
        </div>
      ) : (
        <div className="py-4 space-y-4">
          <div className="grid place-items-center"><CountdownTimer seconds={60} running onEnd={onDone} /></div>
          <motion.div key={word?.k} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="sticker p-8 text-center bg-sticker-cyan">
            <div className="text-xs font-bold text-paper-900/70">{word?.c}</div>
            <div className="text-4xl font-black doodle-title mt-2">{word?.w}</div>
            <div className="text-xs font-bold text-paper-900/65 mt-2">表演者：{actor?.name}</div>
          </motion.div>
          <div className="grid grid-cols-2 gap-2">
            <NeonButton variant="secondary" size="lg" onClick={onSkip}>跳过</NeonButton>
            <NeonButton size="lg" onClick={onCorrect}>猜对 +1</NeonButton>
          </div>
          <div className="text-center text-xs font-bold text-paper-900/70">本轮猜对 {round.correct} · 跳过 {round.skip}</div>
          <NeonButton full variant="ghost" onClick={onDone}>提前结束本轮</NeonButton>
        </div>
      )}
    </GameLayout>
  );
}
