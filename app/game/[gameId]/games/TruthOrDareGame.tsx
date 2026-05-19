'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameLayout from '@/components/GameLayout';
import NeonButton from '@/components/NeonButton';
import SkipButton from '@/components/SkipButton';
import { TRUTHS, DARES } from '@/data/zh-CN/truthOrDare';
import { pick, randomId } from '@/lib/random';
import { usePartyStore } from '@/store/usePartyStore';
import { useTurn } from '@/lib/useTurn';

type Mode = 'truth' | 'dare' | 'random';

export default function TruthOrDareGame() {
  const players = usePartyStore((s) => s.players);
  const settings = usePartyStore((s) => s.settings);
  const { current, next } = useTurn(players);
  const [picked, setPicked] = useState<{ k: string; mode: 'truth' | 'dare'; text: string } | null>(null);

  const draw = (mode: Mode) => {
    const actual: 'truth' | 'dare' = mode === 'random' ? (Math.random() < 0.5 ? 'truth' : 'dare') : mode;
    const pool = actual === 'truth' ? TRUTHS : DARES;
    const filtered = pool.filter((p) => settings.contentLevel === 'spicy' ? true : p.level !== 'spicy');
    const card = pick(filtered.length ? filtered : pool);
    setPicked({ k: randomId(), mode: actual, text: card.text });
  };

  return (
    <GameLayout title="Truth or Dare 真心话大冒险" currentPlayer={current?.name} rules="选择真心话、大冒险或随机。可随时跳过。">
      <AnimatePresence mode="wait">
        {!picked ? (
          <motion.div key="pick" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-8 space-y-3">
            <div className="text-center text-white/70 mb-2">{current?.name} 选择一项</div>
            <NeonButton full size="lg" onClick={() => draw('truth')}>真心话</NeonButton>
            <NeonButton full size="lg" variant="secondary" onClick={() => draw('dare')}>大冒险</NeonButton>
            <NeonButton full size="lg" variant="ghost" onClick={() => draw('random')}>交给运气</NeonButton>
          </motion.div>
        ) : (
          <motion.div key={picked.k} initial={{ opacity: 0, rotateX: -20 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0 }} className="py-6">
            <div className="glass p-6">
              <div className="text-xs text-white/60 mb-2">{picked.mode === 'truth' ? '真心话' : '大冒险'} · 轮到 {current?.name}</div>
              <div className="text-xl font-bold leading-relaxed">{picked.text}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <SkipButton onClick={() => { setPicked(null); next(); }} label="跳过" />
              <NeonButton onClick={() => { setPicked(null); next(); }}>完成，下一位</NeonButton>
            </div>
            <div className="mt-3">
              <NeonButton full variant="secondary" onClick={() => draw(picked.mode)}>重抽一张</NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameLayout>
  );
}
