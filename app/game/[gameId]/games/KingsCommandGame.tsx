'use client';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import HandoffScreen from '@/components/HandoffScreen';
import { KING_COMMANDS } from '@/data/zh-CN/kingCommands';
import { pick, randomInt, shuffle } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { localizeDrinkCopy } from '@/lib/modeFilter';

type Phase = 'assign' | 'view' | 'reveal' | 'command' | 'done';

export default function KingsCommandGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const [phase, setPhase] = useState<Phase>('assign');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [kingNumber, setKingNumber] = useState<number>(0);
  const [viewIdx, setViewIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [command, setCommand] = useState<{ text: string; targets: number[] } | null>(null);
  const [rounds, setRounds] = useState(0);

  const assign = () => {
    const nums = shuffle(players.map((_, i) => i + 1));
    setNumbers(nums);
    setKingNumber(randomInt(1, players.length));
    setViewIdx(0); setShown(false);
    setPhase('view');
    setHandoff(true);
  };

  const drawCommand = () => {
    const cmd = pick(KING_COMMANDS);
    const others = Array.from({ length: players.length }, (_, i) => i + 1).filter((n) => n !== kingNumber);
    const targets: number[] = [];
    const pool = [...others];
    for (let i = 0; i < cmd.slots && pool.length; i++) {
      const idx = randomInt(0, pool.length - 1);
      targets.push(pool.splice(idx, 1)[0]);
    }
    setCommand({ text: cmd.text, targets });
    setPhase('command');
  };

  const renderedText = useMemo(() => {
    if (!command) return '';
    const slots = ['a','b','c'];
    let t = command.text;
    command.targets.forEach((n, i) => { t = t.replace(`{${slots[i]}}`, String(n)); });
    return localizeDrinkCopy(t, settings.mode, settings.drinkingEnabled);
  }, [command, settings.mode, settings.drinkingEnabled]);

  const nextViewer = () => {
    setShown(false);
    if (viewIdx + 1 >= players.length) { setPhase('reveal'); return; }
    setViewIdx((i) => i + 1);
    setHandoff(true);
  };

  return (
    <GameLayout title="国王指令 👑" rules={`已玩 ${rounds} 轮 · 手机轮流查看编号，可拒绝`}>
      <AnimatePresence mode="wait">
        {phase === 'assign' && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 text-center space-y-4">
            <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-7xl">👑</motion.div>
            <div className="font-bold text-paper-900/70">为 {players.length} 位玩家随机分配编号和国王</div>
            <NeonButton full size="lg" onClick={assign}>{rounds === 0 ? '开始分配' : '再来一轮'}</NeonButton>
          </motion.div>
        )}
        {phase === 'view' && (
          <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="text-xs font-black px-2 py-1 rounded-full border-2 border-paper-900 bg-paper-50">{viewIdx + 1} / {players.length}</div>
              <div className="text-sm font-bold text-paper-900/70">轮到：<b>{players[viewIdx]?.name}</b></div>
            </div>
            <div className="sticker p-8 min-h-[200px] grid place-items-center bg-sticker-yellow">
              {!shown ? (
                <div>
                  <div className="font-bold text-paper-900/70 mb-3">手机传给 {players[viewIdx]?.name}</div>
                  <NeonButton onClick={() => setShown(true)}>👁 查看我的编号</NeonButton>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <div className="text-xs font-bold text-paper-900/70">你的编号</div>
                  <div className="text-7xl font-black doodle-title mt-1">{numbers[viewIdx]}</div>
                  {numbers[viewIdx] === kingNumber && <div className="mt-2 font-black text-base text-sticker-orange">👑 你是国王！</div>}
                </motion.div>
              )}
            </div>
            <NeonButton full size="lg" disabled={!shown} onClick={nextViewer}>
              {viewIdx + 1 >= players.length ? '公布国王' : '下一位查看'}
            </NeonButton>
          </motion.div>
        )}
        {phase === 'reveal' && (
          <motion.div key="r" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="py-6 text-center space-y-4">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-7xl">👑</motion.div>
            <div className="font-bold text-paper-900/70">今晚的国王是</div>
            <div className="text-6xl font-black doodle-title text-sticker-orange">{kingNumber} 号</div>
            <div className="text-sm font-bold text-paper-900/60">是 {players[numbers.findIndex((n) => n === kingNumber)]?.name}</div>
            <NeonButton full size="lg" onClick={drawCommand}>抽取指令</NeonButton>
          </motion.div>
        )}
        {phase === 'command' && command && (
          <motion.div key="c" initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="py-6 space-y-4">
            <div className="sticker p-6 bg-sticker-pink">
              <div className="text-xs font-bold text-paper-900/70 mb-2">👑 国王指令</div>
              <div className="text-xl font-black doodle-title leading-relaxed">{renderedText}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SkipButton onClick={drawCommand} label="换一条" />
              <NeonButton onClick={() => { setPhase('done'); setRounds((r) => r + 1); }}>完成</NeonButton>
            </div>
          </motion.div>
        )}
        {phase === 'done' && (
          <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center space-y-3">
            <div className="text-5xl">🎉</div>
            <div className="font-bold text-paper-900/70">本轮结束 · 已玩 {rounds} 轮</div>
            <NeonButton full size="lg" onClick={() => { setPhase('assign'); setCommand(null); }}>🔄 再来一轮</NeonButton>
          </motion.div>
        )}
      </AnimatePresence>
      <HandoffScreen
        open={handoff && phase === 'view'}
        nextPlayerName={players[viewIdx]?.name || ''}
        hint="查看你的编号 · 别给别人看到"
        seconds={2}
        onDone={() => setHandoff(false)}
      />
    </GameLayout>
  );
}
