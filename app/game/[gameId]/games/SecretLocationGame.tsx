'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import PlayerSelector from '@/components/PlayerSelector';
import CountdownTimer from '@/components/CountdownTimer';
import { SECRET_LOCATIONS } from '@/data/zh-CN/locations';
import { pick, randomInt } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';

type Phase = 'setup' | 'view' | 'ask' | 'vote' | 'reveal';

export default function SecretLocationGame() {
  const players = usePartyStore((s) => s.players);
  const [phase, setPhase] = useState<Phase>('setup');
  const [location, setLocation] = useState<string>('');
  const [spyIdx, setSpyIdx] = useState<number>(-1);
  const [viewIdx, setViewIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const [suspectId, setSuspectId] = useState<string | null>(null);

  const start = () => {
    setLocation(pick(SECRET_LOCATIONS));
    setSpyIdx(randomInt(0, players.length - 1));
    setViewIdx(0); setShown(false);
    setPhase('view');
  };

  const spyPlayer = spyIdx >= 0 ? players[spyIdx] : undefined;
  const suspect = suspectId ? players.find((p) => p.id === suspectId) : null;

  return (
    <GameLayout title="Secret Location 间谍地点" rules="1 名间谍不知道地点；其他人通过问答找出间谍，间谍要猜地点。">
      <AnimatePresence mode="wait">
        {phase === 'setup' && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-6xl">🗺️</div>
            <div className="text-white/70">将随机选定一个地点，其中 1 人为间谍。</div>
            <NeonButton full size="lg" onClick={start}>开始分配</NeonButton>
          </motion.div>
        )}
        {phase === 'view' && (
          <motion.div key={'v' + viewIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-4 text-center">
            <div className="text-sm text-white/60">轮到：<b>{players[viewIdx]?.name}</b></div>
            <div className="glass p-8 min-h-[180px] grid place-items-center">
              {!shown ? (
                <div><div className="text-white/70 mb-3">手机传给 {players[viewIdx]?.name}</div><NeonButton onClick={() => setShown(true)}>查看我的身份</NeonButton></div>
              ) : viewIdx === spyIdx ? (
                <div>
                  <div className="text-5xl mb-2">🕶️</div>
                  <div className="text-xl font-black neon-text">你是间谍</div>
                  <div className="text-xs text-white/60 mt-1">请伪装并猜出地点</div>
                </div>
              ) : (
                <div>
                  <div className="text-xs text-white/60">今晚的地点</div>
                  <div className="text-3xl font-black neon-text mt-2">{location}</div>
                </div>
              )}
            </div>
            <NeonButton full size="lg" disabled={!shown} onClick={() => {
              setShown(false);
              if (viewIdx + 1 >= players.length) setPhase('ask'); else setViewIdx((i) => i + 1);
            }}>{viewIdx + 1 >= players.length ? '进入问答' : '下一位查看'}</NeonButton>
          </motion.div>
        )}
        {phase === 'ask' && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="glass p-5 text-center">
              <div className="text-white/70 text-sm">玩家轮流互相提问，不能直接问"你在哪"。</div>
              <div className="text-xs text-white/50 mt-1">建议每轮 60 秒，问完进入投票。</div>
            </div>
            <div className="grid place-items-center"><CountdownTimer seconds={60} /></div>
            <NeonButton full size="lg" onClick={() => setPhase('vote')}>进入投票</NeonButton>
          </motion.div>
        )}
        {phase === 'vote' && (
          <motion.div key="vo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-4">
            <div className="text-sm text-white/60">选出你们怀疑的间谍</div>
            <PlayerSelector players={players} selectedId={suspectId || undefined} onSelect={setSuspectId}/>
            <NeonButton full size="lg" disabled={!suspectId} onClick={() => setPhase('reveal')}>揭晓答案</NeonButton>
          </motion.div>
        )}
        {phase === 'reveal' && (
          <motion.div key="r" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-6 space-y-4 text-center">
            <div className="text-5xl">🕶️</div>
            <div className="text-white/70">真正的间谍是</div>
            <div className="text-3xl font-black neon-text">{spyPlayer?.name}</div>
            <div className="glass p-4 text-sm">
              <div>被投票：<b>{suspect?.name}</b></div>
              <div className="mt-1">今晚的地点：<b>{location}</b></div>
              <div className="mt-2 text-white/70">{suspect?.id === spyPlayer?.id ? '✅ 平民阵营猜中' : '❌ 间谍逃过一劫'}</div>
            </div>
            <NeonButton full size="lg" onClick={() => { setPhase('setup'); setSuspectId(null); }}>开始新一局</NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
